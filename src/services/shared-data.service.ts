import { Injectable } from '@angular/core';
import {ApiServiceService} from "./api-service.service";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  location:string | undefined =  undefined;


  user: any = { id: 1 };

  users: any[] = [];

  constructor(public cd_api: ApiServiceService) {
    this.cd_api.getUsers().then((users_data) => {
      if (users_data.error) {
        console.error(users_data.error);
        this.users = [];
      }
      else {
        if (users_data.users) {
          this.users = users_data.users;
        }
      }
    })
  }

  public getUser() {
    return this.user;
  }

  public getUsers() {
    return this.users;
  }

  public getUserFromId(id: number) {
    return this.users.find(user => user.id == id);
  }
}
