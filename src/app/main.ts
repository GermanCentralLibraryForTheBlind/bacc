import { Component } from '@angular/core';
import { Router }   from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class AppComponent {

  constructor(router:Router) {
    router.navigate(['/co']); // bootstrap default route ...
  }
}
