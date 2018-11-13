const connection = require('./settings');

const knex = require('knex')({
    client: 'pg',
    connection
});

const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

knex({ a: 'famous_people' })
    .insert({
        first_name,
        last_name,
        birthdate
    })
    .asCallback((err) => {
        if (err) {
            return console.error('Error', err);
        }
        console.log('Row inserted');
        knex.destroy();
    });
