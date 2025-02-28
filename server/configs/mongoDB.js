import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`DB connected`);
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/gc37o`);
  } catch {
    console.log("DB connection Failed :(");
  }
};

export default connectDB;
