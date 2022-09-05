import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { address as env } from "../../environments/environment";

const baseUrl = "https://facturazen-backend-9tcee.ondigitalocean.app/api/users";
// const baseUrl = "http://localhost:8080/api/users",;

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  changeUserPassword(data: any): Observable<any> {
    console.log(data);
    return this.http.patch(`${baseUrl}/`, data);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  findUserByName(name: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?name=${name}`);
  }
  findUserByEmail(email: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?email=${email}`);
  }
}
