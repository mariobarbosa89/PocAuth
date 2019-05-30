import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.listWeatherForecasts();
  }

  public listWeatherForecasts() {
    this.http.get<WeatherForecast[]>(this.baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  public create(): void {
    let data = "Teste " + (new Date()).getTime().toString();
    this.http.post(this.baseUrl + "api/SampleData", JSON.stringify(data), {
      headers: {
         "Content-Type": "application/json"
      }
    })
    .subscribe(()=>{
      this.listWeatherForecasts();
    });
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
