import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  appId = '45f4dd45e0f724512ba044c5a2caf4bc';
  baseUrl = 'http://api.openweathermap.org/data/2.5/';
  units = 'metric'

  constructor(private http: HttpClient) { }

  /**
   * Gets city
   * @param cityName 
   * @returns city 
   */
  getWeatheritemsbyCity(cityName: string): Observable<any> {
    return this.http.get(
      this.baseUrl +
      'weather?q=' + cityName +
      '&appid=' + this.appId +
      '&units=' + this.units
    )
  }
  /**
   * Gets weather data
   * @param cityName 
   * @returns weather data 
   */
  getWeatherForecast(cityName: string): Observable<any> {
    return this.http.get(
      this.baseUrl +
      'forecast?q=' + cityName +
      '&appid=' + this.appId +
      '&units=' + this.units
    )
  }
}
