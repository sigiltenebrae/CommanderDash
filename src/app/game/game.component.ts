import { Component } from '@angular/core';
import {SharedDataService} from "../../services/shared-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  hand_visible = false;

  constructor(private data: SharedDataService, private route: ActivatedRoute, private router: Router) {
    data.location = 'games';
  }

  getWindow() {
    return {width: window.innerWidth, height: window.innerHeight}
  }
}
