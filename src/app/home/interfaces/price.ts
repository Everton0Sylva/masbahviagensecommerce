export interface IPrice {
    total: number | any;
    subTotal: number | any;
    discount: number | any;
}

export class Price {
    total: number | any = 0;
    subTotal: number | any = 0;
    discount: number | any = 0;
}