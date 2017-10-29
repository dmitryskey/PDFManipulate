'use strict';

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const base64 = require('base-64');
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const uuidV4 = require('uuid/v4');
const jwt = require('jwt-simple'); // used to create, sign, and verify tokens
const assert = require('assert');
const request = require('request');
const log4js = require('log4js');
const pdfApi = require('asposepdfcloud');
const storageApi = require('asposestoragecloud');

var app = express();

var db;

var logger = log4js.getLogger();
logger.level = 'debug';

app.post('/BeginSession', (req, res) => {
    var body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        var data = JSON.parse(body);

        var token = '';
        var tokenExpiration = moment().add(1, 'days').valueOf();

        // if user is found and password is correct create a token
        db.serialize(() => {

            db.get('SELECT Password, Salt FROM User_Info WHERE LoginName = (?)', data.login,
                (err, row) => {
                    if (err) {
                        logger.error(err);
                    }
                    else if (row) {
                        if (row.Password === crypto.createHmac('sha256', row.Salt).update(data.password).digest('hex')) {
                            token = jwt.encode({
                                iss: data.login,
                                exp: tokenExpiration
                            }, app.get('jwtTokenSecret'), app.get('tokenAlg'));

                            res.end(JSON.stringify({
                                token: token
                            }));
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
        });
    });
});

app.post('/RichTextEditor', (req, res) => {
    var body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        try {
            var data = JSON.parse(body);

            // check token
            var editorUrl = '';

            var decoded = jwt.decode(data.token, app.get('jwtTokenSecret'), false, app.get('tokenAlg'));

            if (moment() <= decoded.exp) {
                var uuid = uuidV4();
                var url = '/editor.html?fileid=' + uuid + '&locale=' + data.locale;

                var decodedData = base64.decode(data.text);
                fs.writeFile('data/' + uuid, decodedData, err => {
                    if (err) {
                        logger.error(err);
                    }
                    else {
                        var host = server.address().address;
                        var port = server.address().port;
            
                        editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url;
                    }

                    res.end(JSON.stringify({
                        token: data.token,
                        editorUrl: editorUrl 
                    }));
                });
            }
            else {
                logger.debug('Session is expired for the token [%s]', data.token);
                res.end(JSON.stringify({
                    token: data.token,
                    editorUrl: '' 
                }));
            }
        }
        catch (err) {
            logger.error(err);

            res.end(JSON.stringify({
                token: data.token,
                editorUrl: '' 
            }));
        }
    });
});

