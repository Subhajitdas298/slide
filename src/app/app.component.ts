import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { LatLongService } from './lat-long.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private latLongService: LatLongService) {}

  @ViewChild('panel', {static: true}) panel: ElementRef<HTMLDivElement>;

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
  }

  updatePosition(){
    const secondPostion = this.panel.nativeElement.scrollWidth; // max scroll
    const threshold = this.panel.nativeElement.scrollWidth * 40 / 180; // 70 + 30 + 70 = 170
    // console.log(secondPostion + ' ' + threshold + ' ' + this.panel.nativeElement.scrollLeft);
    const options: ScrollToOptions = {
      top: 0,
      left: (this.panel.nativeElement.scrollLeft > threshold) ? secondPostion : 0 ,
      behavior: 'smooth'
    };
    this.panel.nativeElement.scrollTo(options);
  }
}
