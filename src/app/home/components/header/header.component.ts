import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILink } from 'src/app/home/interfaces/link';
import { HomeService } from 'src/app/home/services/home.service';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { environment } from 'src/environments/environment';
import { Plan } from '../../interfaces/plan';

@Component({
  selector: 'app-header-home',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public selectedPlan: Plan = new Plan();

  baseAssets: string = environment.baseAssets;
  
  public links: ILink[];
  public isMenuCollapsed = true;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private base64Service: Base64Service,
  ) {
    this.links = this.homeService.getLinks();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toId();
  }
  
  toId() {
    const index = window.location.href.toString().indexOf('#');
    
    if (index >= 0) {
      const id = window.location.href.toString().substring(index + 1);
      window.location.hash = '';
      window.location.hash = id;
    }
  }

  goPlans() {
    this.router.navigate(['plans'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

  goCheckout() {
    this.router.navigate(['checkout'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

}
