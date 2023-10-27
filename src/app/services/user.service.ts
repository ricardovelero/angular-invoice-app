import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { User } from "../models/user.model"

const baseUrl = "http://localhost:8080/api/users"

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  signin(data: User): Observable<User> {
    return this.http.post("http://localhost:8080/api/auth/login", data)
  }

  getUser(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`)
  }
  updateUser(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/edit`, data)
  }
  changeUserPassword(data: any): Observable<any> {
    console.log(data)
    return this.http.patch(`${baseUrl}/`, data)
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }
  findUserByName(name: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?name=${name}`)
  }
  findUserByEmail(email: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/email/${email}`)
  }
}
