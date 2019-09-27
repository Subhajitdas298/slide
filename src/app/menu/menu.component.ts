import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() choose = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  navigate(location) {
    console.log(location)
    this.choose.emit(location);
  }

}
