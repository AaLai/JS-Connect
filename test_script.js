const args = process.argv.slice(2);
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const baseQuery = (input) => {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
      getFamousPplByName(input);
    });
}


const getFamousPplByName = (input) => {
  const inputStr = input.toString();
  client.query(`SELECT * FROM famous_people WHERE first_name=$1::text`, [ inputStr ], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
      const ans = result.rows[0];
      console.log(`- ${ans.id}: ${ans.first_name} ${ans.last_name}, born ${ans.birthdate.toDateString()}`); //output: 1
      client.end();
  });
}

baseQuery(args);