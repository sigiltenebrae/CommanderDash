import { Component } from '@angular/core';
import {ApiServiceService} from "../../services/api-service.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public cd_api: ApiServiceService) {

  }


}
