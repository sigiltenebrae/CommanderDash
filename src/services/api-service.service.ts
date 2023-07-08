import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  default_options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) { }

  public getDecks(options?: any): Promise<any> {
    options = options != null? options: {};
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/decks', JSON.stringify({sort: options.sort, order: options.order, limit: options.limit}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.log(error); resolve(null); }
      });
    })
  }


  /**
   * Get the deck data object for the given id.
   * @param id
   */
  public getDeck(id: number): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/deck', JSON.stringify({id: id}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.log(error); resolve(null); }
      });
    })
  }
}
