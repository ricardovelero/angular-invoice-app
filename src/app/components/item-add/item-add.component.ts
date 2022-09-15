import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemService } from "src/app/services/item.service";
import { Item } from "../../models/item.model";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-item-add",
  templateUrl: "./item-add.component.html",
  styleUrls: ["./item-add.component.css"],
})
export class ItemAddComponent implements OnInit {
  @Output() displayItemModal = new EventEmitter<boolean>();
  @Output() theItem = new EventEmitter<object>();

  item: Item | any;

  submitted: boolean = false;
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
    private messageService: MessageService,
    private router: Router,
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

  ngOnInit(): void {}

  saveItem(): void {
    this.submitted = true;
    this.itemForm.disable;
    const { id, name, description, cost, tax1 } = this.itemForm.controls;
    this.item = {
      id: id.value,
      name: name.value,
      description: description.value,
      cost: cost.value,
      tax1: tax1.value,
      Invoices: [],
    };
    if (this.item.name.trim()) {
      if (this.item.id) {
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
              detail: "Ítem creado",
              life: 3000,
            });
            this.theItem.emit(res);
          },
          error: (e) => {
            console.log(e);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: e,
              life: 5000,
            });
          },
        });
      }
      this.displayItemModal.emit(false);
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
  hideDialog() {
    this.displayItemModal.emit(false);
    this.submitted = false;
    this.itemForm.reset();
    this.showOtherTax = false;
  }
  toItemList(): void {
    this.router.navigate(["items"]);
  }
  parentModal(value: boolean) {
    this.displayItemModal.emit(value);
  }
  processTaxOption() {
    this.showOtherTax = this.itemForm.controls.tax1.value == "1" ? true : false;
  }
}
