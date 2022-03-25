import { Component } from '@angular/core';
import { IPlan, Plan } from '../home/interfaces/plan';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent {
  title = 'Vendas';

  public selectedPlan: Plan = new Plan();

  OnChangePlan(plan: IPlan) {
    this.selectedPlan = plan;
  }
}
