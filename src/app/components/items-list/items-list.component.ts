import { Component, OnInit, ViewChild } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { Item } from "../../models/item.model";
import { ItemService } from "../../services/item.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: "app-items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.css"],
  providers: [ItemService],
})
export class ItemsListComponent implements OnInit {
  @ViewChild("dt") dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  itemDialog: boolean = false;

  items: Item[] = [];

  item: Item | any;

  ids: string[] = [];

  selectedItems: Item[] = [];

  submitted: boolean = false;
  showSpinner: boolean = true;
  isEmpty: boolean = false;

  constructor(
    private itemService: ItemService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
      this.isEmpty = this.items.length < 1 ? true : false;
    });
    this.showSpinner = false;
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.itemDialog = true;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: "¿Está seguro de que quiere borrar los ítems seleccionados?",
      header: "Confirme",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const itemsToDelete = this.items.filter((val) =>
          this.selectedItems.includes(val)
        );
        itemsToDelete.forEach((theItem) => {
          let id = theItem.id;
          this.ids.push(id!);
        });
        this.itemService.deleteItem(this.ids).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Operación exitosa",
              detail: "Item borrado",
              life: 3000,
            });
          },
          error: (e) => {
            this.messageService.add({
              severity: "error",
              summary: "Error en la operación",
              detail: "El ítem no ha podido ser borrado",
              life: 5000,
            });
          },
        });
        this.items = this.items.filter(
          (val) => !this.selectedItems.includes(val)
        );
        this.selectedItems = [];
        this.ids = [];
      },
    });
  }
  editItem(item: Item) {
    this.item = { ...item };
    this.itemDialog = true;
  }

  eraseItem(item: Item | any) {
    this.confirmationService.confirm({
      message: "¿Está seguro de que quiere borrar " + item.name + "?",
      header: "Por favor, confirmar...",
      acceptLabel: "Sí",
      rejectLabel: "No",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.itemService.deleteItem(item.id).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({
              severity: "success",
              summary: "Operación exitosa",
              detail: "Item borrado",
              life: 3000,
            });
            this.items = this.items.filter((val) => val.id !== item.id);
          },
          error: (e) =>
            this.messageService.add({
              severity: "error",
              summary: "Error en la operación",
              detail: "El ítem no ha podido ser borrado",
              life: 5000,
            }),
        });
        this.item = {};
      },
    });
  }

  hideDialog() {
    this.itemDialog = false;
    this.submitted = false;
  }

  saveItem() {
    this.submitted = true;
    if (this.item.name.trim()) {
      if (this.item.id) {
        this.items[this.findIndexById(this.item.id)] = this.item;
        this.itemService.updateItem(this.item.id, this.item).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Exitoso",
              detail: "Item actualizado",
              life: 3000,
            });
          },
          error: (e) =>
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: e,
              life: 5000,
            }),
        });
      } else {
        this.itemService.createItem(this.item).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Exitoso",
              detail: "Item creado",
              life: 3000,
            });
            this.items.push(this.item);
          },
          error: (e) =>
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: e,
              life: 5000,
            }),
        });
      }
      this.items = [...this.items];
      this.itemDialog = false;
      this.item = {};
    }
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
