import { Component, Injectable, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import * as olProj from 'ol/proj';
import Geolocation from 'ol/Geolocation';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import { format } from 'ol/coordinate';
import {
  ScaleLine,
  MousePosition,
  defaults as defaultControls,
} from 'ol/control';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapService {
  private markerClicked = new BehaviorSubject<boolean>(false);
  markerState = this.markerClicked.asObservable();

  currentState;

  vectorLayer = new VectorLayer({
    source: new VectorSource(),
  });

  map: Map;
  view = new View({
    center: [0, 0],
    zoom: 2,
  });

  markerFeature = new Feature();
  markerPixel;
  positionFeature = new Feature();

  vectorSource: VectorSource;
  scaleLine = new ScaleLine({
    units: 'metric',
  });
  coordsTemplate = 'x: {x} y: {y}';

  mousePositionControl = new MousePosition({
    coordinateFormat: (coord) => {
      return format(coord, this.coordsTemplate, 4);
    },
    projection: 'EPSG:4326',
    undefinedHTML: '&nbsp;',
  });

  geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection: this.view.getProjection(),
  });

  onMarkerClick() {
    this.markerClicked.next(!this.currentState);
    this.currentState = !this.currentState;
  }

  updateMarker(coords) {
    let coordinates = coords.coordinate;
    let newClickPosition = this.map.getPixelFromCoordinate(coordinates);

    if (this.vectorSource.hasFeature(this.markerFeature)) {
      if (this.checkIfMarkerClicked(newClickPosition)) {
        this.onMarkerClick();
        return;
      }
      this.vectorSource.removeFeature(this.markerFeature);
      this.markerClicked.next(false);
      this.currentState = false;
    }

    this.markerPixel = newClickPosition;

    // console.log(olProj.transform(coordinates, 'EPSG:3857', 'EPSG:4326'));

    this.markerFeature = new Feature(new Point(coordinates));
    var zIndex = 1;
    this.markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 105],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 1,
          src: '../assets/marker-icon.png',
          scale: 0.4,
          zIndex: zIndex,
        }),
        zIndex: zIndex,
      })
    );
    this.vectorSource.addFeature(this.markerFeature);
  }

  checkIfMarkerClicked(markerPosition) {
    let check = this.map.hasFeatureAtPixel(markerPosition, {
      hitTolerance: 10,
    });

    return check;
  }

  scaleControl() {
    this.scaleLine = new ScaleLine({
      units: 'metric',
    });
    return this.scaleLine;
  }

  setUpFeatures() {
    if (this.vectorSource) {
      this.vectorSource.clear();
    }

    this.geolocation.setTracking(true);
    this.vectorSource = this.vectorLayer.getSource();

    this.geolocation.on('error', function (error) {
      var info = document.getElementById('info');
      info.innerHTML = error.message;
      info.style.display = '';
    });

    this.positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
    this.geolocation.on('change:position', () => {
      let coordinates = this.geolocation.getPosition();
      this.positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : null
      );
    });

    this.vectorSource.addFeature(this.positionFeature);

    this.map.on('singleclick', (e) => {
      this.updateMarker(e);
    });
  }

  setUpMap() {
    this.map = new Map({
      controls: defaultControls().extend([
        this.scaleControl(),
        this.mousePositionControl,
      ]),
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: this.view,
    });
    this.setUpFeatures();
  }
}
