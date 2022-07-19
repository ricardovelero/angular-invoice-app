import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.component.html",
  styleUrls: ["./clients-list.component.css"],
})
export class ClientsListComponent implements OnInit {
  clients?: Client[];
  currentClient: Client = {};
  currentIndex = -1;
  name: string = "";

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.retrieveClients();
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
  refreshList(): void {
    this.retrieveClients();
    this.currentClient = {};
    this.currentIndex = -1;
  }
  setActiveClient(client: Client, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }
  setInactiveClient(client: Client, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }
  removeAllClients(): void {
    this.clientService.deleteAllClients().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }
  searchName(name: string): void {
    this.currentClient = {};
    this.currentIndex = -1;
    this.clientService.findClientByName(name).subscribe({
      next: (data) => {
        this.clients = data;
        console.log(data);
        console.log("searchName");
      },
      error: (e) => console.error(e),
    });
  }
}
