import { Injectable } from "@angular/core";
import { Item, buscaObjeto, filtrarMultiplasColunasTabela, incluirKeyAt, incluirKeyAtArray, setParameterObjKey, sortByParameter } from "./tableFunctions";

@Injectable({
    providedIn:'root'
})
export class TableThins{

    isObject(value: any): boolean {
        return value && typeof value === 'object' && !Array.isArray(value);
      }
    
    getKeys(obj: any): string[] {
        return Object.keys(obj);
    }

    getNumCol(obj:any):string{
        return 'repeat('+this.getKeys(obj).length+', 1fr)'
    }

    incluirKeyAtArray = incluirKeyAtArray
    

    ordenarAD = sortByParameter 

    buscarItem = buscaObjeto

    filtrarMultiplasColunasTabela = filtrarMultiplasColunasTabela

    setParameterObjKey = setParameterObjKey

    normalizeString(str:any) {
        let straux:string
        if(typeof(str)!=='string'){
            straux = str.toString()
        }
        else{
            straux = str
        }
        return straux.replace(/\s+/g, ' ').trim();
      }
}