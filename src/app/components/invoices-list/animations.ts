import {
  animate,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const DropDownAnimation = trigger("dropDownMenu", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    query(".cdkmenu-item", [
      style({ opacity: 0, transform: "translateY(-50px)" }),
    ]),
    sequence([
      animate("100ms", style({ height: "*" })),
      query(".cdkmenu-item", [
        stagger(-1, [
          animate("100ms ease", style({ opacity: 1, transform: "none" })),
        ]),
      ]),
    ]),
  ]),

  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    query(".cdkmenu-item", [style({ opacity: 1, transform: "none" })]),
    sequence([
      query(".cdkmenu-item", [
        stagger(1, [
          animate(
            "100ms ease",
            style({ opacity: 0, transform: "translateY(-50px)" })
          ),
        ]),
      ]),
      animate("100ms", style({ height: 0 })),
    ]),
  ]),
]);

export const CogRotation = trigger("cogRotation", [
  state("default", style({ transform: "rotate(0)" })),
  state("rotated", style({ transform: "rotate(-90deg)" })),
  transition("rotated => default", animate("150ms ease-out")),
  transition("default => rotated", animate("100ms ease-in")),
]);
