const settings = require('./settings');

const knex = require('knex')({
    client: 'pg',
    connection: settings,
});

const commandLineInput = process.argv[2];

function outputToConsole(inputArr) {
    inputArr.forEach((elem, index) => {
        const birthdate = new Date(elem.aBirthdate);
        const birthdateFormatted = `${birthdate.getUTCFullYear()}-${birthdate.getUTCMonth()}-${birthdate.getUTCDate()}`;
        console.log(`- ${index + 1}: ${elem.aFirstName} ${elem.aLastName}, born '${birthdateFormatted}'`);
    });
}

knex({ a: 'famous_people' })
    .select({
        aFirstName: 'a.first_name',
        aLastName: 'a.last_name',
        aBirthdate: 'a.birthdate',
    })
    .where('first_name', 'LIKE', `%${commandLineInput}%`)
    .orWhere('last_name', 'LIKE', `%${commandLineInput}%`)
    .asCallback((err, result) => {
        if (err) {
            return console.error('Knex Error', err);
        }
        outputToConsole(result);
        knex.destroy();
    });
