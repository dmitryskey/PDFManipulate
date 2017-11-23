'use strict';

const sqlite3 = require('sqlite3').verbose();
const mariadb = require('mariasql');

let mariadbConnection = {
    host: '127.0.0.1',
    user: 'root',
    password: 'test_123',
    db: 'wordpress'
};

const c = new mariadb(mariadbConnection);

const db = new sqlite3.Database('db/database.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS App_Config (LoginName VARCHAR(50), Name VARCHAR(50), Parameter VARCHAR(500))');

    db.run('DELETE FROM App_Config');

    db.run('INSERT INTO App_Config VALUES (NULL, \'tokenSecret\', \'fe1a1915a379f3be5394b64d14794932\')');
    db.run('INSERT INTO App_Config VALUES (NULL, \'tokenAlg\', \'HS512\')');

    // Aspose credentials for dmitryskey@gmail.com/dmitryskataev
    db.run('INSERT INTO App_Config VALUES (NULL, \'AsposeAppSID\', \'7a0214bb-4866-4686-a6b0-e933234c1886\')');
    db.run('INSERT INTO App_Config VALUES (NULL, \'AsposeApiKey\', \'7ee74818ff99046cd6c10f3cb719c2f0\')');

    db.run('INSERT INTO App_Config VALUES (NULL, \'mariadb\', \'' + JSON.stringify(mariadbConnection) + '\')');

    db.close();
});

c.query('CREATE TABLE IF NOT EXISTS LOGS (USER_ID VARCHAR(20) NOT NULL, DATED DATE NOT NULL, LOGGER VARCHAR(50) NOT NULL, LEVEL VARCHAR(10) NOT NULL, MESSAGE VARCHAR(1000) NOT NULL);', (err) => {
    if (err) {
        console.log(err);
    }
});