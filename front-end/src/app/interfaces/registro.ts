import { ObjectId } from 'mongodb'

export interface Registro {
    _id?: ObjectId;
    apelido?: string,
    numeroParcelas: number,
    parcelas: Parcela[],
    nome: string,
}

export interface Parcela {
    nParcela: number,
    valor: number,
    dataPagamento: Date,
    pago?: boolean
}