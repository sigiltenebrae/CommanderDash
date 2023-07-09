import { Component } from '@angular/core';
import {ApiServiceService} from "../../services/api-service.service";
import {SharedDataService} from "../../services/shared-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private data: SharedDataService) {}

  getLocation() {
    return this.data.location;
  }

}
