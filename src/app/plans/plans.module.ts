import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule } from 'swiper/angular';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans.component';
import { BootstrapModule } from '../shared/modules/bootstrap.module';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../shared/modules/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { ShowPlanComponent } from './components/show-plan/show-plan.component';
import { HomeService } from '../home/services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { Base64Service } from '../shared/services/base64.service';
import { HeaderHomeComponent } from './components/header-home/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    PlansComponent,
    HeaderComponent,
    FooterComponent,
    ShowPlanComponent,
    HeaderHomeComponent,
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    BootstrapModule,
    MaterialModule,
    FlexLayoutModule,
    SwiperModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [
    HomeService,
    Base64Service,
  ]
})
export class PlansModule { }
