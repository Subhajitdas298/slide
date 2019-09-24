import { Component, OnInit, ElementRef } from '@angular/core';
import * as Slideout from 'node_modules/slideout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  slideout: Slideout;

  constructor(private elRef:ElementRef) {}

  ngOnInit(): void {
    this.slideout = new Slideout({
      'panel': this.elRef.nativeElement.querySelector('#panel'),
      'menu': this.elRef.nativeElement.querySelector('#menu'),
      'padding': 256,
      'tolerance': 70
    });
  }

  toggle() {
    this.slideout.toggle();
  }
}
