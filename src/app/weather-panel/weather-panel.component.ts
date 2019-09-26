import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { WeatherService } from './weather.service';
import { environment } from 'src/environments/environment';
import { Weather } from '../model/weather';
import { LatLong } from '../model/lat-long';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.css']
})
export class WeatherPanelComponent implements OnInit {

  imgApiBaseUrl: string;
  latLong: LatLong;

  currentTime: Date;
  clockTimer;
  weatherTimer;

  weathers: Weather[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.imgApiBaseUrl = environment.imgApi;
    // this.latLong = JSON.parse(sessionStorage.getItem('latLong'));
    this.latLong = {lat: 12, long: 77};

    this.updateClock();
    this.updateWeather();

    this.clockTimer = interval(1000);
    this.clockTimer.subscribe(
      () => this.updateClock()
    );

    this.weatherTimer = interval(600000);
    this.weatherTimer.subscribe(
      () => this.updateWeather()
    );
  }

  updateWeather() {
    this.weatherService.getCurrentWeather(this.latLong).subscribe(weather => {
      const w = new Weather();
      w.weatherType = weather.weather[0].id;
      w.description = weather.weather[0].description;
      w.weatherTypeString = weather.weather[0].main;
      w.icon = weather.weather[0].icon;
      w.clouds = weather.clouds.all;
      w.tempMin = weather.main.temp_min;
      w.tempMax = weather.main.temp_max;
      w.windSpeed = weather.wind.speed;
      w.dateTime = new Date(weather.dt * 1000);

      console.log(w);

      this.weathers = [];
      this.weathers[0] = w;

      this.weatherService.getWeatherForecast(this.latLong).subscribe(forecasts => {

        forecasts.list = forecasts.list.filter((forecastEntry) => {
          return (new Date(forecastEntry.dt * 1000) > this.currentTime);
        }).splice(0, environment.forecastCount);

        const w2 = new Weather();
        w2.weatherType = forecasts.list[0].weather[0].id;
        w2.description = forecasts.list[0].weather[0].description;
        w2.weatherTypeString = forecasts.list[0].weather[0].main;
        w2.icon = forecasts.list[0].weather[0].icon;
        w2.clouds = forecasts.list[0].clouds.all;
        w2.tempMin = forecasts.list[0].main.temp_min;
        w2.tempMax = forecasts.list[0].main.temp_max;
        w2.windSpeed = forecasts.list[0].wind.speed;
        w2.dateTime = new Date(forecasts.list[0].dt * 1000);

        this.weathers[1] = w2;
      })

    })

  }

  updateClock() {
    this.currentTime = new Date();
  }

  openSuggestions(index) {
    console.log(index);
  }

}
