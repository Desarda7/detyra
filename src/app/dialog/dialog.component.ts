import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  deviceForm !: FormGroup;
  actionBtn:string ="Save"
  

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef : MatDialogRef<DialogComponent>){}
     

  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      name : ['', Validators.required],
      type : ['', Validators.required],
      category : ['', Validators.required],
      latitude : ['', Validators.required],
      longitude : ['', Validators.required]
    });

   if(this.editData){
     this.actionBtn="Update";
     this.deviceForm.controls['name'].setValue(this.editData.name);
     this.deviceForm.controls['type'].setValue(this.editData.type);
     this.deviceForm.controls['category'].setValue(this.editData.category);
     this.deviceForm.controls['latitude'].setValue(this.editData.latitude);
     this.deviceForm.controls['longitude'].setValue(this.editData.longitude);
   }
  }
addDevice(){  
  if(!this.editData){
   if(this.deviceForm.valid){
      this.api.postDevice(this.deviceForm.value)
      .subscribe({
        next:(res)=>{
          alert("Device added successfully");
          this.deviceForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the device")
        }
      })
    }
  }else{
    this.updateDevice()
  }
}
updateDevice(){
  this.api.putDevice(this.deviceForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Device updated Successfully");
      this.deviceForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating the record!");
    }
  })

}
}
