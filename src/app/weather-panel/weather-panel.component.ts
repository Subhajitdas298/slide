import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.css']
})
export class WeatherPanelComponent implements OnInit {

  timer;

  constructor() { }

  ngOnInit() {
    this.timer = interval(60000);
    this.timer.subscribe(
      tick => this.update()
    );
  }

  update(){
    this.updateClock();
    this.updateWeather();
  }
  updateWeather() {
    
  }

  updateClock(){

  }

}
