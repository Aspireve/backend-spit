const mongoose = require("mongoose");
const logger = require("./logger");
const { mongo, env } = require("./vars");
const ash =
  "mongodb+srv://Aakash:1234@cluster0.gqdixj8.mongodb.net/ecoHive?retryWrites=true&w=majority";

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === "development") {
  mongoose.set("debug", true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose
    .connect(ash, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("mongoDB connected..."));
  return mongoose.connection;
};
