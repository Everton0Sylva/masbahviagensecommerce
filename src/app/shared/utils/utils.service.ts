export class Utils {
    
    constructor() {}

    static somenteLetras(caractere: any) {
        return /[A-Za-zÀ-Úà-ú]| /.test(caractere);
    }

    static somenteNumeros(caractere: any) {
        return /[0-9]/.test(caractere);
    }

    static formatPrice(price: number, part: number) {
        const value = price.toString().split('.');
        
        if (part == 1) return value[0];
        if (part == 2) {
            if (value[1]?.toString().length == 1) return value[1]+'0';
            if (value[1]) return value[1];
          return '00';
        }
        return price;
    }

    static limitCharacters(limit: number, phrase: string, key: KeyboardEvent) {
        if (phrase && phrase.toString().length >= limit && key.code != 'Backspace') {
            return false;
        }
        return true;
    }
}