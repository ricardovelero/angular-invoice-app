import { Component, Inject, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  items?: MenuItem[] | any;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: "Nuestro Servicio",
      },
      {
        label: "Ventajas",
      },
      {
        label: "Empresa",
      },
    ];
  }
}
