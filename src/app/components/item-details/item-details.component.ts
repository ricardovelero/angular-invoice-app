import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Item } from "src/app/models/item.model";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.css"],
})
export class ItemDetailsComponent implements OnInit {
  @Input() inItem: Item = {};
  @Output() displayModal = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
