import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-xss',
  templateUrl: './xss.component.html',
  styleUrls: ['./xss.component.css']
})
export class XssComponent {

  public name: string;
  public strings: string[];
  public dangerousUrl: string;
  public trustedUrl: SafeUrl;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private sanitizer: DomSanitizer
  ) {
    this.listAll();
    this.dangerousUrl = "javascript:document.write('Yeah')";
    this.trustedUrl = sanitizer.bypassSecurityTrustUrl('javascript:alert("Hi there")');
  }




  public save(): void {
    if (this.name && this.name.trim() != '') {
      this.http.post(this.baseUrl + "api/xss", JSON.stringify(this.name), {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .subscribe(x => {
          this.listAll();
          this.name = '';
        });
    }
  }

  private listAll(): void {
    this.http.get<string[]>(this.baseUrl + "api/xss")
      .subscribe((strings) => {
        this.strings = strings;
      });
  }


}
