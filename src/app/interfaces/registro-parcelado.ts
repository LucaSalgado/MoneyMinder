export interface RegistroParcelado {
    id: number,
    apelido?: string,
    numeroParcelas: number,
    parcelas: [
        {
            nParcela: number,
            valor: number,
            dataPagamento: Date,
        }
    ],
    nome: string,
    tipo: "Pagar" | "Receber"
}
