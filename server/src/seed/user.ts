import mongoose from "mongoose";
import Account from "../models/Account"; // Adjust the path as needed
import { hash } from "bcrypt";
import { MONGO_URI } from "../constants";

// Sample account data
const sampleAccounts = [
  {
    username: "user1",
    password: "password123",
    role: "user",
  },
  {
    username: "user2",
    password: "securepass456",
    role: "user",
  },
  {
    username: "admin",
    password: "adminpass789",
    role: "user", // Note: Your schema only allows 'user' role
  },
];

// Seed function
const seedAccounts = async () => {
  console.log("Seeding accounts...");
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI as string, {
      // Add your connection options here
    });

    console.log("Connected to MongoDB");

    // Clear existing accounts (optional - be careful with this in production)
    await Account.deleteMany({});
    console.log("Cleared existing accounts");

    // Hash passwords and create accounts
    const createdAccounts = await Promise.all(
      sampleAccounts.map(async (account) => {
        const hashedPassword = await hash(account.password, 10);
        const newAccount = new Account({
          username: account.username,
          password: hashedPassword,
          role: account.role,
        });
        return newAccount.save();
      })
    );

    console.log(`Successfully created ${createdAccounts.length} accounts`);
    console.log(
      "Sample accounts:",
      createdAccounts.map((a) => a.username)
    );

    // Disconnect
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding accounts:", error);
    process.exit(1);
  }
};

// Run the seed function
export default seedAccounts;
