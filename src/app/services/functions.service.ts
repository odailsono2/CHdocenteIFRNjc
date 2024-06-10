import { Injectable } from "@angular/core";
import { Item, buscaObjeto, filtrarMultiplasColunasTabela, sortByParameter } from "./ordenarobjetos";

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

    appendIDJSON(listaObjetos:any):any{
        let nova_lista:any[]=[]

        listaObjetos.forEach((objeto:any,id:number) => {
            const novo_objeto = {id,...objeto}
             nova_lista.push(novo_objeto)
        });
        return nova_lista
    }

    ordenarAD = sortByParameter 

    buscarItem = buscaObjeto

    filtrarMultiplasColunasTabela = filtrarMultiplasColunasTabela
}