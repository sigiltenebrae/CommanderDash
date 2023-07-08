import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  decks = [
    {
      name: "With Friends Like These...",
      image: "https://drive.google.com/uc?export=view&id=16Hlu4NOaDM7LB293rZ_uG_i_HvNcAu4c"
    },
    {
      name: "Dinobots",
      image: "https://drive.google.com/uc?export=view&id=1L9orFFcv4AX5v9TUnQgGQS68KcqgtClC"
    },
    {
      name: "Mandatory Fun",
      image: "https://cards.scryfall.io/png/front/9/1/91c54ac0-0edc-406f-8a22-f2996f604f36.png?1592710296"
    },
    {
      name: "Claim Your Prize",
      image: "https://cards.scryfall.io/png/front/4/7/4707be12-b255-47ea-a938-f4b03a1e9247.png?1673918317"
    },
    {
      name: "Temptations",
      image: "https://cards.scryfall.io/png/front/1/3/13253f8d-1897-41e8-a904-9e57ac7eff0a.png?1686970071"
    },
    {
      name: "X's and Oh No's",
      image: "https://drive.google.com/uc?export=view&id=1-e6zCVrTMNmlz3jHhVCXbrh72-pEBUhc"
    },
    {
      name: "Victorious In Warriors",
      image: "https://cards.scryfall.io/png/front/2/c/2cb1d1da-6077-46b5-8c63-39882b8016f2.png?1567181270"
    },
  ]

  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  mtgColorBackground = {white: '#eeeeeebb', blue: '#64b5f6bb', black: '#9e9e9ebb', red: '#e57373bb', green: '#81c784bb'}
  mtgColorBorder = {white: '#e0e0e0bb', blue: '#42a5f5bb', black: '#757575bb', red: '#ef5350bb', green: '#66bb6abb'}

  ngOnInit(): void {
  }

}
