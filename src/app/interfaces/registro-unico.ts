export interface RegistroUnico {
    id: number,
    apelido?: string,
    valor: number,
    dataPagamento: Date,
    nome: string,
    tipo: "Pagar" | "Receber"
}
