import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'app-phone-number',
	templateUrl: './phone-number.component.html',
	styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit {

	validator: any = /^\d{10}$/;
	phoneNumber: any;
	invalidPhoneNumber: boolean;

	constructor(private data: DataService) { }

	ngOnInit() {
	}
	phoneValidation() {
		if (this.phoneNumber != "") {
			console.log("phoneValidation() called");
			if (this.phoneNumber.match(this.validator)) {
				this.invalidPhoneNumber = false;
			} else {
				this.invalidPhoneNumber = true;
			}
		}
	}
}
