import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, objeto: string) {
    if (objeto && key) {
      localStorage.setItem(key, objeto);
    } else {
      throw new Error('precisa passar uma chave e um objeto');
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
