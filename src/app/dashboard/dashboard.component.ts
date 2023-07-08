import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartComponent } from "ng-apexcharts";

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

  themeTextColor = 'rgba(255, 255, 255, 0.8)'

  //@ViewChild("chart") colorDistChart: ChartComponent;
  public colorDistChartOptions: any;
  public winLossChartOptions: any;

  ngOnInit(): void {
  }

  constructor() {
    this.colorDistChartOptions = {
      series: [
        {
          name: "Sigiltenebrae",
          data: [80, 50, 30, 40, 100]
        },
        {
          name: "All Players",
          data: [20, 30, 40, 80, 20]
        },
      ],
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        foreColor: this.themeTextColor
      },
      title: {
        text: "Radar Chart - Multi Series",
      },
      stroke: {
        show: false,
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: ["White", "Blue", "Black", "Red", "Green"],
        labels: {
          style: {
            fontSize: 12,
            colors: [this.mtgColorBackground.white, this.mtgColorBackground.blue, this.mtgColorBackground.black, this.mtgColorBackground.red, this.mtgColorBackground.green]
          }
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        }
      },
    };
    this.winLossChartOptions = {
      series: [
        {
          name: "Inflation",
          data: [2.3, 0.6, 1.0]
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        height: 300,
        type: "bar",
        foreColor: this.themeTextColor
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
        }
      },

      xaxis: {
        categories: [
          "This Deck",
          "Sigiltenebrae",
          "Average",
        ],
        position: "bottom",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val: any) {
            return val + "%";
          }
        }
      },
      title: {
        show: true,
        text: "Win/Loss Ratio",
        floating: 0,
        align: "center",
      },
      tooltip: {
        enabled: false
      }
    };
  }
}
