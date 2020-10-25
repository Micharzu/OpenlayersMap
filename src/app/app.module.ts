import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SlidersComponent } from './sliders/sliders.component';
import { IconsComponent } from './icons/icons.component';

@NgModule({
  declarations: [AppComponent, MapComponent, SlidersComponent, IconsComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
