const mongoose = require('mongoose')
const shortid = require('shortid')

const password = process.argv[2];

const url =
  `mongodb+srv://fullstack-user:${password}@cluster0-ixagq.mongodb.net/notebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

const Person = mongoose.model('Person', entrySchema)
Person.prototype.toString = function () {
  return `${this.name} - ${this.number}`
}

const find = async (queryObject = {})  => {
  try {
    const results = await Person.find(queryObject);
    await closeConnection();
    return results;
  }
  catch (e) {
    console.error(e);
  }
}

const closeConnection = async () => await mongoose.connection.close();

const createPersonFrom = (name, number) => (
  new Person({
      name,
      number,
      id: shortid.generate()
  })
);

const savePerson = async (person) => {
  try {
    await person.save();
    console.log(`ENTRY -'${person.toString()}'- SAVED!`);
    mongoose.connection.close();
  }
  catch (e) {
    console.error(e);
  }
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length >= 3 && process.argv.length < 4) {  
  find().then(allResults  => allResults.forEach(r => {
    const person = createPersonFrom(r.name, r.number);
    console.log(person.toString());
  }))
}

if (process.argv.length >= 4 && process.argv.length < 5) {
  console.log('Please provide a number for the entry: node mongo.js <password> Anna 123456789')
  process.exit(1)
}

if (process.argv.length == 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const newPerson = createPersonFrom(name, number);
  savePerson(newPerson);
}
