const mongoose = require('mongoose');

const connString = process.env.MONGODB_CONNSTRING;

console.log(connString);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB