const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL;

module.exports = class DatabaseConnectionSingleton {
  static instance;

  constructor() {
    // Connect to the database cluster.
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  static getInstance() {
    // If an instance is created earlier return it.
    if (this.instance) {
      return this.instance;
    }
    // If no instance is created earlier,  create and return new instance.
    this.instance = new DatabaseConnectionSingleton();
    return this.instance;
  }
};
