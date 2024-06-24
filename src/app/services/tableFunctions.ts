export interface Item {
  [key: string]: any ; // This allows the object to have properties of any type
}

export interface ObjKey {
  name: string,
  visible?: string
  clickable?: boolean
  editable?: boolean
  style?:string
  freeze?:boolean
  filter?:boolean
  change?:boolean
  set?:(parameter:string|boolean|number)=>void
}

export function setParameterObjKey<T, K extends keyof T>(obgkey:T, key:K, value: T[K]){
  obgkey[key] = value
}


// implementar classe de keys com Set type
export function includeObjKey({ name }: { name: string }): ObjKey {
  
  let newKey: ObjKey = {} as ObjKey;

  newKey.name= name
  newKey.visible = "visible"
  newKey.editable = true

  return newKey
}

export function setListObjKeys({ listaKeysNames }: { listaKeysNames: string[] }): ObjKey[] {
  
  const listaKeys: ObjKey[] = []

  listaKeysNames.forEach((name) => {
    listaKeys.push(includeObjKey({ name: name }))
  })

  return listaKeys
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
  findItem: string | undefined;
}

export function buscaObjeto({ items, key, findItem }: BuscaObejeto): Item[] {
  const resultado: Item[] = items.filter((item) => (item[key].toLowerCase().includes(findItem)))
  return resultado
}

interface FiltroTabela {
  items: Item[],
  key: string,
  palavra: string,
  mapKeysPalavras: Map<string, string>
}
export function filtrarMultiplasColunasTabela({ items, key, palavra, mapKeysPalavras }: FiltroTabela): Item[] {
  // Map para armazenar os itens pesquisados no filtros individuais
  // de cada coluna
  let resultado = items
  mapKeysPalavras.set(key, palavra)

  mapKeysPalavras.forEach((value, key) => {
    if (value === '') {
      return
    }
    else {
      resultado = buscaObjeto({ items: resultado, findItem: value, key: key })
    }
  })

  return resultado
}

interface novoMembroObjeto {
  objeto: Item,
  newkey: any,
  value?: any,
  coluna?: number
  visible?: boolean
}
export function incluirKeyAt({ objeto, newkey, value = undefined, coluna = 0 }: novoMembroObjeto): Item {
  const entries = Object.entries(objeto)
  entries.splice(coluna, 0, [newkey, value])
  return Object.fromEntries(entries)
}

interface novoMembroArrayObjetos {
  arrayObj: Item[],
  newkey: any,
  value?: any,
  coluna?: number
}

export function incluirKeyAtArray({ arrayObj, newkey, value = undefined, coluna = 0 }: novoMembroArrayObjetos): any {
  let nova_lista: any[] = []

  if (newkey === 'id') {
//  console.log(arrayObj.length)
    arrayObj.forEach((objeto: Item, id: number) => {
      // console.log(nova_lista)
      const novo_objeto = incluirKeyAt({ newkey: newkey, objeto: objeto, coluna: coluna, value: id })//{id,...objeto}
      nova_lista.push(novo_objeto)
      // console.log(nova_lista)

    });

    return nova_lista
  }


  arrayObj.forEach((objeto: any) => {
    const novo_objeto = incluirKeyAt({ newkey: newkey, objeto: objeto, coluna: coluna, value: value })//{id,...objeto}
    nova_lista.push(novo_objeto)
  });

  return nova_lista

}

export function atribuiValoresNakey(obj:Item[],values:any[],key:string){

  console.log(`obj: ${obj}`)
  console.log(`values: ${values}`)

  if(obj === undefined){
    console.log(`obj: ${obj}`)
    return []

  }
  
  values.forEach((value,index)=>{
    const newObj:Item = {...obj[index]}
    obj.push(incluirKeyAt({objeto:newObj,newkey:key,value:value}))
  })

  return obj
}

//----Functions for objects



