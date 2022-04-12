const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

/**
 *  ConnectDB
 * @function ConnectDB
 * @param null
 * @async connection to mongoose Database
 */
const connectDB = async () => {

        try{
            await mongoose.connect(db);
            console.log('MongoDB connected ...');
        }
        catch(error){

                console.log(error.message);
                process.exit(1);
        }
}

module.exports = connectDB;