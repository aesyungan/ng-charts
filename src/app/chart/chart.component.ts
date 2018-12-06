import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DataCharts } from '../data-charts/dataCharts';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart: any;
  tipo: string = "polarArea";
  potentaje: boolean = false;
  @Input() dataCharts: DataCharts;
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log('cambios on change->' + JSON.stringify(changes));
    if (changes['dataCharts']) {
      this.dataCharts = changes['dataCharts'].currentValue;
      this.dibujar();
    }
  }
  cambiar(tipo: string) {
    console.log("cambio de tipo->" + this.tipo);
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }
  dibujar() {
    this.registrarPlugin();
    //let ctx = document.getElementById('myChart').getContext('2d');
    let data: any = this.dataCharts.getData(this.tipo);
    console.log(data);
    this.chart = new Chart('canvas', {
      type: this.tipo,
      data: data,
      options: {
        tooltips: {
          mode: 'nearest'
        },
        legend: {
          display: this.dataCharts.dataSet.length == 1 && this.tipo == 'bar' ? false : true,

        },
        hover: {
          animationDuration: 100
        },
      }
    });
  };

  registrarPlugin() {
    Chart.plugins.register({
      afterDatasetsDraw: (chartInstance, easing) => {
        // To only draw at the end of animation, check for easing === 1
        let ctx = chartInstance.chart.ctx;
        chartInstance.data.datasets.forEach((dataset, i) => {
          let meta = chartInstance.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach((element, index) => {
              // Draw the text in black, with the specified font
              ctx.fillStyle = this.tipo == 'pie' || this.tipo == 'doughnut' || this.tipo == 'polarArea' ? 'white' : '#9E9E9E';
              let fontSize = 16;
              let fontStyle = 'normal';
              let fontFamily = 'Helvetica Neue';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
              // Just naively convert to string for now
              let dataString = dataset.data[index].toString();
              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              let padding = 5;
              let position = element.tooltipPosition();
              let value: string = dataString;
              dataString += this.potentaje ? '%' : '';
              ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
              // ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
            });
          }
        });
      }
    });
  }
}
