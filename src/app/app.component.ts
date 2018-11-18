import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ColorAdminClass } from './colors-charts/colorsAdmmin.class';
import { DataSetData } from './data-charts/dataSet.data';
import { DataCharts } from './data-charts/dataCharts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chats-app';
  chart: any;
  tipo: string = "polarArea";

  dataCharts: DataCharts;
  ngOnInit() {
    //this.tipo = "line";
    // this.tipo = "radar";
    //this.tipo = "polarArea";
    //this.tipo = "bar";

    //console.log(new ColorAdminClass(500).getColors());
    this.dataCharts = new DataCharts(["hombre", "mujer", "otro"], [new DataSetData("2018", [4, 7, 5]),new DataSetData("2018", [0, 3, 6])]);
    this.dibujar();
  }
  cambiar(tipo: string) {
    console.log("cambio de tipo->" + this.tipo);
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }
  dibujar() {
    //var ctx = document.getElementById('myChart').getContext('2d');
    let data: any = this.dataCharts.getData(this.tipo);
    console.log(data);
    this.chart = new Chart('canvas', {
      type: this.tipo,

      // The data for our dataset
      // data: {
      //   labels: ["January", "February", "March", "April", "May", "June", "July"],
      //   datasets: [{
      //     label: 'Bar Dataset',
      //     borderColor: this.getColor(0),
      //     data: [0, 10, 5, 2, 20, 30, 45],
      //     fill: false,
      //     backgroundColor: this.getColors(),
      //   },
      //   {
      //     label: 'Bar Dataset',
      //     borderColor: this.getColor(1),
      //     data: [10, 12, 15, 12, 120, 0, 5],
      //     fill: false,
      //     backgroundColor: this.getColors(),
      //   }
      //   ]
      // },
      // Configuration options go here
      data: data,
      options: {
        tooltips: {
          mode: 'nearest'
        },
        legend: {
          display: this.dataCharts.dataSet.length == 1 && this.tipo == 'bar' ? false : true,

        },
        // scales: {
        //   xAxes: [{
        //     display: true
        //   }],
        //   yAxes: [{
        //     stacked: true
        //   }],
        // }
      }
    });
  };

}

