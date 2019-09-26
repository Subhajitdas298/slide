import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { OpenWeatherMapWeatherForecast } from '../model/open-weather-map-weather-forecast';
import { OpenWeatherMapWeather } from '../model/open-weather-map-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = environment.weatherApi;
  private apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) { }

  getWeatherForecast(): Observable<OpenWeatherMapWeatherForecast> {
    const weatherUrl = this.apiUrl + '/forecast';
    let params = new HttpParams();
    params = params.append('APPID', this.apiKey);
    params = params.append('lat', 12.838.toString());
    params = params.append('lon', 77.649.toString());
    //params = params.append('cnt', (5).toString());
    params = params.append('units', 'metric');
    return this.http.get<OpenWeatherMapWeatherForecast>(weatherUrl, {params});
  }

  getCurrentWeather(): Observable<OpenWeatherMapWeather> {
    const weatherUrl = this.apiUrl + '/weather';
    let params = new HttpParams();
    params = params.append('APPID', this.apiKey);
    params = params.append('lat', 12.838.toString());
    params = params.append('lon', 77.649.toString());
    params = params.append('units', 'metric');
    return this.http.get<OpenWeatherMapWeather>(weatherUrl, {params});
  }

}
