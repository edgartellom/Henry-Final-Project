require("dotenv").config();
const server = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(port, async () => {
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
  });
});
