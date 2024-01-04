import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ force: false });

    const PORT = process.env.PORT || 3001;

    app.listen(PORT);

    console.log("Server listening on port ", PORT);
  } catch (error) {
    console.error("Connection failed: ", error.message);
  }
}

main();
