//DataService.ts - Type Script file to facilitate DataService to know type of message,handle cart functionality

//including required modules and services
import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { RestApiService } from "./rest-api.service";

//Exporting the DataService
@Injectable()
export class DataService {
	message = "";
	messageType = "danger";
	// serverURL = "https://icecreammandc.herokuapp.com/";
	// clientURL = "https://icmdcfe.herokuapp.com/";
	serverURL = "http://localhost:3030/";
	clientURL = "http://localhost:4200/";
	user: any;
	cartItems = 0;
	public invalidNumber : boolean = false

	constructor(private router: Router, private rest: RestApiService) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.message = "";
			}
		});
	}

	error(message) {
		this.messageType = "danger";
		this.message = message;
	}

	success(message) {
		this.messageType = "success";
		this.message = message;
	}

	warning(message) {
		this.messageType = "warning";
		this.message = message;
	}

	async getProfile() {
		try {
			if (localStorage.getItem("token")) {
				const data = await this.rest.get(
					`${this.serverURL}api/accounts/profile`
				);
				this.user = data["user"];
				console.log("get user called", this.user);
			}
		} catch (e) {
			this.error(e);
		}
	}




	getCart() {
		const cart = localStorage.getItem("cart");
		return cart ? JSON.parse(cart) : [];
	}

	addToCart(item: string) {
		const cart: any = this.getCart();
		if (cart.find((data) => JSON.stringify(data) === JSON.stringify(item))) {
			return false;
		} else {
			cart.push(item);
			this.cartItems++;
			localStorage.setItem("cart", JSON.stringify(cart));
			return true;
		}
	}

	removeFromCart(item: string) {
		let cart: any = this.getCart();
		if (cart.find((data) => JSON.stringify(data) === JSON.stringify(item))) {
			cart = cart.filter(
				(data) => JSON.stringify(data) !== JSON.stringify(item)
			);
			this.cartItems--;
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}

	clearCart() {
		this.cartItems = 0;
		localStorage.setItem("cart", "[]");
	}
}
