import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-item-add",
  templateUrl: "./item-add.component.html",
  styleUrls: ["./item-add.component.css"],
})
export class ItemAddComponent implements OnInit {
  @Output() displayItemModal = new EventEmitter<boolean>();
  @Output() theItem = new EventEmitter<object>();

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
    const data = this.itemForm.value;
    this.itemService.createItem(data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.theItem.emit(res);
      },
      error: (e) => console.error(e),
    });
  }
  hideDialog(value: boolean) {
    this.displayItemModal.emit(value);
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
