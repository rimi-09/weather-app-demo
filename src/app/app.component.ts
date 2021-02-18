import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from './services/weather.service'
import * as Highcharts from 'highcharts/highstock';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('container', {read : ElementRef, static: true}) container: ElementRef;
  public options = {};
  weatherForecastData: any;
  errorMessage = '';
  location: string;
  loader = false;
  sunRise: any;
  sunSet: any;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.onSubmit('Delhi');
  }

/**
   * Creates chart
   */
  createChart() {
    this.options = {

      chart: {
        type: 'column',
        height: 244,
        width: 500,
        borderRadius:5,
        backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [
              [0, 'rgb(255, 255, 255)'],
              [1, 'rgb(200, 200, 255)']
          ]
      },
      },
      title: {
        text: ''
      },
      tooltip: {
        headerFormat: '<table>',
        formatter: a => {
          const point = a.chart.hoverPoint;
          return "Sea Level: " + point.y
      },
        footerFormat: '</table>',
        useHTML: true,
        shadow: true,
        shared: true,
        borderRadius:5,
      },
      plotOptions: {
          series: {
              dataLabels: {
                  enabled: false,
                  inside: false
              }
          }
      },
  
      xAxis: {
          type: 'category',
          lineWidth: 0,
          tickWidth: 0
      },
  
      yAxis: {
          title: {
              text: ''
          }
      },
  
      series: [{
          data: [{
              y: this.weatherForecastData.list[0].main.sea_level,
              name:this.findDay(new Date((this.weatherForecastData.list[0].dt) * 1000).getDay()) + ',' + new Date((this.weatherForecastData.list[0].dt) * 1000).getDate()
          }, {
              y: this.weatherForecastData.list[1].main.sea_level,
              name:this.findDay(new Date((this.weatherForecastData.list[8].dt) * 1000).getDay())+',' + new Date((this.weatherForecastData.list[8].dt) * 1000).getDate()
          }, {
              y: this.weatherForecastData.list[2].main.sea_level,
              name: this.findDay(new Date((this.weatherForecastData.list[16].dt) * 1000).getDay())+',' + new Date((this.weatherForecastData.list[16].dt) * 1000).getDate()
          }, {
              y: this.weatherForecastData.list[3].main.sea_level,
              name: this.findDay(new Date((this.weatherForecastData.list[24].dt) * 1000).getDay())+',' + new Date((this.weatherForecastData.list[24].dt) * 1000).getDate()
          }, {
              y: this.weatherForecastData.list[4].main.sea_level,
              name: this.findDay(new Date((this.weatherForecastData.list[32].dt) * 1000).getDay())+',' + new Date((this.weatherForecastData.list[32].dt) * 1000).getDate()
          }],
          showInLegend: false
      }]
    };
    Highcharts.chart(this.container.nativeElement, this.options);
  }

  cityDetails(id: string) {
    this.onSubmit(id);
  }

  /**
   * Determines whether submit on
   * @param cityName 
   */
  onSubmit(cityName: string) {
    cityName = cityName.trim();
    if (cityName) {
      this.loader = true;
      this.weatherService.getWeatherForecast(cityName).subscribe(data => {
        this.weatherForecastData = data;
        this.sunRise = data.city.sunrise;
        this.sunSet = data.city.sunset;
        this.createChart();
      }, error => {
        this.loader = false;
        this.location = '';
        this.errorMessage = `We could not find ${cityName}, please enter another city or try again later!`;
      }
        , () => {
          this.location = '';
          this.loader = false;
          this.errorMessage = '';
        });
    }
  }

  /**
   * Finds day
   * @param weekday 
   * @returns  
   */
  findDay(weekday: number) {
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayName[weekday];
  }
}
