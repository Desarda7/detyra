import { Component, AfterViewInit, } from '@angular/core';
import * as L from 'leaflet';
import { icon } from 'leaflet';
import { ApiService } from '../services/api.service';


@Component({

  selector: 'app-map',

  templateUrl: './map.component.html',
  
  styleUrls: ['./map.component.css']
  
  })
  
  export class MapComponent implements AfterViewInit {

    private map: any;
    constructor( private dataService: ApiService){}
    ngAfterViewInit(): void {
     this.initMap();
  

     
  this.dataService.getDevice().subscribe((res: any)=>{
    console.log(res);
    const cartographs = res;
      for(const c of cartographs){
        const lat=c.latitude;
        const lon=c.longitude;
        console.log(lat, lon);
  const marker=L.marker([lat, lon],
    {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: '../assets/image/marker-icon.png',
        iconRetinaUrl: '../assets/image/marker-icon-2x.png',
        shadowUrl: '../assets/image/marker-shadow.png'})

    }).addTo(this.map);

marker.bindPopup(`<center>

<p><strong>${c.name}</strong></p>
<p>${c.category}</p>
<p>${c.type}</p>
</center>`)

      }

    }
   
    )
 }


private initMap(): void{

  this.map=L.map('map').setView([ 41.9027835 , 12.4963655], 9);
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:18,
      minZoom: 4,
      attribution:`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`

  });


 tiles.addTo(this.map);

//  this.map.invalidateSize();

}

}
  

