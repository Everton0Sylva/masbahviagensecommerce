export interface IImageHotel {
    name: string;
    city: string;
    url: string;
    imageVerify?: boolean;
}

export class ImageHotel {
    name: string = '';
    city: string = '';
    url: string = '';
    imageVerify?: boolean;
}