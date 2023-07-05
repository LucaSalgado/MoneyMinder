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

mongoRouter.put("/pagamentos", async (req, res) => {
  // Faz um get no banco e retorna tudo
  try {
    const registro: Registro = req.body;
    registro.parcelas.forEach((parcela) => {
      parcela.dataPagamento = new Date(parcela.dataPagamento);
    });

    const update = {
      $set: {
        apelido: registro.apelido,
        nome: registro.nome,
        numeroParcelas: registro.numeroParcelas,
        parcelas: [...registro.parcelas],
      },
    };

    const query = { _id: new mongodb.ObjectId(registro._id) };
    const result = await collections.pagamentos.updateOne(query, update);

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an employee: ID ${registro._id}.`);
    } else if (!result.matchedCount) {
      res.status(404).send(`Failed to find an employee: ID ${registro._id}`);
    } else {
      res.status(304).send(`Failed to update an employee: ID ${registro._id}`);
    }
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

mongoRouter.put("/recebimentos", async (req, res) => {
  try {
    const registro: Registro = req.body;
    registro.parcelas.forEach((parcela) => {
      parcela.dataPagamento = new Date(parcela.dataPagamento);
    });

    const update = {
      $set: {
        apelido: registro.apelido,
        nome: registro.nome,
        numeroParcelas: registro.numeroParcelas,
        parcelas: [...registro.parcelas],
      },
    };

    const query = { _id: new mongodb.ObjectId(registro._id) };
    const result = await collections.recebimentos.updateOne(query, update);

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an employee: ID ${registro._id}.`);
    } else if (!result.matchedCount) {
      res.status(404).send(`Failed to find an employee: ID ${registro._id}`);
    } else {
      res.status(304).send(`Failed to update an employee: ID ${registro._id}`);
    }
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

mongoRouter.delete("/pagamentos/:id", async (req, res) => {
  // Faz um get no banco e retorna tudo
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.pagamentos.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an employee: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an employee: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

mongoRouter.delete("/recebimentos/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.recebimentos.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an employee: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an employee: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
