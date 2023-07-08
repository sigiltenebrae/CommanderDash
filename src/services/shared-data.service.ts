import { Injectable } from '@angular/core';
import {ApiServiceService} from "./api-service.service";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(public cd_api: ApiServiceService) { }
}
