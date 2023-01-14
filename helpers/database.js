const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://natalia19:natalia19@node-course.fx36kxv.mongodb.net/node-course?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
