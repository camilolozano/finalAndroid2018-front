import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  public lat: number;
  public lng: number;

  constructor() { }

  ngOnInit() {
    this.lat = 51.678418,
    this.lng = 7.809007;
  }

}
