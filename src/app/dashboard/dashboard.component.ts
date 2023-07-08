import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recent_decks: any[] = [];
  last_played: any = null;

  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  mtgColorBackground = {white: '#eeeeeebb', blue: '#64b5f6bb', black: '#9e9e9ebb', red: '#e57373bb', green: '#81c784bb'}
  mtgColorBorder = {white: '#e0e0e0bb', blue: '#42a5f5bb', black: '#757575bb', red: '#ef5350bb', green: '#66bb6abb'}

  themeTextColor = 'rgba(255, 255, 255, 0.8)'

  @ViewChild("colorDistChart") colorDistChart: ChartComponent;
  @ViewChild("winLossChart") winLossChart: ChartComponent;
  public colorDistChartOptions: any;
  public winLossChartOptions: any;

  constructor(private data: SharedDataService) {
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
        id: "colorDist",
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
          data: [0.0, 0.0, 0.0]
        }
      ],
      chart: {
        id: "winLoss",
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

  ngOnInit(): void {
    this.data.cd_api.getDecks({sort: 'created', order: 'DESC', limit: 4}).then((decks_data: any) => {
      if(decks_data.error) {
        console.error(decks_data.error);
      }
      else {
        if (decks_data.decks && decks_data.decks.length > 0) {
          this.recent_decks = decks_data.decks;
        }
      }
    });
    this.data.cd_api.getLastPlayedDeck(this.data.getUser().id).then((last_played_data: any) => {
      if (last_played_data.error) {
        console.error(last_played_data.error);
      }
      else {
        if (last_played_data.deck) {
          this.last_played = last_played_data.deck;
          this.data.cd_api.getCommanderForDeck(this.last_played.id).then((commander_data: any) => {
            if (commander_data.error) {
              console.error(commander_data.error);
            }
            else {
              this.last_played.commanders = commander_data.commanders;
            }
          });
          this.data.cd_api.getWinLossDeck(this.last_played.id).then((ratio_data: any) => {
            if (ratio_data.error) {
              console.error(ratio_data.error);
            }
            else {
              this.last_played.ratio = ratio_data.ratio;
              let series = this.winLossChartOptions.series;
              series[0].data[0] = this.last_played.ratio;
              window.ApexCharts.exec("winLoss" , "updateOptions", {
                series: series
              })
            }
          });
        }
      }
    });
  }

  public getUserFromId(id: number) {
    return this.data.getUserFromId(id);
  }
}
