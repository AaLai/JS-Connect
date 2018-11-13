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

const addPerson = (firstName, lastName, birthDate) => {
  const firstNameStr = firstName.toString();
  const lastNameStr = lastName.toString();
  const birthDateStr = new Date(birthDate.split('/').join(','));
  knex('famous_people')
    .insert ({ first_name: firstNameStr, last_name: lastNameStr, birthdate: birthDateStr })
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
      console.log('Added!');
      process.exit(0);
    });
}



addPerson(args[0],args[1],args[2])