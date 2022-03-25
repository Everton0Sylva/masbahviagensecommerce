export class CustomMasks {
    cpf: string = '000.000.000-00';
    cellPhone: string = '(00) 00000-0000';
    resPhone: string = '(00) 0000-0000';
    creditCard3: string = '0000 000000 0000'
    creditCard2: string = '0000 000000 00000'
    creditCard: string = '0000 0000 0000 0000';
    creditCardRegExp: any = /([0-9]{4})([0-9]{4}|[0-9]{6})([0-9]{4}|[0-9]{5})/;
    cvv: string = '000';
    cvv2: string = '0000';
    cvvRegExp: any = /([0-9]{3,4})/;
    expirationDate: any = /([0-9]{2})\/([0-9]{2})/;
    paymentDay: any = /^[1-9][0-9]*$/;
    expirationDateTextMask: Array<any> = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/];
}