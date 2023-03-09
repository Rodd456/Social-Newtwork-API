// Require the Mongoose connection
const mongooseConnection = require("./mongooseConnection");

// Define a Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create a Mongoose model from the schema
const User = mongoose.model("User", userSchema);

// Connect to the database and create a new user
async function createUser() {
  try {
    // Wait for the Mongoose connection to be established
    await mongooseConnection;

    // Create a new user
    const newUser = new User({
      name: "John Doe",
      email: "johndoe@example.com",
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log("New user saved to the database:", savedUser);
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}

// Call the createUser function to create a new user in the database
createUser();
