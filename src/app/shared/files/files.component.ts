import { Component, Input, OnInit } from "@angular/core";
import { FilesTableEntry } from "../../models/files-table-entry";

@Component({
  selector: "app-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.css"],
})
export class FilesComponent implements OnInit {
  @Input() files: FilesTableEntry[] | null = [
    {
      url: "#",
      name: "tiger.png",
      uploaded: new Date(),
      size: 123456789,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
