'use strict';

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const mariadb = require('mariadb');
const uuidV4 = require('uuid/v4');
const jwt = require('jwt-simple'); // used to create, sign, and verify tokens
const net = require('net');
const log4js = require('log4js');
const md5 = require('md5');
const pdfApi = require('asposepdfcloud');
const storageApi = require('asposestoragecloud');

const secretTokenNotFound = 'Secret tocken is not found.';
const secretTokenAlgorithmNotFound = 'Secret token algorithm is not found';
const secretTokenIsWrong = 'Secret token can not be decrypted';
const sessionIsExpired = 'Session is expired for the token [%s]';

const iTextSocket = 8086;

const app = express();

const db = new sqlite3.Database('db/database.db');

const logger = log4js.getLogger();
logger.level = 'debug';

app.post('/BeginSession', (req, res) => {
    let body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        let data = parseJSON(body);

        if (data) {
            let token = '';
            let tokenExpiration = moment().add(1, 'days').valueOf();

            getParameter('mariadb', connStr => {
                if (connStr) {
                    let connParams = JSON.parse(connStr);

                    if (connParams) {
                        mariadb.createConnection(connParams).then(c => {
                            // WordPress password encryption schema
                            c.query('SELECT user_pass FROM wp_users WHERE user_login = ?', [data.login]).then(rows => {
                                if (rows && rows.length > 0 && data.password) {
                                    let row = rows[0];

                                    const itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

                                    let hash = Buffer.from(md5(row.user_pass.substr(4, 8) + data.password), 'hex');

                                    for (let i = 0; i < 1 << itoa64.indexOf(row.user_pass[3]); i++) {
                                        hash = Buffer.from(md5(Buffer.concat([hash, Buffer.from(data.password, 'utf8')])), 'hex');
                                    }

                                    let output = '';

                                    let i = 0;
                                    let count = 16;
                                    do {
                                        let value = hash[i++];
                                        output += itoa64[value & 0x3f];
                                        if (i < count) {
                                            value |= hash[i] << 8;
                                        }

                                        output += itoa64[(value >> 6) & 0x3f];
                                        if (i++ >= count) {
                                            break;
                                        }

                                        if (i < count) {
                                            value |= hash[i] << 16;
                                        }

                                        output += itoa64[(value >> 12) & 0x3f];
                                        if (i++ >= count) {
                                            break;
                                        }

                                        output += itoa64[(value >> 18) & 0x3f];
                                    } while (i < count);

                                    if (row.user_pass === row.user_pass.substr(0, 12) + output) {
                                        getParameter('tokenSecret', jwtTokenSecret => {
                                            if (jwtTokenSecret) {
                                                getParameter('tokenAlg', tokenAlg => {
                                                    if (tokenAlg) {
                                                        token = jwt.encode({
                                                            iss: data.login,
                                                            exp: tokenExpiration
                                                        }, jwtTokenSecret, tokenAlg);

                                                        res.end(JSON.stringify({
                                                            token: token
                                                        }));
                                                    } else {
                                                        logger.error(secretTokenAlgorithmNotFound);
                                                        res.end(JSON.stringify({ token: '' }));
                                                    }
                                                });
                                            } else {
                                                logger.error(secretTokenNotFound);
                                                res.end(JSON.stringify({ token: '' }));
                                            }
                                        });
                                    } else {
                                        logger.debug('Incorrect password for the [%s]', data.login);
                                        res.end(JSON.stringify({ token: '' }));
                                    }
                                } else {
                                    logger.debug('User [%s] login name or password is not found', data.login);
                                    res.end(JSON.stringify({ token: '' }));
                                }
                            }).catch(e => {
                                logger.error(e);
                                res.end(JSON.stringify({ token: '' }));
                            });
                        }).catch(e => {
                            logger.error(e);
                            res.end(JSON.stringify({ token: '' }));
                        });
                    } else {
                        res.end(JSON.stringify({ token: '' }));
                    }
                } else {
                    logger.error('Connection string is not found');
                    res.end(JSON.stringify({ token: '' }));
                }
            });
        } else {
            res.end(JSON.stringify({ token: '' }));
        }
    });
});

