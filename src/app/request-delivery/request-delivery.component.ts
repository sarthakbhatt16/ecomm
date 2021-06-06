import { Component, ComponentRef ,OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { IModalDialog, IModalDialogOptions,IModalDialogButton } from 'ngx-modal-dialog';


@Component({
  selector: 'app-request-delivery',
  templateUrl: './request-delivery.component.html',
  styleUrls: ['./request-delivery.component.scss']
})
export class RequestDeliveryComponent implements IModalDialog {
  // modalActionButtons : IModalDialogButton[]
  // modalOption : IModalDialogOptions<Data>
  test : any;
  displayArray : any = []
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>)  {
    this.test = options.data.text
    this.displayArray = options.data.list
    console.log("display array on template", this.displayArray);
    
   
    
   };

  constructor() { 
      // this.modalActionButtons = [
      //   { text: 'Close' }, // no special processing here
      //   { text: 'I will always close', onAction: () => true },
      //   { text: 'I never close', onAction: () => false }
      // ];
      // console.log("modal data", this.modalOption.data.text);
      
  }

  ngOnInit() {
    
  }

}
