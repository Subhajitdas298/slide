import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { OpenWeatherMapWeather } from '../model/open-weather-map-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = environment.weatherApi;
  private apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) { }

  getWeather(): Observable<OpenWeatherMapWeather> {
    const weatherUrl = this.apiUrl + '/forecast';
    let params = new HttpParams();
    params = params.append('APPID', this.apiKey);
    params = params.append('lat', 12.838.toString());
    params = params.append('long', 77.649.toString());
    return this.http.get<OpenWeatherMapWeather>(weatherUrl, {params});
  }

}
