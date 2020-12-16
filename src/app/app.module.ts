import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkerService } from './services/marker.service';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { MapComponent } from './maps/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [MarkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
