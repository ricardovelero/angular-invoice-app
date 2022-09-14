import { CdkStepper } from "@angular/cdk/stepper";
import { Component, Input } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.css"],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {
  @Input() control!: FormControl;
  @Input() validity: boolean = false;

  onClick(index: number): void {
    this.selectedIndex = index;
  }
}
