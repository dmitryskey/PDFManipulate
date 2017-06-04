'use strict';

var sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto');

var db = new sqlite3.Database('db/database.db');
db.serialize(function() {

    db.run('CREATE TABLE IF NOT EXISTS User_Info (LoginName VARCHAR(50), Password VARCHAR(50), Salt VARCHAR(50))');
    db.run('CREATE UNIQUE INDEX User_Info_LoginName ON User_Info (LoginName)');

    var stmt = db.prepare('INSERT INTO user_info VALUES (?, ?, ?)');

    var salt = 'ef38c628449c5102';

    stmt.run('admin', crypto.createHmac('sha256', salt).update('Password_123').digest('hex'), salt);

    salt = 'c0fa1bc00531bd78';

    stmt.run('sysop', crypto.createHmac('sha256', salt).update('Password_123').digest('hex'), salt);

    stmt.finalize();

    db.run('CREATE TABLE IF NOT EXISTS Token_Info (Token VARCHAR(500), CreationDate DATETIME, ExpDate DATETIME, IP VARCHAR(50))');
    db.run('CREATE UNIQUE INDEX Token_Info_Token ON Token_Info (Token)');

    db.each('SELECT rowid AS id, Password, Salt FROM user_info', function(err, row) {
        console.log(row.id + ': ' + row.Password + ', ' + row.Salt);
    });
});

db.close();