import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { MapComponent } from './map/map.component';
const routes: Routes = [
  {
    path:"devices", component:DevicesComponent
  },
  {
    path:"map", component:MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
