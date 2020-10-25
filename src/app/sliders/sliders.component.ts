import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
})
export class SlidersComponent implements OnInit {
  private subscription: Subscription;

  featureSliderList;

  vldisplayedValue;
  viewLayerFeatures = [
    {
      id: 'vl-1',
      name: 'name-1',
      feature: 'viewLayer',
      value: 5,
      scale: 12,
      displayedValue: '',
    },
    {
      id: 'vl-2',
      name: 'name-2 visibility',
      feature: 'viewLayer',
      value: 29,
      scale: 100,
      displayedValue: '',
    },
    {
      id: 'vl-3',
      name: 'Background map visibility',
      feature: 'viewLayer',
      value: 55,
      scale: 100,
      displayedValue: '',
    },
    {
      id: 'vl-4',
      name: 'name-4',
      feature: 'viewLayer',
      value: 55,
      scale: 100,
      displayedValue: '',
    },
  ];

  constructor(private mapService: MapService) {}

  toggleSlider(e) {
    let targetElement = e.target.parentElement;

    for (let i = 0; i < 3; i++) {
      if (targetElement.classList.contains('slider')) {
        break;
      }
      targetElement = targetElement.parentElement;
    }
    targetElement.classList.toggle('closed');
  }

  updateValue(id: string, e) {
    let feature = this.viewLayerFeatures.find((obj) => {
      return obj.id === id;
    });

    if (feature.id === 'vl-1') {
      feature.displayedValue = `${e.target.value}x`;
    } else {
      feature.displayedValue = `${e.target.value}%`;
    }
  }

  ngOnInit() {
    this.featureSliderList = document.querySelectorAll('.slider');

    this.viewLayerFeatures.forEach((vlFeature) => {
      if (vlFeature.id === 'vl-1') {
        vlFeature.displayedValue = `${vlFeature.value}x`;
      } else {
        vlFeature.displayedValue = `${vlFeature.value}%`;
      }
    });

    this.subscription = this.mapService.markerState.subscribe((state) => {
      if (state) {
        this.featureSliderList.forEach((el) => {
          el.classList.remove('closed');
        });
      } else {
        this.featureSliderList.forEach((el) => {
          el.classList.add('closed');
        });
      }
    });
  }
}
