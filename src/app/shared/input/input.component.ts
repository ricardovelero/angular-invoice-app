import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = "";
  @Input() formId: string = "";
  @Input() theType: string = "";
  @Input() styleClass: string = "";
  @Input() items: [] | any;
  @Input() rows: number = 1;
  @Input() cols: number = 1;
  @Input() initialValue: string = "";
  @Input() autoFocus: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showErrors() {
    const { invalid, dirty, touched } = this.control;
    return invalid && (dirty || touched);
  }
  isDisabled() {
    return this.control.disabled;
  }
  changeItem(e: any) {
    console.log(e.target.value);
    this.control.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
