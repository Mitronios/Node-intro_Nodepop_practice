import readline from "node:readline/promises";
import connectMongoose from "./lib/connectMongoose.js";
import User from "./models/User.js";

const connection = await connectMongoose();
console.log("Conected to MongoDB", connection.name);

//Confirmation message
const answer = await ask(
  `You will delete all existing records in the MongoDB database, 
  do you want to continue? (y/n)`
);
if (answer.toLowerCase() !== "y") {
  console.log("Process stopped");
  process.exit();
}

await initUsers();

//Close connection after initUsers
await connection.close();

async function initUsers() {
  //delete all users
  const result = await User.deleteMany();
  console.log(`Deleted ${result.deletedCount} users`);

  //create users
  const insertResult = await User.insertMany([
    { name: "Pedro", email: "pet@example.np", password: "examplePassword" },
    { name: "Louis", email: "lou@example.np", password: "examplePassword" },
    { name: "Steven", email: "ste@example.np", password: "examplePassword" },
  ]);
  console.log(`Inserted ${insertResult.length} users`);
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
