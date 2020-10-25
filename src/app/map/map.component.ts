import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: Map;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.setUpMap();
    this.map = this.mapService.map;
  }
}
