import { Injectable } from '@angular/core';
import { ILink } from 'src/app/home/interfaces/link';
import { ILinkSubMenu } from 'src/app/home/interfaces/link-submenu';
import { IPlan } from 'src/app/home/interfaces/plan';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlansService {

  baseAssets: string = environment.baseAssets;

  constructor() { }

  getLinks(): ILink[] {
    return [
      { name: 'Benefícios', url: '#beneficios', button: false, target: '' },
      { name: 'Destinos', url: '#destinos', button: false, target: '' },
      { name: 'Indique+', url: '#indique-mais', button: false, target: '' },
      { name: 'Depoimentos', url: '#depoimentos', button: false, target: '' },
      { name: 'Assine', url: '#assina', button: true, target: '' },
    ];
  }

  getLinksSubMenu(): ILinkSubMenu[] {
    return [
      { id: 1, name: 'GO!', url: '#go', selecionado: false },
      { id: 2, name: 'VIP', url: '#vip', selecionado: false },
      { id: 3, name: 'MASTER', url: '#master', selecionado: false },
      { id: 4, name: 'GOLD VIP', url: '#gold-vip', selecionado: false },
      { id: 5, name: 'GOLD MASTER', url: '#gold-master', selecionado: false },
      { id: 6, name: 'DIAMANTE', url: '#diamante', selecionado: true },
    ];
  }

  getPlans(): IPlan[] {
    return [
      { 
        id: 1,
        name: 'GO!',
        prices: {
          subTotal: '100.10',
          discount: '0.10',
          total: '100.00'
        },
        image: [
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/img-diamante-498x377px.png`, city: 'Gravataí', },
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/img-diamante-498x377px.png`, city: 'Gravataí' },
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/img-diamante-498x377px.png`, city: 'Gravataí' },
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/img-diamante-498x377px.png`, city: 'Gravataí' },
        ],
        description: 'Lorem Ipsum dolor sit amet, consectetuer lorem upsum',
        category: 'Luxo, Super Luxo e Resorts',
        use: 'Ano Todo',
        hotelChain: 'Nacional e Internacional',
        modality: 'Casal e Família',
        imageHotels: [
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (GO)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ]
      },
      { 
        id: 2,
        name: 'VIP',
        prices: {
          subTotal: '200.20',
          discount: '0.20',
          total: '200.00'
        },
        image: [
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ],
        description: 'Lorem Ipsum dolor sit amet, consectetuer lorem upsum',
        category: 'Luxo, Super Luxo e Resorts',
        use: 'Ano Todo',
        hotelChain: 'Nacional e Internacional',
        modality: 'Casal e Família',
        imageHotels: [
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ]
      },
      { 
        id: 3,
        name: 'MASTER',
        prices: {
          subTotal: '300.30',
          discount: '0.30',
          total: '300.00'
        },
        image: [
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ],
        description: 'Lorem Ipsum dolor sit amet, consectetuer lorem upsum',
        category: 'Luxo, Super Luxo e Resorts',
        use: 'Ano Todo',
        hotelChain: 'Nacional e Internacional',
        modality: 'Casal e Família',
        imageHotels: [
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ]
      },
      { 
        id: 4,
        name: 'GOLD VIP',
        prices: {
          subTotal: '400.40',
          discount: '0.40',
          total: '400.00'
        },
        image: [
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ],
        description: 'Lorem Ipsum dolor sit amet, consectetuer lorem upsum',
        category: 'Luxo, Super Luxo e Resorts',
        use: 'Ano Todo',
        hotelChain: 'Nacional e Internacional',
        modality: 'Casal e Família',
        imageHotels: [
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (GOLD VIP)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ]
      },
      { 
        id: 5,
        name: 'GOLD MASTER',
        prices: {
          subTotal: '500.50',
          discount: '0.50',
          total: '500.00'
        },
        image: [
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ],
        description: 'Lorem Ipsum dolor sit amet, consectetuer lorem upsum',
        category: 'Luxo, Super Luxo e Resorts',
        use: 'Ano Todo',
        hotelChain: 'Nacional e Internacional',
        modality: 'Casal e Família',
        imageHotels: [
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (GOLD MASTER)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ]
      },
      { 
        id: 6,
        name: 'DIAMANTE',
        prices: {
          subTotal: '600.60',
          discount: '0.60',
          total: '600.00'
        },
        image: [
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ],
        description: 'Lorem Ipsum dolor sit amet, consectetuer lorem upsum',
        category: 'Luxo, Super Luxo e Resorts',
        use: 'Ano Todo',
        hotelChain: 'Nacional e Internacional',
        modality: 'Casal e Família',
        imageHotels: [
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Gravataí' },
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Porto Alegre' },
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Cachoeirinha' },
          { name: 'ABC (DIAMANTE)', url: `${this.baseAssets}/home/imghoteldiamante-282x282px.png`, city: 'Alvorada' },
        ]
      },
    ]
  }
}
