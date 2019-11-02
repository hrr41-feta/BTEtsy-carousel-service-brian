const models = require('../../models/postgres/index.js');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fs = require('fs');

const random = (min, max) => {
  return Math.floor(Math.random()*(max-min) + min);
}

writer.pipe(fs.createWriteStream(__dirname + '/images.csv'));
let i=40000000

function writeImages() {
  var ok = true;
  do {
    i -= 1;
    if (i === 0) {
      // last time!
      writer.write({id: 40000000-i, image: faker.image.image(), product_id: random(0, 10000000)});
      console.log('finished');
      writer.end();
    } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
      ok = writer.write({id: 40000000-i, image: faker.image.image(), product_id: random(0, 10000000))});
    }
  } while (i > 0 && ok);
  if (i > 0) {
    // had to stop early!
    // write some more once it drains
    writer.once('drain', writeImages);
  }
}

writeImages();