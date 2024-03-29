import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {SharedDataService} from "../../services/shared-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recent_decks: any[] = [];
  last_played: any = null;
  user_dist: any = {W: 0, U: 0, B: 0, R: 0, G: 0}
  all_dist: any = {W: 0, U: 0, B: 0, R: 0, G: 0}

  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  mtgColorBackground = {white: '#eeeeeebb', blue: '#64b5f6bb', black: '#9e9e9ebb', red: '#e57373bb', green: '#81c784bb'}
  mtgColorBorder = {white: '#e0e0e0bb', blue: '#42a5f5bb', black: '#757575bb', red: '#ef5350bb', green: '#66bb6abb'}

  themeTextColor = 'rgba(255, 255, 255, 0.8)'

  public colorDistChartOptions: any;
  public winLossChartOptions: any;

  constructor(private data: SharedDataService, private route: ActivatedRoute, private router: Router) {
    this.colorDistChartOptions = {
      series: [
        {
          name: "Sigiltenebrae",
          data: [5, 5, 5, 5, 5]
        },
        {
          name: "All Players",
          data: [5, 5, 5, 5, 5]
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
              series[0].data[0] = Math.round(this.last_played.ratio * 100) / 100;
              this.data.cd_api.getWinLossUser(this.data.user.id).then((user_ratio_data: any) => {
                if (user_ratio_data.error) {
                  console.error(user_ratio_data.error);
                }
                else {
                  series[0].data[1] = Math.round(user_ratio_data.ratio * 100) / 100;
                  this.data.cd_api.getAverageWinLoss().then((avg_ratio_data: any) => {
                    if (avg_ratio_data.error) {
                      console.error(avg_ratio_data.error);
                    }
                    else {
                      series[0].data[2] = Math.round(avg_ratio_data.ratio * 100) / 100;
                      window.ApexCharts.exec("winLoss" , "updateOptions", {
                        series: series
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
    this.data.cd_api.getDecks().then((decks_data: any) => {
      if (decks_data.error) {
        console.error(decks_data.error);
      }
      else {
        if (decks_data.decks && decks_data.decks.length > 0) {
          for (let deck of decks_data.decks) {
            for (let color of deck.colors) {
              this.all_dist[color] ++;
            }
            if (deck.owner == this.data.user.id) {
              for (let color of deck.colors) {
                this.user_dist[color] ++;
              }
            }
          }
          for (let color of ["W", "U", "B", "R", "G"]) {
            this.user_dist[color] *= this.data.getUsers().length;
          }
          let series = this.colorDistChartOptions.series;
          series[0].data[0] = this.user_dist.W; series[0].data[1] = this.user_dist.U; series[0].data[2] = this.user_dist.B; series[0].data[3] = this.user_dist.R; series[0].data[4] = this.user_dist.G;
          series[1].data[0] = this.all_dist.W; series[1].data[1] = this.all_dist.U; series[1].data[2] = this.all_dist.B; series[1].data[3] = this.all_dist.R; series[1].data[4] = this.all_dist.G;
          window.ApexCharts.exec("colorDist" , "updateOptions", {
            series: series
          });
        }
      }
    });
  }

  public getUserFromId(id: number) {
    return this.data.getUserFromId(id);
  }

  public navigate(location: string) {
    this.router.navigate([location]);
  }
}
