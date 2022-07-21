import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
})
export class InvoiceAddComponent implements OnInit {
  modalToggle: boolean = false;
  clients?: Client[];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.retrieveClients();
  }
  opencloseModal() {
    if (!this.modalToggle) {
      this.modalToggle = !this.modalToggle;
    } else {
      this.modalToggle = !this.modalToggle;
    }
    return this.modalToggle;
  }
  retrieveClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
