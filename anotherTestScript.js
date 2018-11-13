const args = process.argv.slice(2);
const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const findByFirstName = (input) => {
  const inputStr = input.toString();
  knex.select('*').from('famous_people')
  .where('first_name', inputStr)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    printResult(rows);
    process.exit(0);
  });
};

const printResult = (enter) => {
  enter.forEach((element) => {
    console.log(`-${element.id}: ${element.first_name} ${element.last_name} born ${element.birthdate.toDateString()}`)
  });
}

findByFirstName(args);

