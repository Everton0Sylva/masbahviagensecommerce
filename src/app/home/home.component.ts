import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';
import { IPlan, Plan } from './interfaces/plan';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  title = 'Vendas';
  plans: IPlan[] = [];
  selectedPlan: Plan = new Plan();

  serviceSubscription: Subscription;

  constructor(
    private homeService: HomeService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  
  ngOnInit(): void {
    this.loadPlans();
    this.clearVendCodigo();
    this.setVendCodigo();
  }

  loadPlans() {
    this.homeService
      .getPlans()
      .subscribe((plans: IPlan[]) => {
        this.plans = plans;
      });
  }

  onChangePlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  clearVendCodigo() {
    this.storageService.removeItem('vendCodigo');
  }

  setVendCodigo() {
    let vendCodigo: string = this.route.snapshot.queryParams['vendCodigo'];
    
    if (Array.isArray(vendCodigo)) {
      vendCodigo = vendCodigo[0];
    }

    if (vendCodigo) {
      this.storageService.setItem('vendCodigo', vendCodigo);
      this.router.navigate([], { relativeTo: this.route, queryParams: null });
    }
    return;
  }
  
  ngOnDestroy() {
    this.serviceSubscription?.unsubscribe();
  }


}
