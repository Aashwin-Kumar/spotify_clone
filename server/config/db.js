import mongoose from "mongoose";

const ConnectDB = async ()=>{
try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.error(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
} catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
}
};

export default ConnectDB;
