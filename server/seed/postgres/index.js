const models = require('../../models/postgres/index.js');
const CreateCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const csvWriter = CreateCsvWriter({
  path: __dirname + '/../seed.csv',
  header: ['productItem']
});

for(var i=0; i<1000; i++){
  csvWriter.writeRecords([{productItem: faker.lorem.words()} ]).then(() => {
    console.log("done");
  });
}

models.getProducts();