const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: "backend/config/config.env" })

const DB=process.env.DB_URL;

const connectDatabase = () => {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server:${data.connection.host}`);
    });
};

module.exports = connectDatabase;