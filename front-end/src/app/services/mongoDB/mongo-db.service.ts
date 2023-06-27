import { Injectable } from '@angular/core';
import { Collection, Db, MongoClient } from 'mongodb';

import { Registro } from 'src/app/interfaces/registro';

@Injectable({
  providedIn: 'root',
})
export class MongoDBService {
  collections: {
    pagamentos?: Collection<Registro>;
    recebimentos?: Collection<Registro>;
  } = {};

  constructor() {
  }

  /*async connectToDatabase(uri: string) {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('moneyMinder');
    //await this.applySchemaValidation(db);

    const pagamentosCollection = db.collection<Registro>('pagamentos');
    this.collections.pagamentos = pagamentosCollection;

    const recebimentosCollection = db.collection<Registro>('recebimentos');
    this.collections.recebimentos = recebimentosCollection;
  }*/

  /*async applySchemaValidation(db: Db) {
    const jsonSchema = {
      $jsonSchema: {
        bsonType: 'object',
        required: ['numeroParcelas', 'parcelas', 'nome'],
        additionalProperties: false,
        properties: {
          _id: {},
          apelido: {
            bsonType: 'string',
            description: "'apelido' is a string",
          },
          numeroParcelas: {
            bsonType: 'int',
            description: "'numeroParcelas' is required and is an integer",
          },
          parcelas: {
            bsonType: 'array',
            description: "'parcelas' is required and is an array",
            items: {
              bsonType: 'object',
              required: ['nParcela', 'valor', 'dataPagamento'],
              additionalProperties: false,
              properties: {
                nParcela: {
                  bsonType: 'int',
                  description: "'nParcela' is required and is an integer",
                },
                valor: {
                  bsonType: 'number',
                  description: "'valor' is required and is a number",
                },
                dataPagamento: {
                  bsonType: 'date',
                  description: "'dataPagamento' is required and is a date",
                },
                pago: {
                  bsonType: 'bool',
                  description: "'pago' is a boolean",
                },
              },
            },
          },
          nome: {
            bsonType: 'string',
            description: "'nome' is required and is a string",
          },
        },
      },
    };

    try {
      await db.command({
        collMod: 'pagamentos',
        validator: jsonSchema,
      });
    } catch (error: any) {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('pagamentos', {
          validator: jsonSchema,
        });
      }
    }

    try {
      await db.command({
        collMod: 'recebimentos',
        validator: jsonSchema,
      });
    } catch (error: any) {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('recebimentos', {
          validator: jsonSchema,
        });
      }
    }
  }*/
}
