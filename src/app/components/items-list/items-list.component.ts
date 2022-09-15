import { Component, OnInit, ViewChild } from "@angular/core";
import { Item } from "../../models/item.model";
import { ItemService } from "../../services/item.service";
import { Table } from "primeng/table";
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from "primeng/api";
import { FormBuilder, Validators } from "@angular/forms";

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
  loading: boolean = false;
  isEmpty: boolean = false;
  taxOptions: {} | any;

  showOtherTax: boolean = false;

  itemForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    description: [""],
    cost: [0, Validators.required],
    tax1: ["21", Validators.required],
  });

  constructor(
    private itemService: ItemService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.taxOptions = [
      { label: "21%", value: 21 },
      { label: "10%", value: 10 },
      { label: "4%", value: 4 },
      { label: "0%", value: 0 },
      { label: "Otro", value: 1 },
    ];
  }

  ngOnInit(): void {
    this.loading = true;
    this.primengConfig.ripple = true;
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
      this.isEmpty = this.items.length < 1 ? true : false;
      this.loading = false;
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
              detail: "Items borrados",
              life: 3000,
            });
          },
          error: (e) => {
            this.messageService.add({
              severity: "error",
              summary: "Error en la operación",
              detail: "Los ítems no han podido ser borrados",
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
    const { id, name, description, cost, tax1 } = this.itemForm.controls;
    id.setValue(item.id!);
    name.setValue(item.name!);
    description.setValue(item.description!);
    cost.setValue(item.cost!);
    tax1.setValue(item.tax1!);
    this.item = { ...item };
    this.itemDialog = true;
  }

  eraseItem(item: Item | any) {
    this.confirmationService.confirm({
      message: "¿Está seguro de que quiere borrar " + item.label + "?",
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
    this.itemForm.reset();
    this.showOtherTax = false;
  }

  saveItem() {
    this.submitted = true;
    this.itemForm.disable;
    const { id, name, description, cost, tax1 } = this.itemForm.controls;
    if (this.item.Invoices) {
      this.item = {
        id: id.value,
        name: name.value,
        description: description.value,
        cost: cost.value,
        tax1: tax1.value,
        Invoices: this.item.Invoices,
      };
    } else {
      this.item = {
        id: id.value,
        name: name.value,
        description: description.value,
        cost: cost.value,
        tax1: tax1.value,
        Invoices: [],
      };
    }
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
            res["Invoices"] = [];
            this.items.push(res);
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
      this.itemForm.reset();
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "El nombre del Item es requerido",
        life: 5000,
      });
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

  processTaxOption() {
    this.showOtherTax = this.itemForm.controls.tax1.value == "1" ? true : false;
  }
}
