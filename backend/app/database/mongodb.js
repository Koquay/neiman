const mongoose = require('mongoose');

module.exports = async () => {
    const DB = process.env.DB || 'mongodb://localhost:27017/neiman';

    try {
        mongoose.set('strictQuery', false);
        
        await mongoose.connect(DB)

        console.dir('*** CONNECTED TO MONGODB ***')
    } catch(error) {
        console.dir('*** CONNECTION TO MONGODB FAILED ***')
        console.dir('error', error)
        throw error;
    }
}