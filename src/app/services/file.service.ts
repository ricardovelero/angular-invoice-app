import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilesTableEntry } from "../models/files-table-entry";
import { address as env } from "../../environments/environment";

const baseUrl = "https://facturazen-backend-9tcee.ondigitalocean.app/api/files";
// const baseUrl = "http://localhost:8080/api/files";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private http: HttpClient) {}

  getAllFiles(): Observable<FilesTableEntry[]> {
    return this.http.get<FilesTableEntry[]>(baseUrl);
  }
}
