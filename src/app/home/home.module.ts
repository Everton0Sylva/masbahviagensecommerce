import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule } from 'swiper/angular';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BootstrapModule } from '../shared/modules/bootstrap.module';
import { HeaderComponent } from './components/header/header.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { MaterialModule } from '../shared/modules/material.module';
import { IndicateMoreComponent } from './components/indicate-more/indicate-more.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeService } from './services/home.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { LoadingInterceptor } from '../shared/services/loading.interceptor';
import { ShowPlanComponent } from './components/show-plan/show-plan.component';
import { Base64Service } from '../shared/services/base64.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    BenefitsComponent,
    DestinationsComponent,
    IndicateMoreComponent,
    TestimonialComponent,
    FooterComponent,
    ShowPlanComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BootstrapModule,
    MaterialModule,
    SwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    NgxSpinnerModule,
  ],
  providers: [
    HomeService,
    Base64Service,
  ]
})
export class HomeModule { }
