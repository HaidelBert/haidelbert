module.exports ={
  "type": "postgres",
  "host": process.env.TYPEORM_HOST || "localhost",
  "port": process.env.TYPEORM_PORT || 5432,
  "username": process.env.TYPEORM_USERNAME || "postgres",
  "password": process.env.TYPEORM_PASSWORD || "root",
  "database": "register_of_assets",
  "synchronize": true,
  "logging": true,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": {
    "migrationsDir": "migration"
  }
};
