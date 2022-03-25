import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [
    NgbCollapseModule,
    NgxMaskModule,
  ]
})
export class BootstrapModule { }
