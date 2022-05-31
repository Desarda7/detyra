import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import * as L from 'leaflet';
import { icon } from 'leaflet';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../services/data.service';

@Component({

  selector: 'app-map',

  templateUrl: './map.component.html',
  
  styleUrls: ['./map.component.css']
  
  })
  
  export class MapComponent implements AfterViewInit {


    private map: any;
    constructor( private dataService: DataService){}
  
    ngAfterViewInit(): void {
    

  
     this.initMap();
  
  this.dataService.getData().subscribe((res: any)=>{
      for(const c of res){
        const lat=c.latitude;
        const lon=c.longitude;
  const marker=L.marker([lat, lon],
  
      {
  
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          iconRetinaUrl: 'leaflet/marker-icon-2x.png',
          shadowUrl: 'leaflet/marker-shadow.png'

        })

    }

  ).addTo(this.map);

 

marker.bindPopup(`<center>

    <p><strong>${c.name}</strong></p>
    <p>${c.category}</p>
    <p>${c.type}</p>
  </center>`)

 }

 })
 }



private initMap(): void{

  this.map=L.map('map').setView([ 41.327953, 19.819025], 13);
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:18,
      minZoom: 8,
      attribution:`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`

  });



 tiles.addTo(this.map);

//  this.map.invalidateSize();

}

}
  