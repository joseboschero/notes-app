import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ force: false });

    const PORT = process.env.PORT || 3001;

    app.get("/", (req, res) => {
      const htmlResponse = `
        <html>
          <head>
            <title>Notes app backend</title>
          </head>
          <body>
            <h1>Notes app backend</h1>
          </body>
        </html>
      `;
      res.send(htmlResponse);
    });

    app.listen(PORT);

    console.log("Server listening on port ", PORT);
  } catch (error) {
    console.error("Connection failed: ", error.message);
  }
}

main();
