import readline from 'node:readline/promises';
import connectMongoose from './lib/connectMongoose.js';
import User from './models/User.js';
import Product from './models/Product.js';

const connection = await connectMongoose();
console.log('Conected to MongoDB', connection.name);

//Confirmation message
const answer = await ask(
  `You will delete all existing records in the MongoDB database, 
  do you want to continue? (y/n)`,
);
if (answer.toLowerCase() !== 'y') {
  console.log('Process stopped');
  process.exit();
}

//Init users and products
await initUsers();
await initProducts();

//Close connection after initDB
await connection.close();

//Users
async function initUsers() {
  //delete all users
  const result = await User.deleteMany();
  console.log(`Deleted ${result.deletedCount} users`);

  //create users
  const insertResult = await User.insertMany([
    {
      name: 'admin',
      email: 'admin@example.com',
      password: await User.hashPassword('1234'),
    },
    {
      name: 'user',
      email: 'user1@example.com',
      password: await User.hashPassword('1234'),
    },
    {
      name: 'Pedro Sanchez',
      email: 'ps@example.np',
      password: await User.hashPassword('1237'),
    },
    {
      name: 'Louis Seinfield',
      email: 'ls@example.np',
      password: await User.hashPassword('2345'),
    },
    {
      name: 'Steve Aoki',
      email: 'sa@example.np',
      password: await User.hashPassword('3456'),
    },
    {
      name: 'Daniel Matienzo',
      email: 'dm@example.np',
      password: await User.hashPassword('4567'),
    },
    {
      name: 'Laura García',
      email: 'lg@example.np',
      password: await User.hashPassword('5678'),
    },
  ]);

  console.log(`Inserted ${insertResult.length} users`);
}

//Products
async function initProducts() {
  //delete all products
  const result = await Product.deleteMany();
  console.log(`Deleted ${result.deletedCount} products`);

  //get users
  const users = await User.find();

  //Map users to extract id
  const userMap = {};
  users.forEach((user) => {
    userMap[user.name] = user._id;
  });

  //create products and assign owner
  const products = [
    {
      name: 'Nintendo Switch',
      owner: userMap['Steve Aoki'],
      price: 150,
      image: 'url/example/nintendo.jpg',
      tags: ['videogames', 'electronics'],
    },
    {
      name: 'Mixer a345 Pioneer',
      owner: userMap['Steve Aoki'],
      price: 235,
      image: 'url/example/mixer.jpg',
      tags: ['music', 'electronics'],
    },
    {
      name: 'T-shirts Ultra Anniversary',
      owner: userMap['Steve Aoki'],
      price: 35,
      image: 'url/example/t-shirt/ultra.jpg',
      tags: ['clothing', 'music'],
    },
    {
      name: 'Mon jeans',
      owner: userMap['Louis Seinfield'],
      price: 75,
      image: 'url/example/momjeans.jpg',
      tags: ['clothing', 'fashion'],
    },
    {
      name: "Pandora's Necklaces",
      owner: userMap['Louis Seinfield'],
      price: 200,
      image: 'url/example/pandora/necklace.jpg',
      tags: ['fashion', 'jewerly'],
    },
    {
      name: 'MK Purse',
      owner: userMap['Louis Seinfield'],
      price: 340,
      image: 'url/example/mk/purse.jpg',
      tags: ['fashion', 'women'],
    },
    {
      name: 'Iphone 16',
      owner: userMap['Pedro Sanchez'],
      price: 975,
      image: 'url/example/iphone16.jpg',
      tags: ['phones', 'electronics'],
    },
    {
      name: 'Iphone 16 Case',
      owner: userMap['Pedro Sanchez'],
      price: 20,
      image: 'url/example/case.jpg',
      tags: ['phones', 'electronics'],
    },
    {
      name: 'iPad mini 6',
      owner: userMap['Pedro Sanchez'],
      price: 325,
      image: 'url/example/ipadmini.jpg',
      tags: ['videogames', 'electronics'],
    },
    {
      name: 'Design patterns for noobs, Third edition',
      owner: userMap['Daniel Matienzo'],
      price: 40,
      image: 'url/example/patterns.jpg',
      tags: ['computers', 'electronics'],
    },
    {
      name: 'Programming for dummies, First edition',
      owner: userMap['Daniel Matienzo'],
      price: 35,
      image: 'url/example/fordummies.jpg',
      tags: ['computers', 'electronics'],
    },
    {
      name: 'External drive, 1tb',
      owner: userMap['Daniel Matienzo'],
      price: 150,
      image: 'url/example/drive.jpg',
      tags: ['computers', 'electronics'],
    },
    {
      name: 'Popsockets',
      owner: userMap['Laura García'],
      price: 25,
      image: 'url/example/pops.jpg',
      tags: ['phones', 'women'],
    },
    {
      name: 'Leather pants',
      owner: userMap['Laura García'],
      price: 97,
      image: 'url/example/lpants.jpg',
      tags: ['clothing', 'women'],
    },
    {
      name: 'BlackMetal Queen Dress',
      owner: userMap['Laura García'],
      price: 165,
      image: 'url/example/queendress.jpg',
      tags: ['fashion', 'clothing'],
    },
  ];

  const insertResult = await Product.insertMany(products);
  console.log(`Inserted ${insertResult.length} products`);
}

async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const result = await rl.question(question);
  rl.close(); //Close the interface
  return result;
}
