import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { EPlans } from 'src/app/checkout/enums/plans.enum';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { environment } from 'src/environments/environment';
import { IImageHotel } from '../interfaces/image-hotel';
import { ILink } from '../interfaces/link';
import { ILinkSubMenu } from '../interfaces/link-submenu';
import { IPlan } from '../interfaces/plan';
import { Testimonial } from '../interfaces/testimonial';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseAssets: string = environment.baseAssets;

  constructor(
    private http: HttpClient,
    private router: Router,
    private base64Service: Base64Service,
  ) { }

  getLinks(): ILink[] {
    return [
      { name: 'Benefícios', url: '#beneficios', button: false, target: '', action: () => {} },
      { name: 'Destinos', url: '#destinos', button: false, target: '', action: () => {} },
      { name: 'Indique+', url: 'https://www.coobmais.com.br/indiquemais/', button: false, target: '_blank', action: () => {} },
      { name: 'Depoimentos', url: '#depoimentos', button: false, target: '', action: () => {} },
      // { name: 'Assine', url: '', button: true, action: () => {} },
    ];
  }

  getLinksSubMenu(): ILinkSubMenu[] {
    return [
      { id: EPlans.Diamante, name: 'DIAMANTE', url: '#diamante', selecionado: true, paramsSearch: 'diamante' },
      { id: EPlans['Gold Vip'], name: 'GOLD VIP', url: '#gold-vip', selecionado: false, paramsSearch: 'goldvip' },
      { id: EPlans['Gold Master'], name: 'GOLD MASTER', url: '#gold-master', selecionado: false, paramsSearch: 'goldmaster' },
      { id: EPlans.Vip, name: 'VIP', url: '#vip', selecionado: false, paramsSearch: 'vip' },
      { id: EPlans.Master, name: 'MASTER', url: '#master', selecionado: false, paramsSearch: 'master' },
      { id: EPlans['GO! Vip'], name: 'GO! VIP', url: '#govip', selecionado: false, paramsSearch: 'govip' },
      { id: EPlans['GO! Master'], name: 'GO! MASTER', url: '#gomaster', selecionado: false, paramsSearch: 'gomaster' },
    ];
  }

  getTestimonial(): Observable<Testimonial> {
    return this.http
      .get<Testimonial>(`${environment.baseUrl}/VendaSemAdesao/GetTestimonial`)
      .pipe(retry(2));
  }

  getPlans(): Observable<IPlan[]> {
    return this.http
      .get<IPlan[]>(`${environment.baseUrl}/VendaSemAdesao/GetPlansImages`)
      .pipe(retry(2));
  }

  searchHotels(filter: string) {
    return this.http
      .get<IImageHotel[]>(`${environment.baseUrl}/VendaSemAdesao/SearchHotels?cityorHotel=${filter}`)
      .pipe(
        retry(2)
      );
  }

  getImage(imageUrl: string): Observable<any> {
    return this.http.get(imageUrl);
  }
}
