import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule } from 'swiper/angular';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { BootstrapModule } from '../shared/modules/bootstrap.module';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../shared/modules/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { InfoPlanComponent } from './components/info-plan/info-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutService } from './services/checkout.service';
import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule } from 'ng-recaptcha';
import { IndicationComponent } from './components/indication/indication.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    HeaderComponent,
    FooterComponent,
    InfoPlanComponent,
    IndicationComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    BootstrapModule,
    MaterialModule,
    FlexLayoutModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    NgBrazil,
    NgxSpinnerModule,
    RecaptchaModule,
  ],
  providers: [
    CheckoutService
  ]
})
export class CheckoutModule { }
