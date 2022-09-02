import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { passwordStrength } from "check-password-strength";

export const passwordStrengthValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control?.value;

  let validationResult = passwordStrength(password);

  let sum =
    Number(validationResult.contains.includes("lowercase")) +
    Number(validationResult.contains.includes("uppercase")) +
    Number(validationResult.contains.includes("number")) +
    Number(validationResult.contains.includes("symbol"));

  return validationResult.id > 1 && sum > 2 ? null : { notgood: true };
};
