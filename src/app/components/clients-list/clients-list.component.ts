import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { Country } from "src/app/models/country.model";
import { CountryService } from "src/app/services/country.service";
import { Table } from "primeng/table";
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from "primeng/api";

@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.component.html",
  styleUrls: ["./clients-list.component.css"],
  providers: [ClientService],
})
export class ClientsListComponent implements OnInit {
  @ViewChild("dt") dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  @Input() viewMode = false;

  countries: Country[] | any;

  modalToggle: boolean = false;
  clients: Client[] = [];
  client: Client | any;
  currentClient: Client = {};
  currentIndex = -1;
  name: string = "";

  selectedClients: Client[] = [];

  showSpinner: boolean = true;
  isEmpty: boolean = false;
  isCard: boolean = false;

  submitted: boolean = false;
  clientDialog: boolean = false;
  clientEditDialog: boolean = false;

  isSubmitDissabled: boolean = true;

  loading: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.primengConfig.ripple = true;
    this.retrieveClients();
    this.countryService.getCountries().then((data) => {
      this.countries = data;
    });
    this.showSpinner = false;
  }
  retrieveClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.isEmpty = this.clients.length < 1 ? true : false;
        this.loading = false;
      },
      error: (e) => console.error(e),
    });
  }
  refreshList(): void {
    this.retrieveClients();
    this.currentClient = {};
    this.currentIndex = -1;
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  opencloseModal() {
    if (!this.modalToggle) {
      this.modalToggle = !this.modalToggle;
    } else {
      this.modalToggle = !this.modalToggle;
    }
    return this.modalToggle;
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
      },
      error: (e) => console.error(e),
    });
  }
  deleteSelectedClients() {}

  editClient(client: Client) {
    this.client = { ...client };
    this.clientEditDialog = true;
  }

  eraseClient(client: Client | any) {
    this.confirmationService.confirm({
      message: "¿Está seguro de que quiere borrar " + client.fullName + "?",
      header: "Por favor, confirmar...",
      acceptLabel: "Sí",
      rejectLabel: "No",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.clientService.deleteClient(client.id).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({
              severity: "success",
              summary: "Operación exitosa",
              detail: "Cliente borrado",
              life: 3000,
            });
            this.clients = this.clients.filter((val) => val.id !== client.id);
          },
          error: (e) =>
            this.messageService.add({
              severity: "error",
              summary: "Error en la operación",
              detail: "El ítem no ha podido ser borrado",
              life: 5000,
            }),
        });
        this.client = {};
      },
    });
  }
  saveClient() {
    this.submitted = true;
    if (this.client.fullName.trim()) {
      if (this.client.id) {
        this.clients[this.findIndexById(this.client.id)] = this.client;
        this.clientService.updateClient(this.client.id, this.client).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Exitoso",
              detail: "Item actualizado",
              life: 3000,
            });
          },
          error: (e) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: e.error.message,
              life: 5000,
            });
          },
        });
      } else {
        this.clientService.createClient(this.client).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Exitoso",
              detail: "Item creado",
              life: 3000,
            });
            res["Invoices"] = [];
            this.clients.push(res);
          },
          error: (e) =>
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: e.error.message,
              life: 5000,
            }),
        });
      }
      this.clients = [...this.clients];
      this.clientDialog = false;
      this.client = {};
    }
  }
  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  showModalDialog() {
    this.clientDialog = true;
  }
  clientFromChild(client: any) {
    client = { ...client, Invoices: [] };
    this.clients.push(client);
  }
  openNew() {
    this.client = {};
    this.submitted = false;
    this.clientDialog = true;
  }
  hideDialog() {
    this.clientEditDialog = false;
    this.submitted = false;
  }
}
