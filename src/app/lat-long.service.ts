import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LatLong } from './model/lat-long';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LatLongService {

  constructor(private http: HttpClient) { }

  getLatLong(): Observable<LatLong> {
    return this.http.get<LatLong>(environment.latLongApi + '/' + environment.signageId);
  }

}