app.post('/RichTextEditor', (req, res) => {
    let body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        let data = parseJSON(body);

        if (data) {
            // check token    
            getParameter('tokenSecret', jwtTokenSecret => {
                if (jwtTokenSecret) {
                    getParameter('tokenAlg', tokenAlg => {
                        if (tokenAlg) {
                            let decoded = decodeToken(data.token, jwtTokenSecret, tokenAlg);

                            if (decoded) {
                                if (moment() <= decoded.exp) {
                                    let uuid = uuidV4();
                                    let url = '/editor.html?fileid=' + uuid + (data.locale ? '&locale=' + data.locale : '');

                                    let decodedData = data.text ? atou(data.text) : null;
                                    fs.writeFile('data/' + uuid, decodedData ? decodedData : '', err => {
                                        if (err) {
                                            logger.error(err);
                                            res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                        } else {
                                            let host = server.address().address;
                                            let port = server.address().port;

                                            res.end(JSON.stringify({
                                                token: data.token,
                                                editorUrl: 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url 
                                            }));
                                        }
                                    });
                                } else {
                                    logger.debug(sessionIsExpired, data.token);
                                    res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                }
                            } else {
                                logger.error(secretTokenIsWrong, data.token);
                                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                            }
                        } else {
                            logger.error(secretTokenAlgorithmNotFound);
                            res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                        }
                    });
                } else {
                    logger.error(secretTokenNotFound);
                    res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                }
            });
        } else {
            res.end(JSON.stringify({ token: '' }));
        }
    });
});

