import { Address, IAddress } from "./address";

export interface IPersonalInfo {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    address: IAddress;
    accept: boolean;
    indicated: boolean;
    restriction: boolean;
    cpfIndicator: string;
}

export class PersonalInfo {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    address: Address = new Address();
    accept: boolean;
    indicated: boolean;
    restriction: boolean;
    cpfIndicator: string;
}