import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  encode(frase: string): string {
    return btoa(frase);
  }

  decode(codigo: string): string {
    return atob(codigo);
  }
}