app.post('/PDFEditor', (req, res) => {
    let body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        let data = parseJSON(body);

        // check token
        let editorUrl = '';

        getParameter('tokenSecret', jwtTokenSecret => {
            if (jwtTokenSecret) {
                getParameter('tokenAlg', tokenAlg => {
                    if (tokenAlg) {
                        let decoded = decodeToken(data.token, jwtTokenSecret, tokenAlg);
                        let host = server.address().address;
                        let port = server.address().port;

                        if (decoded && moment() <= decoded.exp) {
                            let uuid = uuidV4();
                            let url = '/pdf.js/web/viewer.html?file=/data/' + uuid + '#locale=' + data.locale;

                            if (data.type === 'application/pdf' && ['view', 'edit', 'design'].includes(data.mode) && data.content) {
                                fs.writeFile('data/' + uuid, atou(data.content), 'binary', err => {
                                    if (err) {
                                        logger.error(err);
                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                    } else {
                                        editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode;

                                        if (data.data) {
                                            let fields = {
                                                'file': '/data/' + uuid,
                                                'operation': data.mode === 'view' ? 'f' : '',
                                                'entries': []
                                            };

                                            for (let i in data.data) {
                                                fields.entries.push({
                                                    'name': data.data[i].name,
                                                    'value': data.data[i].value,
                                                    'operation': 's'
                                                });
                                            }

                                            data.fields = fields;

                                            generateForm(data, { end: body => {
                                                try {
                                                    data = JSON.parse(body);
                                                    fs.writeFile('data/' + uuid, btoa(data.form), 'binary', err => {
                                                        if (err) {
                                                            logger.error(err);
                                                            res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                        } else {
                                                            res.end(JSON.stringify({
                                                                token: data.token,
                                                                editorUrl: editorUrl 
                                                            }));
                                                        }
                                                    });
                                                }
                                                catch(e) {
                                                    logger.error(e);
                                                    res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                }    
                                            }});
                                        } else {
                                            res.end(JSON.stringify({
                                                token: data.token,
                                                editorUrl: editorUrl 
                                            }));
                                        }
                                    }
                                });
                            } else if (data.type === 'application/pdf' && ['view', 'edit'].includes(data.mode) && data.templateid) {
                                fs.copy('templates/forms/' + data.locale + '/' + data.templateid + '.pdf', 'data/' + uuid, err => {
                                    if (err) {
                                        logger.error(err);
                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                    } else {
                                        editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode + 
                                        '&templateid=' + data.templateid;

                                        if (data.data) {
                                            let fields = {
                                                'file': '/data/' + uuid,
                                                'operation': data.mode === 'view' ? 'f' : '',
                                                'entries': []
                                            };

                                            for (let i in data.data) {
                                                fields.entries.push({
                                                    'name': data.data[i].name,
                                                    'value': data.data[i].value,
                                                    'operation': 's'
                                                });
                                            }

                                            data.fields = fields;

                                            generateForm(data, { end: body => {
                                                try {
                                                    data = JSON.parse(body);
                                                    fs.writeFile('data/' + uuid, atou(data.form), 'binary', err => {
                                                        if (err) {
                                                            logger.error(err);
                                                            res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                        } else {
                                                            res.end(JSON.stringify({
                                                                token: data.token,
                                                                editorUrl: editorUrl 
                                                            }));
                                                        }
                                                    });
                                                }
                                                catch(e) {
                                                    logger.error(e);
                                                    res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                }    
                                            }});
                                        } else {
                                            res.end(JSON.stringify({
                                                token: data.token,
                                                editorUrl: editorUrl 
                                            }));
                                        }
                                    }
                                });
                            } else if (data.type === 'application/html' && ['view', 'edit', 'design'].includes(data.mode) && data.content) {
                                fs.writeFile('data/' + uuid + '.html', atou(data.content), err => {
                                    if (err) {
                                        logger.error(err);
                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                    } else {
                                        getParameter('AsposeAppSID', appSid => {
                                            if (appSid) {
                                                getParameter('AsposeApiKey', apiKey => {
                                                    if (apiKey) {
                                                        let config = {'appSid': appSid, 'apiKey': apiKey, 'debug': true};

                                                        // Instantiate Aspose Storage API SDK
                                                        let sApi = new storageApi(config);
                                                        // Instantiate Aspose.Pdf API SDK
                                                        let pApi = new pdfApi(config);

                                                        // Upload file to aspose cloud storage
                                                        let fileName = uuid + '.html';
                                                        sApi.PutCreate(fileName, null, null, 'data/' + uuid + '.html', responseMessage => {
                                                            if (responseMessage.status === 'OK') {
                                                                // Invoke Aspose.Pdf Cloud SDK API to create PDF file from HTML
                                                                fileName = uuid + '.pdf';
                                                                pApi.PutCreateDocument(fileName, uuid + '.html', null, 'html', null, null, responseMessage => {
                                                                    if (responseMessage.status === 'OK') {
                                                                        // Download pdf from cloud storage
                                                                        sApi.GetDownload(fileName, null, null, responseMessage => {
                                                                            if (responseMessage.status === 'OK') {
                                                                                fs.writeFile('data/' + uuid, responseMessage.body, 'binary', err => {
                                                                                    if (err) {
                                                                                        logger.error(err);
                                                                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                                                    } else {
                                                                                        editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode;
                                                                                    }

                                                                                    fileName = uuid + '.html';
                                                                                    sApi.DeleteFile(fileName, null, null, responseMessage => {
                                                                                        if (responseMessage.status === 'OK') {
                                                                                            fileName = uuid + '.pdf';

                                                                                            sApi.DeleteFile(fileName, null, null, responseMessage => {
                                                                                                if (responseMessage.status === 'OK') {
                                                                                                    res.end(JSON.stringify({
                                                                                                        token: data.token,
                                                                                                        editorUrl: editorUrl 
                                                                                                    }));
                                                                                                } else {
                                                                                                    logger.error('DeleteFile [%s] call error: [%s]', fileName, responseMessage.status);
                                                                                                    res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            logger.error('DeleteFile [%s] call error: [%s]', fileName, responseMessage.status);
                                                                                            res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                                                        }
                                                                                    }); 
                                                                                });
                                                                            } else {
                                                                                logger.error('GetDownload [%s] call error: [%s]', fileName, responseMessage.status);
                                                                                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                                            }
                                                                        });
                                                                    } else {
                                                                        logger.error('PutCreateDocument [%s] call error: [%s]', fileName, responseMessage.status);
                                                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                                    }
                                                                });
                                                            } else {
                                                                logger.error('PutCreate [%s] call error: [%s]', fileName, responseMessage.status);
                                                                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                            }
                                                        });
                                                    } else {
                                                        logger.error('Aspose API key is not found');
                                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                    }
                                                });
                                            } else {
                                                logger.error('Aspose App SID is not found');
                                                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                            }
                                        });
                                    }
                                });
                            } else {
                                logger.debug('Wrong conbination of the type [%s] and mode [%s]', data.type, data.mode);
                                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                            }
                        } else {
                            logger.debug(sessionIsExpired, data.token);
                            res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                        }
                    } else {
                        logger.error(secretTokenAlgorithmNotFound);
                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                    }
                });
            } else {
                logger.error(secretTokenNotFound);
                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
            }
        });
    });
});

app.post('/UpdateForm', (req, res) => {
    let body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        let data = parseJSON(body);

        if (data) {
            getParameter('tokenSecret', jwtTokenSecret => {
                if (jwtTokenSecret) {
                    getParameter('tokenAlg', tokenAlg => {
                        if (tokenAlg) {
                            let decoded = decodeToken(data.token, jwtTokenSecret, tokenAlg);
    
                            if (decoded && moment() <= decoded.exp) {
                                generateForm(data, res);
                            } else {
                                logger.debug(sessionIsExpired, data.token);
                                res.end(JSON.stringify({ token: data.token, form: '' }));
                            }
                        } else {
                            logger.error(secretTokenAlgorithmNotFound);
                            res.end(JSON.stringify({ token: data.token, form: '' }));
                        }
                    });
                } else {
                    logger.error(secretTokenNotFound);
                    res.end(JSON.stringify({ token: data.token, form: '' }));
                }
            });
        } else {
            res.end(JSON.stringify({ token: '' }));
        }
    });
});

