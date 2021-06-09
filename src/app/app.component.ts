//app.component.ts- TypeScript file which facilitates authorization and provides logout and search functionality to e learning client application ///

//including required services and modules
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "./data.service";
import * as Parallax from "parallax-js";
import { RestApiService } from "./rest-api.service";

declare var Parallax: any;

//Component specific details
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

//exporting the AppComponnet for reuse
export class AppComponent {
  searchTerm = "";
  isCollapsed = true;
  categories: any
 
  constructor(private router: Router, public data: DataService,  private rest: RestApiService) {
    this.data.cartItems = this.data.getCart().length;
    this.data.getProfile(); 
    this.getCategories()
  }


  get token() {
    return localStorage.getItem("token");
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.data.user = {};
    this.data.cartItems = 0;
    localStorage.clear();
    this.router.navigate([""]);
  }

  search() {
    if (this.searchTerm) {
      this.collapse();
      this.router.navigate(["search", { query: this.searchTerm }]);
    }
  }

  async getCategories(){
    try {
			const data = await this.rest.get(`${this.data.serverURL}api/categories`);
			console.log("categoies data", data);

			data["success"]
				? (this.categories = data["categories"])
				: this.data.error(data["message"]);
		} catch (error) {
			this.data.error(error["message"]);
		}

  }

  ngAfterContentInit(): void {}
}
