const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client(settings);
const commandLineInput = process.argv[2];

function outputToConsole(inputArr) {
    inputArr.forEach((elem, index) => {
        const birthdate = new Date(elem.birthdate);
        const birthdateFormatted = `${birthdate.getUTCFullYear()}-${birthdate.getUTCMonth()}-${birthdate.getUTCDate()}`;
        console.log(`- ${index + 1}: ${elem.first_name} ${elem.last_name}, born '${birthdateFormatted}'`);
    });
}

function resultHandler(err, result) {
    if (err) {
        return console.error('Error:', err);
    }
    const resultArr = result.rows;
    if (resultArr.length) {
        outputToConsole(resultArr);
    } else {
        console.log('Query returned no values');
    }
    client.end();
}

function runQuery() {
    const query = `
        SELECT first_name, last_name, birthdate
        FROM famous_people
        WHERE first_name LIKE $1::text
          OR last_name LIKE $1::text;
    `;
    client.query(query, [`%${commandLineInput}%`], resultHandler);
}

client.connect((err) => {
    if (err) {
        return console.error('Connection error', err);
    }
    runQuery();
});
