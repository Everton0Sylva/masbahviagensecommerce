import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { Utils } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';
import { ILinkSubMenu } from '../../interfaces/link-submenu';
import { IPlan, Plan } from '../../interfaces/plan';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-indicate-more',
  templateUrl: './indicate-more.component.html',
  styleUrls: ['./indicate-more.component.scss']
})
export class IndicateMoreComponent implements OnInit {

  @Input() public plans: IPlan[] = [];
  @Output() changePlan: EventEmitter<IPlan> = new EventEmitter();

  baseAssets: string = environment.baseAssets;
  baseImages: string = environment.baseImagens;

  public links: ILinkSubMenu[];
  public selectedPlan: Plan = new Plan();
  public selectedPlanGO: boolean = false;

  serviceSubscription: Subscription[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router,
    private base64Service: Base64Service,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans() {
    const subscription = this.homeService
      .getPlans()
      .subscribe((plans: IPlan[]) => {
        this.plans = plans;

        this.links = this.homeService.getLinksSubMenu();
    
        const planParams = this.route.snapshot.queryParams['plano'];

        let selected: ILinkSubMenu | any;
        if (planParams) {
          selected = this.links.find(link => link.paramsSearch == planParams || link.id == planParams);
          this.router.navigate([], { queryParams: { plano: planParams } });
          
          if (!selected)
            selected = this.links.find(link => link.selecionado);

        } else {
          selected = this.links.find(link => link.selecionado);
        }


        if (selected) {
          const selectedPlan = this.plans.find(plan => plan.id == selected.id);
          if (selectedPlan) {
            this.selectedPlan = selectedPlan;
            this.selectPlan(selected);
          }
        }
        this.changePlan.emit(this.selectedPlan);
      });

    this.serviceSubscription.push(subscription);
  }

  selectPlan(link: ILinkSubMenu) {
    
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

    const idPlan = this.selectedPlan.id;

    this.selectedPlanGO = idPlan === 41 || idPlan === 42;

    this.changePlan.emit(this.selectedPlan);
  }

  formatPrice(price: number, part: number) {
    return Utils.formatPrice(price, part);
  }

  goPlans() {
    this.router.navigate(['plans'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

  goCheckout() {
    this.router.navigate(['checkout'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

  ngOnDestroy() {
    this.serviceSubscription.forEach(subscription => subscription?.unsubscribe());
  }

}
