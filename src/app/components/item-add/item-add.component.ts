import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  itemForm = new FormGroup({
    id: new FormControl(""),
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    description: new FormControl(""),
    cost: new FormControl("", [Validators.required]),
    tax1: new FormControl("", [Validators.required]),
    tax2: new FormControl("", [Validators.required]),
  });

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {}

  addItem(): void {
    const data = this.itemForm.value;
    this.itemService.createItem(data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.theItem.emit(res);
      },
      error: (e) => console.error(e),
    });
  }

  toItemList(): void {
    this.router.navigate(["items"]);
  }
  parentModal(value: boolean) {
    this.displayItemModal.emit(value);
  }
}
