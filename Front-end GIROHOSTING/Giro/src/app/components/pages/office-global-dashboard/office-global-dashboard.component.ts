import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as $ from "jquery";

import * as CanvasJS from "../../../../assets/canvasjs.stock.min";
import { UserdetailsService } from "../../../services/userdetails.service";

@Component({
  selector: 'app-office-global-dashboard',
  templateUrl: './office-global-dashboard.component.html',
  styleUrls: ['./office-global-dashboard.component.scss']
})
export class OfficeGlobalDashboardComponent implements OnInit {
  flag = true;
  userid: any;
  chartDownload: any;
  chartTotalAmount: any;
  downloadRateBudget = []
  downloadRateContract = [];
  downloadRateInvoice = [];
  totalBudgetAmount = [];
  totalInvoiceAmount = [];

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

  ngOnInit(): void {
    this.userdetails.activeOfficerLink = 'Estadísticas Globales'      
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
    this.downloadRateBudget = [];
    this.downloadRateContract = [];
    this.downloadRateInvoice = [];
    this.totalBudgetAmount = [];
    this.totalInvoiceAmount = [];

    this.chartDownload = new CanvasJS.StockChart("chartGlobalDownloadRateContainer", {
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
          dataPoints: this.downloadRateBudget
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
          prefix: "€"
        },
        data: [{
          type: "spline",
          name: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.CONTRACT'),
          yValueFormatString: "#",
          dataPoints: this.downloadRateContract
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
          prefix: "€"
        },
        data: [{
          type: "spline",
          name: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.INVOICE'),
          yValueFormatString: "#",
          dataPoints: this.downloadRateInvoice
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date(2020, 12, 22),
          maximum: new Date(2100, 9, 1)
        }
      }
    });

    this.chartTotalAmount = new CanvasJS.StockChart("chartGlobalTotalAmountContainer", {
      theme: "light3",
      title: {
        text: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.TOTAL_AMOUNT')
      },
      exportEnabled: true,

      exportFileName: this.translate.instant('ADMIN_FIELD.GRAPH_TITLE.TOTAL_AMOUNT'),

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
          yValueFormatString: "€#,###.##",
          dataPoints: this.totalBudgetAmount,
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
          yValueFormatString: "€#,###.##",
          dataPoints: this.totalInvoiceAmount
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date(2020, 12, 22),
          maximum: new Date(2100, 9, 1)
        }
      }
    });

    this.userdetails.getofficerglobaldashboard(this.userid).subscribe(
      res => {
        const data:any = res;

        data['downloadRate'].forEach((val, idx) => {
          this.downloadRateBudget.push({
            x: new Date(val.date),
            y: Number(val.budget_cnt)
          });

          this.downloadRateContract.push({
            x: new Date(val.date),
            y: Number(val.contract_cnt)
          });

          this.downloadRateInvoice.push({
            x: new Date(val.date),
            y: Number(val.invoice_cnt)
          });
        });

        data['totalBudgetAmount'].forEach(val => {
          this.totalBudgetAmount.push({
            x: new Date(val.date),
            y: Number(val.total)
          });
        });

        data['totalInvoiceAmount'].forEach(val => {
          this.totalInvoiceAmount.push({
            x: new Date(val.date),
            y: Number(val.total)
          });
        });
        
        this.chartDownload.render();
        this.chartTotalAmount.render();
      }
    )
  }

}
