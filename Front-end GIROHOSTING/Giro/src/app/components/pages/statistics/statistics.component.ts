import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import * as CanvasJS from "../../../../assets/canvasjs.stock.min";
import { UserdetailsService } from "../../../services/userdetails.service";


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  flag = true;
  userid: any;
  chart: any;
  dataPointsBudget = []
  dataPointsContract = [];
  dataPointsInvoice = [];

  constructor(
    private userdetails: UserdetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    route.paramMap.subscribe({
      next: param => {
        this.userid = param.get('id');
      }
    });
  }

  ngOnInit() {
    this.userdetails.activeSuperadminLink = 'ADMIN_FIELD.NAVBAR.DASHBOARD'        
    
    if(this.flag == true) {
      this.render_chart();
    }
    
		this.translate.onLangChange.subscribe(
      () => {
        if(this.flag == false) {
          this.render_chart();
        }
      }
    );
  }

  render_chart() {
    this.flag = false;

    this.dataPointsBudget = []
    this.dataPointsContract = [];
    this.dataPointsInvoice = [];

    this.chart = new CanvasJS.StockChart("chartContainer", {
      theme: "light3",
      title: {
        text: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.DOWNLOAD_RATE')
      },
      exportEnabled: true,

      exportFileName: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.DOWNLOAD_RATE'),

      charts: [{
        toolTip: {
          shared: true
        },
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            }
          },
        },
        axisY: {
          title: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.BUDGET'),
          prefix: ""
        },
        data: [{
          type: "spline",
          name: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.BUDGET'),
          yValueFormatString: "#",
          dataPoints: this.dataPointsBudget
        }]
      }, {
        toolTip: {
          shared: true
        },
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            }
          },
        },
        axisY: {
          title: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.CONTRACT'),
          prefix: ""
        },
        data: [{
          type: "spline",
          name: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.CONTRACT'),
          yValueFormatString: "#",
          dataPoints: this.dataPointsContract
        }]
      }, {
        toolTip: {
          shared: true
        },
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            }
          },
        },
        axisY: {
          title: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.INVOICE'),
          prefix: ""
        },
        data: [{
          type: "spline",
          name: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.INVOICE'),
          yValueFormatString: "#",
          dataPoints: this.dataPointsInvoice
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date(2020, 12, 22),
          maximum: new Date(2100, 9, 1)
        }
      }
    });

    this.userdetails.getdashboard(this.userid).subscribe(
      res => {
        const data:any = res;

        data.forEach((val, idx) => {
          this.dataPointsBudget.push({
            x: new Date(val.date),
            y: Number(val.budget_cnt)
          });

          this.dataPointsContract.push({
            x: new Date(val.date),
            y: Number(val.contract_cnt)
          });

          this.dataPointsInvoice.push({
            x: new Date(val.date),
            y: Number(val.invoice_cnt)
          });
        });
        
        this.chart.render();
      }
    )
  }
}
