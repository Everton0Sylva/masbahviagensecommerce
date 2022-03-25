import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlan, Plan } from 'src/app/home/interfaces/plan';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { Utils } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-plan',
  templateUrl: './show-plan.component.html',
  styleUrls: ['./show-plan.component.scss']
})
export class ShowPlanComponent implements OnInit {

  @Input() selectedPlan: Plan = new Plan();

  baseAssets: string = environment.baseAssets;
  baseImages: string = environment.baseImagens;
  
  constructor(
    private router: Router,
    private base64Service: Base64Service,
  ) {
  }

  ngOnInit(): void {
  }

  formatPrice(price: number, part: number) {
    return Utils.formatPrice(price, part);
  }

  goCheckout() {
    this.router.navigate(['checkout'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

}
