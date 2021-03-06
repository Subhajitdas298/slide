import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map
} from 'rxjs/operators';
import { LatLongService } from './lat-long.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private latLongService: LatLongService, private router: Router) { }

  @ViewChild('panel', { static: true }) panel: ElementRef<HTMLDivElement>;

  timeout: any;

  ngOnInit(): void {
    this.latLongService.getLatLong().subscribe((latLong) => {
      sessionStorage.setItem('latLong', JSON.stringify(latLong));
    });

    fromEvent(this.panel.nativeElement, 'scroll').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(100)
    ).subscribe(() => this.updatePosition());

    this.router.navigate(['/home']);
  }

  updatePosition() {
    const secondPostion = this.panel.nativeElement.scrollWidth; // max scroll
    const threshold = this.panel.nativeElement.scrollWidth * 40 / 180; // 70 + 30 + 70 = 170
    // console.log(secondPostion + ' ' + threshold + ' ' + this.panel.nativeElement.scrollLeft);
    const options: ScrollToOptions = {
      top: 0,
      left: (this.panel.nativeElement.scrollLeft > threshold) ? secondPostion : 0,
      behavior: 'smooth'
    };
    this.panel.nativeElement.scrollTo(options);
  }

  navigate(location) {
    this.router.navigate([location]);
    const options: ScrollToOptions = {
      top: 0,
      left: 0,
      behavior: 'smooth'
    };
    this.panel.nativeElement.scrollTo(options);
  }

  @HostListener('window:touchend', ['$event.target'])
  globalAction(targetElement: string) {
    console.log(`Action on `, targetElement);
    // reset timeout
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('Session timeout');
      this.navigate('/home');
    }, 30000);
  }
}
