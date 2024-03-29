import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgxFileDropEntry } from "@bugsplat/ngx-file-drop";

@Component({
  selector: "app-file-drop",
  templateUrl: "./file-drop.component.html",
  styleUrls: ["./file-drop.component.css"],
})
export class FileDropComponent implements OnInit {
  @Output() filesDropped = new EventEmitter<NgxFileDropEntry[]>();

  onFilesDropped(files: NgxFileDropEntry[]) {
    this.filesDropped.next(files);
  }

  constructor() {}

  ngOnInit(): void {}
}
