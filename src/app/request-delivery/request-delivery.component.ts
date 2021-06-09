import { Component, ComponentRef ,OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from "../data.service";
import { IModalDialog, IModalDialogOptions,IModalDialogButton } from 'ngx-modal-dialog';


@Component({
  selector: 'app-request-delivery',
  templateUrl: './request-delivery.component.html',
  styleUrls: ['./request-delivery.component.scss']
})
export class RequestDeliveryComponent implements IModalDialog {
   modalActionButtons : IModalDialogButton[]
  // modalOption : IModalDialogOptions<Data>
  test : any;
  displayArray : any = []
  checkOutNumber : any 
  invalidNumber : boolean = false
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>)  {
    this.test = options.data.text
    this.displayArray = options.data.list
    this.checkOutNumber = options.data.text

    console.log("display array on template", this.displayArray, this.checkOutNumber);
    
   
    
   };

  constructor(	private data: DataService) { 
      // this.modalActionButtons = [
      //   { text: 'Close' }, // no special processing here
      //   { text: 'I will always close', onAction: () => true },
      //   { text: 'I never close', onAction: () => false }
      // ];
      // console.log("modal data", this.modalOption.data.text);
      
  }

  ngOnInit() {
    
  }

  

  checkForValidity(){
    console.log("hello func called");
    
   if(!this.checkOutNumber.match(/^\d{10}$/)){
     console.log("hello func if");
     
      this.data.invalidNumber = true
   }
   else{
     console.log("hello func else");
     
    this.data.invalidNumber = false
   }
    
  }

}
