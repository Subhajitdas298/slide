import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { OpenWeatherMapWeatherForecast } from '../model/open-weather-map-weather-forecast';
import { OpenWeatherMapWeather } from '../model/open-weather-map-weather';
import { LatLong } from '../model/lat-long';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = environment.weatherApi;
  private apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) { }

  getWeatherForecast(latLong: LatLong): Observable<OpenWeatherMapWeatherForecast> {
    const weatherUrl = this.apiUrl + '/forecast';
    let params = new HttpParams();
    params = params.append('APPID', this.apiKey);
    params = params.append('lat', (latLong.lat).toString());
    params = params.append('lon', (latLong.long).toString());
    params = params.append('cnt', (5).toString());
    params = params.append('units', 'metric');
    return this.http.get<OpenWeatherMapWeatherForecast>(weatherUrl, {params});
  }

  getCurrentWeather(latLong: LatLong): Observable<OpenWeatherMapWeather> {
    const weatherUrl = this.apiUrl + '/weather';
    let params = new HttpParams();
    params = params.append('APPID', this.apiKey);
    params = params.append('lat', (latLong.lat).toString());
    params = params.append('lon', (latLong.long).toString());
    params = params.append('units', 'metric');
    return this.http.get<OpenWeatherMapWeather>(weatherUrl, {params});
  }

}