app.post('/GetTemplateList', (req, res) => {
    let body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        let data = parseJSON(body);

        if (data) {
            getParameter('tokenSecret', jwtTokenSecret => {
                if (jwtTokenSecret) {
                    getParameter('tokenAlg', tokenAlg => {
                        if (tokenAlg) {
                            let decoded = decodeToken(data.token, jwtTokenSecret, tokenAlg);

                            if (decoded) {
                                if (moment() <= decoded.exp) {
                                    let forms = [];

                                    forms.push({
                                        'id': 'US I9',
                                        'name': 'US I-9',
                                        'group': 'US Federal Forms',
                                        'description': 'US I-9 Form'
                                    });

                                    forms.push({
                                        'id': 'US I9 Supplement',
                                        'name': 'US I-9 Supplement',
                                        'group': 'US Federal Forms',
                                        'description': 'US I-9 Supplement Form'
                                    });

                                    res.end(JSON.stringify({
                                        token: data.token,
                                        forms: forms
                                    }));
                                } else {
                                    logger.error(sessionIsExpired);
                                    res.end(JSON.stringify({ token: data.token, forms: [] }));
                                }
                            } else {
                                logger.error(secretTokenIsWrong, data.token);
                                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                            }
                        } else {
                            logger.error(secretTokenAlgorithmNotFound);
                            res.end(JSON.stringify({ token: data.token, forms: [] }));
                        }
                    });
                } else {
                    logger.error(secretTokenNotFound);
                    res.end(JSON.stringify({ token: data.token, forms: [] }));
                }
            });
        } else {
            res.end(JSON.stringify({ token: '' }));
        }
    });
});

function getParameter(name, callback) {
    db.serialize(() => {
        db.get('SELECT Parameter FROM App_Config WHERE Name = (?)', name,
            (err, row) => {
                if (err) {
                    logger.error(err);
                    callback(null); 
                } else if (row) {
                    // HS256 secrets are typically 128-bit random strings, for example hex-encoded: 
                    // auth value for the token generation
                    callback(row.Parameter);
                } else {
                    callback(null);
                }
            });
    });
}

function parseJSON(text) {
    try {
        return JSON.parse(text);
    }
    catch(e) {
        logger.error(e);
        return null;
    }
}

function decodeToken(token, jwtTokenSecret, tokenAlg) {
    try {
        return jwt.decode(token, jwtTokenSecret, false, tokenAlg);
    }
    catch (e) {
        logger.error(e);
        return null;
    }
}

function atou(s) {
    try {
        return Buffer.from(s, 'base64');
    }
    catch (e) {
        logger.error(e);
        return null;
    }
}

function generateForm(data, res) {
    let body = '';

    let socket = new net.Socket();

    socket.connect(iTextSocket, '127.0.0.1', () => {
        socket.write(JSON.stringify(data.fields));
        socket.write('\n');
    });

    socket.on('data', data => {
        body += data.toString();

        if (body.length > 0 && body[body.length - 1] === '\n'){
            res.end(JSON.stringify({ token: '', form: body }));
            socket.end();
        }
    });

    socket.on('close', () => {
        console.log('Connection closed');
    });

    socket.on('error', err => {
        logger.error(err);
    });
}

let server = app.listen(8305, () => {
    if (!fs.pathExists('data')) {
        fs.mkdir('data');
    }

    //http://localhost:8305/pdf.js/web/viewer.html?file=/data/US%20I9_en-US.pdf&#locale=en-US&mode=edit&templateid=US%20I9
    // fs.emptyDir('data');

    // Where to serve static content
    app.use('/pdf.js', express.static(path.join(__dirname, 'pdf.js/build/generic')));
    app.use('/ckeditor', express.static(path.join(__dirname, 'ckeditor')));
    app.use('/data', express.static(path.join(__dirname, 'data')));
    app.use('/templates', express.static(path.join(__dirname, 'templates/src')));
    app.use('/locale', express.static(path.join(__dirname, 'locale')));
    app.use('/editor.html', express.static(path.join(__dirname, 'editor.html')));

    let socket = new net.Socket();

    // socket.connect(iTextSocket, '127.0.0.1', () => {
    //     socket.end();
    // });

    socket.on('error', err => {
        logger.error(err);
    });

    logger.debug('SmartForms-on-Demand service listening at http://%s:%s', server.address().address, server.address().port);
});