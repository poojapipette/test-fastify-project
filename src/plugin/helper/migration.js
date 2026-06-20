const DBMigrate = require("db-migrate");

const applyMigration = () => {
  return new Promise((resolve, reject) => {
    const dbmigrate = DBMigrate.getInstance(true);
    dbmigrate.silence(true);
    dbmigrate.up((error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = applyMigration;
