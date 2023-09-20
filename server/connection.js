const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://abhishekgautam94666:82RGPIUhKVgetmbe@cluster0.uj5fl9n.mongodb.net/test?retryWrites=true&w=majority";

const connectDb = async () => {
  let data = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (data) {
    console.log("database connected");
  } else { 
    console.log("not connected");
  }
};

module.exports = { connectDb };
