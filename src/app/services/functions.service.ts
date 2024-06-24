import { Injectable } from "@angular/core";
import { Item, buscaObjeto, filtrarMultiplasColunasTabela, atribuiValoresNakey, incluirKeyAtArray, setParameterObjKey, sortByParameter } from "./tableFunctions";

@Injectable({
    providedIn:'root'
})
export class Utils{

    isObject(value: any): boolean {
        return value && typeof value === 'object' && !Array.isArray(value);
      }
    
    getKeys(obj: any): string[] {
        if(obj === undefined){
            return []
        }
        return Object.keys(obj);
    }

    getValusOfKey(listaObjetos: Item[], key:string){

        if (listaObjetos === undefined){
            console.log (`getValusOfKey(): listaObjetos: undefining`)
            return []
        }

        const filtrado = listaObjetos.filter((obj)=>obj[key])

        if (filtrado.length === 0){
            console.log (`Não existe ${key} na lista de objetos`)
            return []
        }
        
        const newkeys= new Set<string>()
        
        filtrado.forEach((obj)=>{
          newkeys.add(obj[key])
        })
    
        return [... newkeys.values()]
    }

    getNumCol(obj:any):string{
        return 'repeat('+this.getKeys(obj).length+', 1fr)'
    }

    incluirKeyAtArray = incluirKeyAtArray
    

    ordenarAD = sortByParameter 

    buscarItem = buscaObjeto

    filtrarMultiplasColunasTabela = filtrarMultiplasColunasTabela

    setParameterObjKey = setParameterObjKey

    atribuiValoresNakey = atribuiValoresNakey

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