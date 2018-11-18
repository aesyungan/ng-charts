import { DataSetData } from "./dataSet.data";
import { ColorAdminClass } from "../colors-charts/colorsAdmmin.class";

export class DataCharts {

    public labels: Array<String> = [];
    public dataSet: Array<DataSetData> = [];
    constructor(labels: Array<String>, dataSet: Array<DataSetData>) {
        this.labels = labels;
        this.dataSet = dataSet;
    }
    public getData(type: String): any {
        ColorAdminClass.indexCreator = 0;//index generate
        let setLst: Array<any> = [];
        this.dataSet.forEach(x => {
            x.type = type;
            if (x.type == "line" || x.type == "radar") {
                x.colors = ColorAdminClass.creatorColors(x.data.length, true);
            } else {
                x.colors = ColorAdminClass.creatorColors(x.data.length, false);
            }
            if (x.type == "bar" && this.dataSet.length > 1) {
                x.colors = [];
                let col = ColorAdminClass.creatorColors(1, true);
                x.data.forEach(d => {
                    x.colors.push(col[0]);
                });
                //x.colors = ColorAdminClass.creatorColors(1, false);
            }
            setLst.push(x.get())
        });

        return {
            labels: this.labels,
            datasets: setLst
        }
    }
    private createColors() {

    }
}