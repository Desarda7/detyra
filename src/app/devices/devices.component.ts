import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit{
  displayedColumns: string[] = ['name', 'type', 'category','latitude', 'longitude' , 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  
  constructor(private dialog : MatDialog, private api : ApiService) { 

  }
  ngOnInit(): void {
    this.getAllDevices();
     
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    })
  
    .afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllDevices();
      }
    })
  }
  getAllDevices(){
    this.api.getDevice()
    .subscribe({
      next:(res)=>{
        console.log(res);
        
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error:(err)=>{
        alert("Error while fetching the Records!")
      }
    })
  }


  editDevice(row : any){
   this.dialog.open(DialogComponent,{
     width:'30%',
     data:row
   }).afterClosed().subscribe(val=>{
    if(val === 'update'){
      this.getAllDevices();
    }
  })
  }
  deleteDevice(id : number){
    this.api.deleteDevice(id)
    .subscribe({
      next:(res)=>{
        alert("Device Deleted Successfully!");
        this.getAllDevices();

      },
      error:()=>{
        alert("Error while deleting the device! ")
      }
    })
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}