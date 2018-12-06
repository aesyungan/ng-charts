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
 

  dataCharts: DataCharts;
  ngOnInit() {
    this.dataCharts = new DataCharts(["hombre", "mujer", "otro"], [new DataSetData("2018", [4, 7, 5]), new DataSetData("2018", [0, 3, 6])]);
  }
  
}

