'use strict';

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const base64 = require('base-64');
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const mariadb = require('mariasql');
const uuidV4 = require('uuid/v4');
const jwt = require('jwt-simple'); // used to create, sign, and verify tokens
const request = require('request');
const log4js = require('log4js');
const pdfApi = require('asposepdfcloud');
const storageApi = require('asposestoragecloud');

const secretTokenNotFound = 'Secret tocken is not found.';
const secretTokenAlgorithmNotFound = 'Secret token algorithm is not found';
const sessionIsExpired = 'Session is expired for the token [%s]';

let app = express();

let db = new sqlite3.Database('db/database.db');

let logger = log4js.getLogger();
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
        let data = JSON.parse(body);

        let token = '';
        let tokenExpiration = moment().add(1, 'days').valueOf();

        getParameter('mariadb', (conn) => {
            if (conn) {
                var c = new mariadb(JSON.parse(conn));
        
                c.query('SELECT user_pass FROM wp_users WHERE user_login = :login', { login: data.login }, (err, rows) => {
                    if (err) {
                        logger.error(err);
                        res.end();
                    }
                    else if (rows && rows.length > 0) {
                        let row = rows[0];
                        if (row.user_pass === data.password) {
                            getParameter('tokenSecret', (jwtTokenSecret) => {
                                if (jwtTokenSecret) {
                                    getParameter('tokenAlg', (tokenAlg) => {
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
                                            res.end();      
                                        }
                                    });
                                } else {
                                    logger.error(secretTokenNotFound);
                                    res.end();      
                                }
                            });
                        }
                        else {
                            logger.debug('Incorrect password for the [%s]', data.login);
                            res.end();
                        }
                    }
                    else {
                        logger.debug('User [%s] is not found', data.login);
                        res.end();
                    }
                });
            } else {
                logger.error('Connection string is not found');
                res.end();      
            }
        });
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
        let data = JSON.parse(body);

        // check token
        let editorUrl = '';

        getParameter('tokenSecret', (jwtTokenSecret) => {
            if (jwtTokenSecret) {
                getParameter('tokenAlg', (tokenAlg) => {
                    if (tokenAlg) {
                        let decoded = jwt.decode(data.token, jwtTokenSecret, false, tokenAlg);
        
                        if (decoded && moment() <= decoded.exp) {
                            let uuid = uuidV4();
                            let url = '/editor.html?fileid=' + uuid + '&locale=' + data.locale;
        
                            let decodedData = base64.decode(data.text);
                            fs.writeFile('data/' + uuid, decodedData, err => {
                                if (err) {
                                    logger.error(err);
                                    res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                }
                                else {
                                    let host = server.address().address;
                                    let port = server.address().port;
                        
                                    editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url;

                                    res.end(JSON.stringify({
                                        token: data.token,
                                        editorUrl: editorUrl 
                                    }));
                                }       
                            });
                        }
                        else {
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
        let data = JSON.parse(body);

        // check token
        let editorUrl = '';

        getParameter('tokenSecret', (jwtTokenSecret) => {
            if (jwtTokenSecret) {
                getParameter('tokenAlg', (tokenAlg) => {
                    if (tokenAlg) {
                        let decoded = jwt.decode(data.token, jwtTokenSecret, false, tokenAlg);
                        let host = server.address().address;
                        let port = server.address().port;
                
                        if (decoded && moment() <= decoded.exp) {
                            let uuid = uuidV4();
                            let url = '/pdf.js/web/viewer.html?file=/data/' + uuid + '#locale=' + data.locale;
                
                            if (data.type === 'application/pdf' && ['view', 'design'].includes(data.mode)) {
                                fs.writeFile('data/' + uuid, base64.decode(data.content), 'binary', err => {
                                    if (err) {
                                        logger.error(err);
                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                    }
                                    else {
                                        editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode;
                
                                        if (data.data) {
                                            let fields = {
                                                'file': '/data/' + uuid,
                                                'operation': '',
                                                'entries': []
                                            };
                
                                            for (let i in data.data) {
                                                fields.entries.push({
                                                    'name': data.data[i].name,
                                                    'value': data.data[i].value,
                                                    'operation': 's'
                                                });
                                            }
                
                                            getParameter('iTextService', (url) => {
                                                request.post(
                                                    url,
                                                    (error, response, body)  => {
                                                        if (!error && response.statusCode === 200) {
                                                            fs.writeFile('data/' + uuid, base64.decode(body), 'binary', err => {
                                                                if (err) {
                                                                    logger.error(err);
                                                                }
                                                            });
                                                        }
                                                    }
                                                );
                                            });
                                        }

                                        res.end(JSON.stringify({
                                            token: data.token,
                                            editorUrl: editorUrl 
                                        }));
                                    }
                                });
                            }
                            else if (data.type === 'application/pdf' && data.mode === 'edit') {
                                fs.copy('templates/forms/' + data.locale + '/' + data.templateid + '.pdf', 'data/' + uuid, err => {
                                    if (err) {
                                        logger.error(err);
                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                    }
                                    else {
                                        editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode + 
                                        '&templateid=' + data.templateid;

                                        res.end(JSON.stringify({
                                            token: data.token,
                                            editorUrl: editorUrl 
                                        }));
                                    }
                                });
                            }
                            else if (data.type === 'application/html' && ['view', 'edit'].includes(data.mode)) {
                                fs.writeFile('data/' + uuid + '.html', base64.decode(data.content), err => {
                                    if (err) {
                                        logger.error(err);
                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                    }
                                    else {
                                        getParameter('AsposeAppSID', (appSid) => {
                                            if (appSid) {
                                                getParameter('AsposeApiKey', (apiKey) => {
                                                    if (apiKey) {
                                                        let config = {'appSid': appSid, 'apiKey': apiKey, 'debug': true};
                                
                                                        // Instantiate Aspose Storage API SDK
                                                        let sApi = new storageApi(config);
                                                        // Instantiate Aspose.Pdf API SDK
                                                        let pApi = new pdfApi(config);
                                
                                                        // Upload file to aspose cloud storage
                                                        let fileName = uuid + '.html';
                                                        sApi.PutCreate(fileName, null, null, 'data/' + uuid + '.html', (responseMessage) => {
                                                            if (responseMessage.status === 'OK') {
                                                                // Invoke Aspose.Pdf Cloud SDK API to create PDF file from HTML
                                                                fileName = uuid + '.pdf';
                                                                pApi.PutCreateDocument(fileName, uuid + '.html', null, 'html', null, null, (responseMessage) => {
                                                                    if (responseMessage.status === 'OK') {
                                                                        // Download pdf from cloud storage
                                                                        sApi.GetDownload(fileName, null, null, (responseMessage) => {
                                                                            if (responseMessage.status === 'OK') {
                                                                                fs.writeFile('data/' + uuid, responseMessage.body, 'binary', err => {
                                                                                    if (err) {
                                                                                        logger.error(err);
                                                                                        res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                                                                                    }
                                                                                    else {
                                                                                        editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode;
                                                                                    }
                                            
                                                                                    fileName = uuid + '.html';
                                                                                    sApi.DeleteFile(fileName, null, null, (responseMessage) => {
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
                            }
                            else {
                                logger.debug('Wrong conbination of the type [%s] and mode [%s]', data.type, data.mode);
                                res.end(JSON.stringify({ token: data.token, editorUrl: '' }));
                            }
                        }
                        else {
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
        let data = JSON.parse(body);

        getParameter('tokenSecret', (jwtTokenSecret) => {
            if (jwtTokenSecret) {
                getParameter('tokenAlg', (tokenAlg) => {
                    if (tokenAlg) {
                        let decoded = jwt.decode(data.token, jwtTokenSecret, false, tokenAlg);
            
                        if (moment() <= decoded.exp) {
                            let forms = [];
            
                            forms.push({
                                'id': 'US I9',
                                'name': 'US I-9',
                                'group': 'US Federal Forms',
                                'description': 'US I-9 Form'
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
                        logger.error(secretTokenAlgorithmNotFound);
                        res.end(JSON.stringify({ token: data.token, forms: [] }));
                    }
                });
            } else {
                logger.error(secretTokenNotFound);
                res.end(JSON.stringify({ token: data.token, forms: [] }));
            }
        });    
    });
});

function getParameter(name, callback) {
    db.serialize(() => {
        db.get('SELECT Parameter FROM App_Config WHERE Name = (?)', name,
            (err, row) => {
                if (err) {
                    logger.error(err);
                    callback(null); 
                }
                else if (row) {
                    // HS256 secrets are typically 128-bit random strings, for example hex-encoded: 
                    // auth value for the token generation
                    callback(row.Parameter);
                }
            });
    });
}

let server = app.listen(8305, () => {
    if (!fs.pathExists('data')) {
        fs.mkdir('data');
    }

    fs.emptyDir('data');

    // Where to serve static content
    app.use('/pdf.js', express.static(path.join(__dirname, 'pdf.js')));
    app.use('/ckeditor', express.static(path.join(__dirname, 'ckeditor')));
    app.use('/jquery', express.static(path.join(__dirname, 'jquery')));
    app.use('/data', express.static(path.join(__dirname, 'data')));
    app.use('/templates', express.static(path.join(__dirname, 'templates/lib')));
    app.use('/locale', express.static(path.join(__dirname, 'locale')));
    app.use('/image', express.static(path.join(__dirname, 'image')));
    app.use('/editor.html', express.static(path.join(__dirname, 'editor.html')));
    app.use('/jquery/jquery.js', express.static(path.join(__dirname, 'jquery/jquery-3.2.1.min.js')));
    app.use('/jquery/jquery-ui.js', express.static(path.join(__dirname, 'jquery/jquery-ui-1.12.1.min.js')));

    logger.debug('SmartForms-on-Demand service listening at http://%s:%s', server.address().address, server.address().port);
});