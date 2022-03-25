import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILink } from 'src/app/home/interfaces/link';
import { ILinkSubMenu } from 'src/app/home/interfaces/link-submenu';
import { IPlan, Plan } from 'src/app/home/interfaces/plan';
import { HomeService } from 'src/app/home/services/home.service';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-plans',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  baseAssets: string = environment.baseAssets;
  
  public links: ILinkSubMenu[] = [];
  public plans: IPlan[] = [];
  public selectedPlan: Plan = new Plan();
  
  public isMenuCollapsed = true;

  @Output() changePlan: EventEmitter<IPlan> = new EventEmitter();

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private base64Service: Base64Service,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();

    this.homeService
      .getPlans()
      .subscribe((plans: IPlan[]) => {
        this.plans = plans;
        
        this.links = this.homeService.getLinksSubMenu();
  
        const selected = this.links.find(link => link.selecionado);

        const plan = this.getPlanByParams();
        if (plan) {
          this.selectedPlan = plan;
          this.links.forEach(link => {
            if (this.selectedPlan.id == link.id) link.selecionado = true;
            else link.selecionado = false;
          });
          this.changePlan.emit(this.selectedPlan);  
          this.spinner.hide();
          return;
        }

        if (selected) {
          const selectedPlan = this.plans.find(plan => plan.id == selected.id);
          if (selectedPlan) {
            this.selectedPlan = selectedPlan;
          }
        }
        this.spinner.hide();
        this.changePlan.emit(this.selectedPlan);
      }, () => this.spinner.hide());
  }

  getPlanByParams() {
    const plan = this.route.snapshot.queryParams['plan'];
    
    if (plan) {
        const infoPlanJson: IPlan = JSON.parse(this.base64Service.decode(plan));
        return infoPlanJson;
    }
    return null;
  }

  selectPlan(link: ILinkSubMenu) {

    this.isMenuCollapsed = true;
    
    this.links.forEach(linkFor => {
      if (linkFor.id == link.id) {
        linkFor.selecionado = true;
      } else {
        linkFor.selecionado = false;
      }
    })

    this.plans.forEach(planFilter => {
      if (planFilter.id == link.id) {
        this.selectedPlan = planFilter;
      }
    });

    this.changePlan.emit(this.selectedPlan);
  }

}
