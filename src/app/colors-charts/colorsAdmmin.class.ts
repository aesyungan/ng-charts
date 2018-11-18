import { ColorClass } from "./color.class";
import { colors } from "./colors.config";

export class ColorAdminClass {
    public static indexCreator = 1;
    public static creatorColors(tam: number, generate: boolean): Array<String> {
        let lst: Array<ColorClass> = [];
        let auxTam = 0;
        let indexInit = this.indexCreator;
        if (this.indexCreator >= 150) {//cunado ya se utilizo todos vuelve a ceso y empieza de nuevo
            this.indexCreator = 0;
        }
        if (generate == false) {
            // this.indexCreator = 0;
            indexInit = 0;
        }
        do {
            for (let index = indexInit; index < colors.length; index++) {

                if (auxTam < tam) {
                    lst.push(colors[index]);
                }
                auxTam++;
            }
            indexInit = 0;

        } while (auxTam <= tam);
        //retornar los colores
        let colorsString: Array<String> = [];
        lst.forEach(x => colorsString.push(x.valor));
        this.indexCreator++;
        return colorsString;
    }


}