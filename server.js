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

var app = express();

var db;

// Where to serve static content
app.use('/pdf.js', express.static(path.join(__dirname, 'pdf.js')));
app.use('/ckeditor', express.static(path.join(__dirname, 'ckeditor')));
app.use('/jquery', express.static(path.join(__dirname, 'jquery')));
app.use('/editor.html', express.static(path.join(__dirname, 'editor.html')));

// HS256 secrets are typically 128-bit random strings, for example hex-encoded: 
// auth value for the token generation
app.set('jwtTokenSecret', 'fe1a1915a379f3be5394b64d14794932');
app.set('tokenAlg', 'HS512');

app.post('/BeginSession', function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', function() {
        var data = JSON.parse(body);

        var token = '';
        var tokenExpiration = moment().add(1, 'days').valueOf();

        // if user is found and password is correct create a token
        db.serialize(function() {

            db.get('SELECT Password, Salt FROM User_Info WHERE LoginName = (?)', data.login,
                function(err, row) {
                    if (err) {
                        console.log(err);
                    }
                    else if (row) {
                        if (row.Password === crypto.createHmac('sha256', row.Salt).update(data.password).digest('hex')) {
                            token = jwt.encode({
                                iss: data.login,
                                exp: tokenExpiration
                            }, app.get('jwtTokenSecret'), app.get('tokenAlg'));

                            var stmt = db.prepare('INSERT INTO Token_Info VALUES (?, ?, ?, ?)', function(err) {
                                if (err) {
                                    console.log(err);
                                    res.end();
                                }
                                else {
                                    stmt.run(token, moment().valueOf(), tokenExpiration, req.ip, function(err) {
                                        if (err) {
                                            console.log(err);
                                            res.end();
                                        }
                                        else {
                                            res.end(JSON.stringify({
                                                token: token
                                            }));
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            console.log('Incorrect password for the [%s]', data.login);
                            res.end();
                        }
                    }
                    else {
                        console.log('User [%s] is not found', data.login);
                        res.end();
                    }
                });
        });
    });
});

app.post('/CancelSession', function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', function() {
        var data = JSON.parse(body);

        db.serialize(function() {
            var stmt = db.prepare('UPDATE Token_Info SET Token = ? WHERE Token = ?', function(err) {
                if (err) {
                    console.log(err);
                    res.end();
                }
                else {
                    stmt.run(moment().valueOf(), data.token, function(err) {
                        if (err) {
                            console.log(err);
                        }

                        res.end();
                    });
                }
            });
        });
    });
});

app.post('/RichTextEditor', function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', function() {
        var data = JSON.parse(body);

        // check token
        var editorUrl = '';

        try {
            var decoded = jwt.decode(data.token, app.get('jwtTokenSecret'), false, app.get('tokenAlg'));

            db.serialize(function() {
                db.get('SELECT Token, ExpDate FROM Token_Info WHERE Token = (?)', data.token,
                    function(err, row) {
                        if (err) {
                            console.log(err);
                        }
                        else if (row && row.ExpDate === decoded.exp && moment() <= decoded.exp) {
                            var uuid = uuidV4();
                            var url = '/editor.html?fileid=' + uuid + '&locale=' + data.locale;

                            var decodedData = base64.decode(data.text);
                            fs.writeFile('data/' + uuid, decodedData, 'binary', function(err) {
                                if (err) {
                                    console.log(err);
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
                            console.log('Session is ended with token [%s]', data.token);
                            res.end(JSON.stringify({
                                token: data.token,
                                editorUrl: editorUrl 
                            }));
                        }
                    });
            });
        }
        catch (err) {
            console.log(err);

            res.end(JSON.stringify({
                token: data.token,
                editorUrl: editorUrl 
            }));
        }
    });
});

app.post('/PDFEditor', function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    });

    req.on('end', function() {
        var data = JSON.parse(body);

        // check token
        var editorUrl = '';

        try {
            var decoded = jwt.decode(data.token, app.get('jwtTokenSecret'), false, app.get('tokenAlg'));

            db.serialize(function() {
                db.get('SELECT Token, ExpDate FROM Token_Info WHERE Token = (?)', data.token,
                    function(err, row) {
                        if (err) {
                            console.log(err);
                        }
                        else if (row && row.ExpDate === decoded.exp && moment() <= decoded.exp) {
                            var url = '/pdf.js/web/viewer.html';

                            if (data.type === 'application/pdf' && data.mode === 'view' && moment() <= decoded.exp && moment() <= row.ExpDate) {
                                var decodedData = base64.decode(data.content);
                                fs.writeFile('pdf.js/web/form.pdf', decodedData, 'binary', function(err) {
                                    if (err) {
                                        console.log(err);
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
                                res.end(JSON.stringify({
                                    token: data.token,
                                    editorUrl: editorUrl 
                                }));
                            }
                        }
                        else {
                            console.log('Session is ended with token [%s]', data.token);
                            res.end(JSON.stringify({
                                token: data.token,
                                editorUrl: editorUrl 
                            }));
                        }
                    });
            });
        }
        catch (err) {
            console.log(err);

            res.end(JSON.stringify({
                token: data.token,
                editorUrl: editorUrl 
            }));
        }
    });
});

app.get('/GetTemplateList', function(req, res) {
    res.end();
});

app.get('/GetFileContent', function(req, res) {
    fs.readFile('data/' + req.query.fileid, function(err, data) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({
                content: ''
            }));
        }
        else {
            res.end(JSON.stringify({
                content: base64.encode(data)
            }));
        }
    });    
});

var server = app.listen(305, function() {

    db = new sqlite3.Database('db/database.db');

    fs.emptyDir('data');

    console.log('Document Edit-on-Demand service listening at http://%s:%s', server.address().address, server.address().port);

});