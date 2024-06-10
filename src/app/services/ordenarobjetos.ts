export interface Item {
    [key: string]: any; // This allows the object to have properties of any type
  }
  
  /**
   * Sorts an array of objects by a specified key.
   * 
   * @param items - The array of objects to be sorted.
   * @param key - The key (property) to sort the objects by.
   * @param ascending - Optional parameter to specify ascending or descending order. Default is true (ascending).
   * @returns The sorted array of objects.
   */
export function sortByParameter(items: Item[], key: string, ascending: boolean = true): Item[] {
  return items.sort((a, b) => {
    if (a[key] < b[key]) {
      return ascending ? -1 : 1;
    } else if (a[key] > b[key]) {
      return ascending ? 1 : -1;
    } else {
      return 0;
    }
  });
}

interface BuscaObejeto { 
  items: Item[]; 
  key: string; 
  findItem: string|undefined;
}

export function buscaObjeto({items, key, findItem }: BuscaObejeto):Item[]{
  const resultado:Item[] = items.filter((item)=>(item[key].toLowerCase().includes(findItem)))
  return resultado
}

interface FiltroTabela{
  items:Item[],
  key:string,
  palavra:string, 
  mapKeysPalavras:Map<string,string>
}
export function filtrarMultiplasColunasTabela({items,key,palavra, mapKeysPalavras}:FiltroTabela){
    // Map para armazenar os itens pesquisados no filtros individuais
    // de cada coluna
    let resultado = items
    mapKeysPalavras.set(key,palavra)
    
    mapKeysPalavras.forEach((value,key)=>{
      if (value===''){
        return
      }
      else{
        resultado = buscaObjeto({items:resultado,findItem:value,key: key})
      }
    })

    return resultado
  }