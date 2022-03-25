import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICidade } from '../interfaces/cidade';
import { ICity } from '../interfaces/city';
import { catchError, map, retry } from 'rxjs/operators';
import { FlagCardPattern } from '../models/FlagCardPattern';
import { FlagCard } from '../models/flag-card';
import { Pattern } from '../models/pattern';
import { CustomMasks } from '../models/custom-masks';
import { IPlanRequest } from 'src/app/plans/interfaces/plans-request';
import { IPlan } from 'src/app/home/interfaces/plan';
import { ICredentialLogin } from '../interfaces/credential-login';
import { IPersonalInfo } from '../interfaces/personal-info';
import { IBuyPlan } from '../interfaces/buy-plan';
import { Price } from 'src/app/home/interfaces/price';
import { IIndicacao } from '../interfaces/indicacao';
import { ResponseCadastroSiscoob } from '../interfaces/response-cadastro-siscoob';
import { Address, IAddress } from '../interfaces/address';
import { IIndicacaoInfoPlanos } from '../interfaces/indicacaoInfoPlanos';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

    patterns: Pattern = new Pattern();
    masks: CustomMasks = new CustomMasks();

    flagCards: Array<FlagCard> = [
        { ids: [34, 37], name: 'American Express', maxNumber: [16], imageFlag: 'american.png' },
        { ids: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], maxNumber: [13, 16], name: 'Visa', imageFlag: 'visa.png' },
        { ids: [51, 52, 53, 54, 55], name: 'Master', maxNumber: [16], imageFlag: 'master.png' },
        { ids: [50], name: 'Aura', maxNumber: [16], imageFlag: 'aura.png' },
        { ids: [6011], name: 'Discover', maxNumber: [16], imageFlag: 'discover.png' },
        { ids: [606282], name: 'Hiper Card', maxNumber: [13,16,19], imageFlag: 'american.png' },
      ];
    
      flagCardsPatterns: Array<FlagCardPattern> = [
        { name: 'American Express', image: 'american.png', pattern: this.patterns.amex, mask: this.masks.creditCard2 },
        { name: 'Aura', image: 'aura.png', pattern: this.patterns.aura, mask: this.masks.creditCard },
        { name: 'Diners', image: 'diners.png', pattern: this.patterns.diners, mask: this.masks.creditCard3 },
        { name: 'Discover', image: 'discover.png', pattern: this.patterns.discover, mask: this.masks.creditCard },
        { name: 'Elo', image: 'elo.jpg', pattern: this.patterns.elo, mask: this.masks.creditCard },
        { name: 'Hiper Card', image: 'hipercard.png', pattern: this.patterns.hipercard, mask: this.masks.creditCard },
        { name: 'Master', image: 'master.png', pattern: this.patterns.mastercard, mask: this.masks.creditCard },
        { name: 'Visa', image: 'visa.png', pattern: this.patterns.visa, mask: this.masks.creditCard },
      ]
      
    constructor(private http: HttpClient) {

    }

    getCities(filter: string): Observable<ICity[]> {    
        return this.http
            .get<ICidade[]>(`${environment.baseUrl}/CidadeEstado/RetornaCidadesEstados`, { params: { pesquisa: filter}})
            .pipe(
                map((cidades: ICidade[]) => cidades.map((cidade: ICidade) => {
                    const city: ICity = {
                        id: cidade.id,
                        name: cidade.nome,
                        uf: {
                            id: cidade.uf.id,
                            initials: cidade.uf.sigla,
                            name: cidade.uf.nome
                        }
                    };
                    return city;
                })),
            );
    }

    sendFormRDStationAndSiscoob(indication: IIndicacao): Observable<ResponseCadastroSiscoob> {
        return this.http
            .post<ResponseCadastroSiscoob>(`${environment.baseUrl}/Dotz/CadastroNovoAssociadoRD`, indication);
    }

    sendFormRDStationAndSiscoobInfoPlan(indication: IIndicacaoInfoPlanos): Observable<ResponseCadastroSiscoob> {
        return this.http
            .post<ResponseCadastroSiscoob>(`${environment.baseUrl}/Dotz/CadastroNovoAssociadoRD`, indication);
    }

    getFlagCardPatterns() : Array<FlagCardPattern> {
        return this.flagCardsPatterns;
    }

    getInfoPlans(infoPlan: IPlanRequest): Observable<IPlan[]> {
        return this.http
            .get<IPlan[]>(`${environment.baseUrl}/VendaSemAdesao/GetInfoPlans?plCodigo=${infoPlan.plCodigo}&qtDiarias=${infoPlan.qtdDiarias}&plFamilia=${infoPlan.plFamilia}`);
    }

    login(credentials: ICredentialLogin): Observable<IPersonalInfo> {
        return this.http
            .post<IPersonalInfo>(`${environment.baseUrl}/Usuario/Login`, credentials);
    }

    buyPlan(buyPlan: IBuyPlan) {
        // retirando mascaras e formatando objeto
        buyPlan.personalInfo.cpf = buyPlan.personalInfo.cpf.replace(/(\.|\-)/g, '').toString();
        if (buyPlan.personalInfo.cpfIndicator) {
            buyPlan.personalInfo.cpfIndicator = buyPlan.personalInfo.cpfIndicator.replace(/(\.|\-)/g, '').toString();
        }
        buyPlan.personalInfo.phone = buyPlan.personalInfo.phone.replace(/(\-|\(| )/g, '').toString();
        buyPlan.personalInfo.phone = buyPlan.personalInfo.phone.replace(')', '-').toString();
        buyPlan.personalInfo.address.zipCode = buyPlan.personalInfo.address.zipCode.toString();
        buyPlan.personalInfo.address.number = Number(buyPlan.personalInfo.address.number);

        if (buyPlan.personalInfo?.address?.idCity) {
            buyPlan.personalInfo.address.idCity = Number(buyPlan.personalInfo.address.idCity);
        }

        if (buyPlan.personalInfo.phone.indexOf('-') < 0) {
            const phoneArray: string[] = buyPlan.personalInfo.phone.split('');
            phoneArray.splice(2, 0, '-');
            buyPlan.personalInfo.phone = phoneArray.join('');
        }

        return this.http
            .post(`${environment.baseUrl}/Associe/CadastroNovoAssociado`, buyPlan);
    }

    checkCoupom(setupPlan: IPlanRequest) {
        return this.http
            .get<Price>(`${environment.baseUrl}/VendaSemAdesao/ValidateDiscountCoupon?plCodigo=${setupPlan.plCodigo}&plFamilia=${setupPlan.plFamilia}&qtdDiarias=${setupPlan.qtdDiarias}&cupomDesconto=${setupPlan.cupomDesconto}`);
    }

    isClient(cpf: string) {
        cpf = cpf.replace(/(\.|\-)/g, '').toString();
        return this.http
            .get<boolean>(`${environment.baseUrl}/Usuario/RegisteredUser?cpf=${cpf}`);
    }

    // isIndicated(email: string) {
    //     return this.http
    //         .get<boolean>(`${environment.baseUrl}/Usuario/UserIndicated?email=${email}`);
    // }

    isIndicator(cpf: string, email: string) {
        return this.http
            .get<boolean>(`${environment.baseUrl}/Usuario/UserIndicated?cpfIndicator=${cpf}&email=${email}`);
    }

    hasRestriction(cpf: string) {
        return this.http
            .get<boolean>(`${environment.baseUrl}/Usuario/HasRestriction?cpf=${cpf}`);
    }

    getAddress(cep: string) {
        return this.http
            .get<IAddress>(`${environment.baseUrl}/CidadeEstado/VerifyZipCode?cep=${cep}`);
    }
}
