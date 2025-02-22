import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://viperholic:akash12345@cluster0.m0eniok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/rhezo"!
    );
    console.log("mongoDB connected.");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
