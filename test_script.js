const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client(settings);

client.connect((err) => {
    if (err) {
        return console.error('Connection Error', err);
    }
    client.query('SELECT $1::int AS number', ["1"], (err, result) => {
        if (err) {
            return console.error('Error running query', err);
        }
        console.log(result.rows[0].number);
        client.end();
    });
});
