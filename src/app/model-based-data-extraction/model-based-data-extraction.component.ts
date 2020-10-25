import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-model-based-data-extraction',
  templateUrl: './model-based-data-extraction.component.html',
  styleUrls: ['./model-based-data-extraction.component.scss'],
})
export class ModelBasedDataExtractionComponent implements OnInit {
  slider: HTMLElement;
  private subscription: Subscription;

  constructor(private mapService: MapService) {}

  toggleSlider() {
    this.slider.classList.toggle('closed');
  }

  ngOnInit() {
    this.slider = document.querySelector('.mbde-slider');

    this.subscription = this.mapService.markerState.subscribe((state) => {
      if (state) {
        this.slider.classList.remove('closed');
      } else {
        this.slider.classList.add('closed');
      }
    });
  }
}
