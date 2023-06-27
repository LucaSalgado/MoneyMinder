import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";

// Careega as variáveis de ambiente do .env
dotenv.config();

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  console.error(
    "nenhuma variável de ambiente MONGO_URI foi dedinida em config.env"
  );
  process.exit(1);
}

connectToDatabase(MONGO_URI)
  .then(() => {
    const app = express();
    app.use(cors());

    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));
