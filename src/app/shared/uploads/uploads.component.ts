import { Component, Input, OnInit } from "@angular/core";
import { FileUploadProgress } from "../../models/file-upload-progress";

@Component({
  selector: "app-uploads",
  templateUrl: "./uploads.component.html",
  styleUrls: ["./uploads.component.css"],
})
export class UploadsComponent implements OnInit {
  @Input() uploads?: FileUploadProgress[] | any;

  constructor() {}

  ngOnInit(): void {}
}
