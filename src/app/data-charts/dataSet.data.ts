import { ColorAdminClass } from "../colors-charts/colorsAdmmin.class";

export class DataSetData {
    public type: String;
    public label: String;
    public borderColor: String;
    public backgroundColor: Array<String> = [];
    public data: Array<number> = [];
    public colors: Array<String>;
    constructor(label: String, data: Array<number>) {
        //this.type = type;
        this.label = label;
        this.data = data;
        //this.colors = ColorAdminClass.creatorColors(data.length,false);
    }
    get(): any {
        return {
            label: this.label,
            borderColor: this.getColor(),
            data: this.data,
            fill: false,
            backgroundColor: this.colors,
        }
    }
    getColor(): String {
        let colo: String = "#ccc";
        if (this.colors.length > 0) {
            colo = this.colors[0];
        }
        return this.type == 'bar' || this.type == 'pie' || this.type == 'doughnut' ? 'white' : colo;
    }
}