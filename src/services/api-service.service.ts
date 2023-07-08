import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  default_options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) { }

  public getUsers(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.get(environment.cd_api_url + '/users').subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }

  /**
   * Get the decks data object containing all decks.
   * @param options {sort, order, limit}
   */
  public getDecks(options?: any): Promise<any> {
    options = options != null? options: {};
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/decks', JSON.stringify({sort: options.sort, order: options.order, limit: options.limit}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }


  /**
   * Get the deck data object for the given id.
   * @param id ID of the deck to search
   */
  public getDeck(id: number): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/deck', JSON.stringify({id: id}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }

  /**
   * Get the commanders for the given deck.
   * @param id ID of the deck to search
   */
  public getCommanderForDeck(id: number): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/deck/commander', JSON.stringify({id: id}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }

  /**
   * Get the last played deck for the given user.
   * @param id ID of the user to search
   */
  public getLastPlayedDeck(id: number): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/deck/last_played', JSON.stringify({id: id}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }

  /**
   * Get the average win/loss ratio for all users
   */
  public getAverageWinLoss(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/users/win_loss', JSON.stringify({}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }

  /**
   * Get the win/loss ratio for the given deck
   * @param id ID of the deck to search
   */
  public getWinLossDeck(id: number): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/deck/win_loss', JSON.stringify({id: id}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }

  /**
   * Get the win/loss ratio for the given user
   * @param id ID of the user to search
   */
  public getWinLossUser(id: number): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.post(environment.cd_api_url + '/user/win_loss', JSON.stringify({id: id}), this.default_options).subscribe({
        next: (data: any) => { resolve(data); },
        error: (error) => { console.error(error); resolve(null); }
      });
    });
  }
}
