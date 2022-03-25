import { IImageHotel, ImageHotel } from "./image-hotel";
import { Price } from "./price";

export interface IPlan {
    id: number;
    name: string;
    prices: Price;
    image: IImageHotel[];
    description: string;
    category: string;
    use: string;
    hotelChain: string;
    modality: string;
    imageHotels: IImageHotel[];
}

export class Plan implements IPlan {
    id: number;
    name: string = '';
    prices: Price = new Price();
    image: ImageHotel[] = new Array<ImageHotel>();
    description: string = '';
    category: string = '';
    use: string = '';
    hotelChain: string = '';
    modality: string = '';
    imageHotels: ImageHotel[] = new Array<ImageHotel>();
}