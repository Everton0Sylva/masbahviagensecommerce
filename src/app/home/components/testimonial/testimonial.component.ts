import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { environment } from 'src/environments/environment';
import { Plan } from '../../interfaces/plan';
import { Testimonial } from '../../interfaces/testimonial';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  @Input() public selectedPlan: Plan = new Plan();

  baseAssets: string = environment.baseAssets;
  testimonial: Testimonial;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private base64Service: Base64Service,
  ) {}

  ngOnInit(): void {
    this.homeService
      .getTestimonial()
      .subscribe((resp: Testimonial) => {
        this.testimonial = resp;
      });
  }

  goPlans() {
    this.router.navigate(['plans'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

  goCheckout() {
    this.router.navigate(['checkout'], { queryParams: { plan: this.base64Service.encode(JSON.stringify(this.selectedPlan)) } });
  }

}
