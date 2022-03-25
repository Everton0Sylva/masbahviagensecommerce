import { Component, OnInit } from '@angular/core';
import { ILink } from 'src/app/home/interfaces/link';
import { HomeService } from 'src/app/home/services/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-home',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  baseAssets: string = environment.baseAssets;
  
  public links: ILink[];
  public isMenuCollapsed = true;

  constructor(private homeService: HomeService) {
    
    this.links = this.homeService.getLinks().filter(link => !link.button);
  }

  ngOnInit(): void {
  }

}
