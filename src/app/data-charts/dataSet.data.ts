export class DataSetData {
    public type: String;
    public label: String;
    public borderColor: String;
    public backgroundColor: Array<String> = [];
    public data: Array<number> = [];
    private dataPorcentaje: Array<number> = [];
    public colors: Array<String>;
    constructor(label: String, data: Array<number>) {
        //this.type = type;
        this.label = label;
        this.data = data;
        this.dataPorcentaje = this.calcularPorcentaje();
        //this.colors = ColorAdminClass.creatorColors(data.length,false);
        //calcular porcentaje

    }
    get(inPorcentaje: boolean = false): any {
        if (inPorcentaje) {
            return {
                label: this.label,
                borderColor: this.getColor(),
                data: this.dataPorcentaje,
                fill: false,
                backgroundColor: this.colors,
            }

        } else {


            return {
                label: this.label,
                borderColor: this.getColor(),
                data: this.data,
                fill: false,
                backgroundColor: this.colors,
            }
        }
    }
    getColor(): String {
        let colo: String = "#ccc";
        if (this.colors.length > 0) {
            colo = this.colors[0];
        }
        return this.type == 'bar' || this.type == 'pie' || this.type == 'doughnut' ? 'white' : colo;
    }

    private calcularPorcentaje(): Array<number> {
        let lstPorcentaje: Array<number> = [];
        let suma: number = 0;
        this.data.forEach(d => {
            suma += d;
        });
        this.data.forEach(d => {
            lstPorcentaje.push(Number(((d * 100) / suma).toFixed(2)));
        });
        return lstPorcentaje;
    }
}