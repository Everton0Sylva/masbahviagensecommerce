export interface IPayment {
    phone: string;
    cpf: string;
    third: boolean;
    accept: boolean;
    ccCVV: string;
    ccExpirationDate: string;
    ccImageFlag: string;
    ccMask: string;
    ccName: string;
    ccNumber: string;
    indication: boolean;
    paymentDay: number;
}