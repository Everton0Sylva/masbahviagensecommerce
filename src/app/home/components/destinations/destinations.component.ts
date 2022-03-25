import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { environment } from 'src/environments/environment';

import SwiperCore, { Autoplay, Pagination, Navigation, Virtual, EffectFade } from "swiper";
import { SwiperComponent } from 'swiper/angular';
import { IImageHotel } from '../../interfaces/image-hotel';
import { ILinkSubMenu } from '../../interfaces/link-submenu';
import { IPlan, Plan } from '../../interfaces/plan';
import { HomeService } from '../../services/home.service';

SwiperCore.use([Autoplay, Pagination, Navigation, Virtual, EffectFade]);

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DestinationsComponent implements OnInit, OnDestroy {

  @ViewChild("swiperRef", { static: false }) swiperRef: SwiperComponent;
  @Input() public selectedPlan: Plan = new Plan();
  
  public links: ILinkSubMenu[];
  
  baseAssets: string = environment.baseAssets;
  baseImages: string = environment.baseImagens;

  searchFormGroup: FormGroup;
  hotelsResult: IImageHotel[] = [];

  serviceSubscription: Subscription[] = [];
  loadingSearchHotels: boolean = false;

  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,
    private router: Router,
    private base64Service: Base64Service,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.loadSearchForm();
  }

  searchHotels() {

    const searchControl = this.searchFormGroup.get('filter');

    if (searchControl?.value && searchControl.value.length >= 3) {

      this.spinner.show();

      this.loadingSearchHotels = true;
      const subscription = this.homeService
        .searchHotels(searchControl.value)
        .subscribe({
          next: async (imagesResult: IImageHotel[]) => {
            await imagesResult.map(async (imageHotel: IImageHotel) => {
              const response = await fetch(imageHotel.url);
              const contentHtml = await response.text();
              
              const initIndexNameFile = contentHtml.indexOf('01.');
              const lastIndexNameFile = contentHtml.indexOf('\"', initIndexNameFile);
              const nameFile = contentHtml.substring(initIndexNameFile, lastIndexNameFile);
        
              imageHotel.url = imageHotel?.url + nameFile;
              
              return imageHotel;
            });
  
            this.hotelsResult = imagesResult;
            this.loadingSearchHotels = false;

            this.spinner.hide();
          },
          error: () => {
            this.spinner.hide();
          }
        });

      this.serviceSubscription.push(subscription);
    }
  }

  loadSearchForm() {
    this.searchFormGroup = this.fb.group({
      filter: ['']
    });
  }

  goPlans() {
    this.router.navigate(['plans'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

  goCheckout() {
    this.router.navigate(['checkout'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

  getImageHotel(hotel: IImageHotel){
    (async () => {
      const response = await fetch(hotel.url);
      const contentHtml = await response.text();
      
      const initIndexNameFile = contentHtml.indexOf('01.');
      const lastIndexNameFile = contentHtml.indexOf('\"', initIndexNameFile);
      const nameFile = contentHtml.substring(initIndexNameFile, lastIndexNameFile);

      const fullPath = hotel?.url + nameFile;
      console.log(fullPath);
      
      hotel.url = fullPath;
      return fullPath;
    })();
  }

  ngOnDestroy() {
    this.serviceSubscription.forEach(subscription => subscription?.unsubscribe());
  }

}
