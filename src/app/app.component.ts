import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'dotz';

  ngOnInit(): void {
    if (window.location.host == 'coobmais.com.br') {
      window.location.host = 'www.coobmais.com.br';
    }
  }

}