app.post('/PDFEditor', (req, res) => {
    var body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        try {
            var data = JSON.parse(body);

            // check token
            var editorUrl = '';

            var decoded = jwt.decode(data.token, app.get('jwtTokenSecret'), false, app.get('tokenAlg'));
            var host = server.address().address;
            var port = server.address().port;

            if (moment() <= decoded.exp) {
                var uuid = uuidV4();
                var url = '/pdf.js/web/viewer.html?file=/data/' + uuid + '#locale=' + data.locale;

                if (data.type === 'application/pdf' && ['view', 'design'].includes(data.mode)) {
                    fs.writeFile('data/' + uuid, base64.decode(data.content), 'binary', err => {
                        if (err) {
                            logger.error(err);
                        }
                        else {
                            editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode;

                            if (data.data) {
                                var fields = {
                                    'file': '/data/' + uuid,
                                    'operation': '',
                                    'entries': []
                                };

                                for (var i in data.data) {
                                    fields.entries.push({
                                        'name': data.data[i].name,
                                        'value': data.data[i].value,
                                        'operation': 's'
                                    });
                                }

                                request.post(
                                    app.get('iTextService'),
                                    {
                                        json: fields
                                    },
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
                            }
                        }

                        res.end(JSON.stringify({
                            token: data.token,
                            editorUrl: editorUrl 
                        }));
                    });
                }
                else if (data.type === 'application/pdf' && data.mode === 'edit') {
                    fs.copy('templates/forms/' + data.locale + '/' + data.templateid + '.pdf', 'data/' + uuid, err => {
                        if (err) {
                            logger.error(err);
                        }
                        else {
                            editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode + 
                            '&templateid=' + data.templateid;
                        }

                        res.end(JSON.stringify({
                            token: data.token,
                            editorUrl: editorUrl 
                        }));
                    });
                }
                else if (data.type === 'application/html' && ['view', 'edit'].includes(data.mode)) {
                    fs.writeFile('data/' + uuid + '.html', base64.decode(data.content), err => {
                        if (err) {
                            logger.error(err);
                        }
                        else {
                            var config = {'appSid': app.get('appSID'), 'apiKey': app.get('apiKey'), 'debug': true};

                            // Instantiate Aspose Storage API SDK
                            var sApi = new storageApi(config);
                            // Instantiate Aspose.Pdf API SDK
                            var pApi = new pdfApi(config);

                            // Upload file to aspose cloud storage
                            sApi.PutCreate(uuid + '.html', null, null, 'data/' + uuid + '.html', responseMessage => {
                                assert.equal(responseMessage.status, 'OK');

                                // Invoke Aspose.Pdf Cloud SDK API to create PDF file from HTML
                                pApi.PutCreateDocument(uuid + '.pdf', uuid + '.html', null, 'html', null, null, responseMessage => {
                                    assert.equal(responseMessage.status, 'OK');

                                    // Download pdf from cloud storage
                                    sApi.GetDownload(uuid + '.pdf', null, null, responseMessage => {
                                        assert.equal(responseMessage.status, 'OK');

                                        fs.writeFile('data/' + uuid, responseMessage.body, 'binary', err => {
                                            if (err) {
                                                logger.error(err);
                                            }
                                            else {
                                                editorUrl = 'http://' + (host !== '::' ? host : '127.0.0.1') + ':' + port + url + '&mode=' + data.mode;
                                            }

                                            sApi.DeleteFile(uuid + '.html', null, null, responseMessage => {
                                                assert.equal(responseMessage.status, 'OK');
                                            });

                                            sApi.DeleteFile(uuid + '.pdf', null, null, responseMessage => {
                                                assert.equal(responseMessage.status, 'OK');
                                            });

                                            res.end(JSON.stringify({
                                                token: data.token,
                                                editorUrl: editorUrl 
                                            }));
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
                else {
                    logger.debug('Wrong conbination of the type [%s] and mode [%s]', data.type, data.mode);
                    res.end(JSON.stringify({
                        token: data.token,
                        editorUrl: '' 
                    }));
                }
            }
            else {
                logger.debug('Session is expired for the token [%s]', data.token);
                res.end(JSON.stringify({
                    token: data.token,
                    editorUrl: '' 
                }));
            }
        }
        catch (err) {
            logger.error(err);

            res.end(JSON.stringify({
                token: data.token,
                editorUrl: '' 
            }));
        }
    });
});

app.post('/GetTemplateList', (req, res) => {
    var body = '';
    req.on('data', data => {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        try {
            var data = JSON.parse(body);

            var decoded = jwt.decode(data.token, app.get('jwtTokenSecret'), false, app.get('tokenAlg'));

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
                res.end(JSON.stringify({
                    token: data.token,
                    forms: [] 
                }));
            }
        }
        catch (err) {
            logger.error(err);

            res.end(JSON.stringify({
                token: data.token,
                forms: [] 
            }));
        }
    });
});

var server = app.listen(8305, () => {
    db = new sqlite3.Database('db/database.db');

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
    app.set('tokenAlg', 'HS512');

    // Aspose credentials for dmitryskey@gmail.com/dmitryskataev
    app.set('appSID', '7a0214bb-4866-4686-a6b0-e933234c1886');
    app.set('apiKey', '7ee74818ff99046cd6c10f3cb719c2f0');

    app.set('iTextService', 'http://127.0.0.1:8080/update');

    db.serialize(() => {
        db.get('SELECT Parameter FROM App_Config WHERE Name = (?)', 'TokenSecret',
            (err, row) => {
                if (err) {
                    logger.error(err);
                }
                else if (row) {
                    // HS256 secrets are typically 128-bit random strings, for example hex-encoded: 
                    // auth value for the token generation
                    app.set('jwtTokenSecret', row.Parameter);
                }
            });
    });

    logger.debug('SmartForms-on-Demand service listening at http://%s:%s', server.address().address, server.address().port);
});