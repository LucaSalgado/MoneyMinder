import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
import { Registro } from "../../front-end/src/app/interfaces/registro";

export const mongoRouter = express.Router();
mongoRouter.use(express.json());

mongoRouter.get("/teste", async (req, res) => {
  res.status(200).send("A API está funcionando!");
});

mongoRouter.get("/", async (req, res) => {
  // Faz um get no banco e retorna tudo
  try {
    const pag = await collections.pagamentos.find({}).toArray();
    const rec = await collections.recebimentos.find({}).toArray();
    res.status(200).send([...pag, ...rec]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

mongoRouter.put("/", async (req, res) => {
  // Faz um post no banco e insere um novo registro

  try {
    const registro: Registro = req.body;
    registro.parcelas.forEach((parcela) => {
      parcela.dataPagamento = new Date(parcela.dataPagamento);
    });
    console.log(registro);
    res.status(200).send("teste funcionou");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }

  /* try {
    const registro: Registro = req.body;
    registro.parcelas.forEach((parcela) => {
      parcela.dataPagamento = new Date(parcela.dataPagamento);
    });

    const result = await collections.pagamentos.insertOne(registro);

    if (result.acknowledged) {
      res
        .status(201)
        .send(`Foi inserido um novo pagamento: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Falha ao inserir um novo pagamento.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  } */
});

mongoRouter.get("/pagamentos", async (req, res) => {
  // Faz um get no banco e retorna tudo
  try {
    const pag = await collections.pagamentos.find({}).toArray();
    res.status(200).send(pag);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

mongoRouter.get("/recebimentos", async (req, res) => {
  // Faz um get no banco e retorna tudo
  try {
    const rec = await collections.recebimentos.find({}).toArray();
    res.status(200).send(rec);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

mongoRouter.post("/pagamentos", async (req, res) => {
  // Faz um post no banco e insere um novo registro
  try {
    const registro: Registro = req.body;
    registro.parcelas.forEach((parcela) => {
      parcela.dataPagamento = new Date(parcela.dataPagamento);
    });

    const result = await collections.pagamentos.insertOne(registro);

    if (result.acknowledged) {
      res
        .status(201)
        .send(`Foi inserido um novo pagamento: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Falha ao inserir um novo pagamento.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

mongoRouter.post("/recebimentos", async (req, res) => {
  // Faz um post no banco e insere um novo registro
  try {
    const registro: Registro = req.body;
    registro.parcelas.forEach((parcela) => {
      parcela.dataPagamento = new Date(parcela.dataPagamento);
    });
    const result = await collections.recebimentos.insertOne(registro);

    if (result.acknowledged) {
      res
        .status(201)
        .send(`Foi inserido um novo recebimento: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Falha ao inserir um novo recebimento.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});
