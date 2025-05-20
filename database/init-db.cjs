const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'media.db');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        fs.readFile(schemaPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading schema file:', err.message);
            } else {
                db.exec(data, (err) => {
                    if (err) {
                        console.error('Error executing schema:', err.message);
                    } else {
                        console.log('Database schema applied successfully.');
                    }
                    db.close((err) => {
                        if (err) {
                            console.error('Error closing database:', err.message);
                        } else {
                            console.log('Database connection closed.');
                        }
                    });
                });
            }
        });
    }
});