'use strict';

var sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto');

var db = new sqlite3.Database('db/database.db');
db.serialize(() => {

    db.run('CREATE TABLE IF NOT EXISTS User_Info (LoginName VARCHAR(50), Password VARCHAR(50), Salt VARCHAR(50))');
    db.run('CREATE UNIQUE INDEX User_Info_LoginName ON User_Info (LoginName)');
    db.run('CREATE TABLE IF NOT EXISTS App_Config (LoginName VARCHAR(50), Name VARCHAR(50), Parameter VARCHAR(500))');

    var stmt = db.prepare('INSERT INTO User_Info VALUES (?, ?, ?)');

    var salt = 'ef38c628449c5102';

    stmt.run('admin', crypto.createHmac('sha256', salt).update('Password_123').digest('hex'), salt);

    salt = 'c0fa1bc00531bd78';

    stmt.run('sysop', crypto.createHmac('sha256', salt).update('Password_123').digest('hex'), salt);

    stmt.finalize();

    db.run('INSERT INTO App_Config VALUES (NULL, \'TokenSecret\', \'fe1a1915a379f3be5394b64d14794932\')');

    db.each('SELECT rowid AS id, Password, Salt FROM user_info', (err, row) => console.log(row.id + ': ' + row.Password + ', ' + row.Salt));
});

db.close();