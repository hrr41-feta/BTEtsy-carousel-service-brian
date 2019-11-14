const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fs = require('fs');

const random = (min, max) => {
  return Math.floor(Math.random()*(max-min) + min);
}

(() => {
  writer.pipe(fs.createWriteStream(__dirname + '/images.csv'));
  let i=40000000;

  function writeImages() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // last time!
        writer.write({product_id: random(0, 10000000), image_url: faker.image.image()});
        console.log('finished images');
        writer.end();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write({product_id: random(0, 10000000), image_url: faker.image.image()});
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', writeImages);
    }
  }

  writeImages();
})();

// Images from s3
// models.saveProduct(1, 'BTS BT21 Official Pyjamas Set', ['https://btetsy.s3.us-east-2.amazonaws.com/2_1.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/2_2.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/2_3.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/1_4.jpeg', 'https://btetsy.s3.us-east-2.amazonaws.com/2_5.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/2_6.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/2_7.jpeg'], true);
// models.saveProduct(2, 'Love Yourself Unisex Premium T-Shirt', ['https://btetsy.s3.us-east-2.amazonaws.com/1_1.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/1_2.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/1_3.jpg'], false);
// models.saveProduct(3, 'New Item! BTS V Dress Shirt', ['https://btetsy.s3.us-east-2.amazonaws.com/4_1.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/4_2.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/4_3.jpg'], false);
// models.saveProduct(4, 'BTS V Korean Pajamas Evenie UNISEX', ['https://btetsy.s3.us-east-2.amazonaws.com/5_1.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/5_2.jpeg', 'https://btetsy.s3.us-east-2.amazonaws.com/5_3.jpg', 'https://btetsy.s3.us-east-2.amazonaws.com/5_4.jpg'], true);
