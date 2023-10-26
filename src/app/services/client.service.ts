import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Client } from "../models/client.model"
import { address as env } from "../../environments/environment"

//const baseUrl =
//  "https://facturazen-backend-9tcee.ondigitalocean.app/api/clients"
const baseUrl = "http://localhost:8080/api/clients"

@Injectable({ providedIn: "root" })
export class ClientService {
  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(baseUrl)
  }
  getClient(id: any): Observable<Client> {
    return this.http.get(`${baseUrl}/${id}`)
  }
  createClient(data: any): Observable<any> {
    return this.http.post(baseUrl, data)
  }
  updateClient(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data)
  }
  deleteClient(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }
  deleteAllClients(): Observable<any> {
    return this.http.delete(baseUrl)
  }
  findClientByName(name: any): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl}?name=${name}`)
  }
}
