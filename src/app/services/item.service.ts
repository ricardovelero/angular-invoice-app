import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item.model";

const baseUrl = "http://localhost:8080/api/items";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(baseUrl);
  }
  getItem(id: any): Observable<Item> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  createItem(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  updateItem(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteItem(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAllItems(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findItemByName(name: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${baseUrl}?name=${name}`);
  }
}
