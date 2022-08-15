import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "../models/invoice.model";
//import { address as env } from "../../environments/environment";

//const baseUrl = `${env.remote}/api/invoices`;
// const baseUrl = `${env.local}/api/invoices`;
const baseUrl =
  "https://facturazen-backend-9tcee.ondigitalocean.app/api/invoices";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(baseUrl);
  }
  getLastInvoice(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${baseUrl}/last`);
  }
  getInvoice(id: any): Observable<Invoice> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  createInvoice(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  updateInvoice(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteInvoice(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAllInvoices(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findInvoiceByName(name: any): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${baseUrl}?name=${name}`);
  }
}
