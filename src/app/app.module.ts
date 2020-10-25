import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SlidersComponent } from './sliders/sliders.component';
import { IconsComponent } from './icons/icons.component';
import { ModelBasedDataExtractionComponent } from './model-based-data-extraction/model-based-data-extraction.component';

@NgModule({
  declarations: [AppComponent, MapComponent, SlidersComponent, IconsComponent, ModelBasedDataExtractionComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
