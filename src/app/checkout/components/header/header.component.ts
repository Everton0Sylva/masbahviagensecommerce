import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-checkout',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  baseAssets: string = environment.baseAssets;
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
