import mongoose from 'mongoose';

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log('connected to dbs');
  } catch (err) {
    console.log(err);
  }
}

export default connectDb;
