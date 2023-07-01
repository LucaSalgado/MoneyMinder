import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { mongoRouter } from "./database.routes"; // Importe as rotas do arquivo database.routes.ts

// Careega as variáveis de ambiente do .env
dotenv.config();
const host = "localhost";
const port = 5200;

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

    // Use as rotas definidas em database.routes.ts
    app.use("/", mongoRouter);

    app.listen(port, host, () => {
      console.log(`Servidor rodando em http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
