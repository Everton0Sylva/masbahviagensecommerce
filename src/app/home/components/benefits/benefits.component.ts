import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { environment } from 'src/environments/environment';
import { Plan } from '../../interfaces/plan';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  @Input() public selectedPlan: Plan = new Plan();

  baseAssets: string = environment.baseAssets;
  
  constructor(
    private router: Router,
    private base64Service: Base64Service,
  ) { }

  ngOnInit(): void {
  }

  goPlans() {
    this.router.navigate(['plans'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

  goCheckout() {
    this.router.navigate(['checkout'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

}
