const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = async () => {
    mongoose.connect(mongoUri)
    .then(() => {console.log("Connected to Mongoose")})
    .catch((err) => {console.log(err)});
}

module.exports = connectToMongo;