import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Country } from "../models/country.model";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  result: Country[] | any;

  constructor(private http: HttpClient) {}

  async getCountries() {
    const res = await this.http.get<any>("assets/countries.json").toPromise();
    const data = <Country[]>res;
    return data;
  }
}
