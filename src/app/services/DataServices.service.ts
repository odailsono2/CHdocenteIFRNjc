import { Injectable } from "@angular/core";
import { Item } from "./tableFunctions";


@Injectable({
    providedIn: 'root'
})
export class DataServices {

    private dataStore: Item[] = [];
    private dataTurmas: any[] = []

    public getdataStore(): Item[] {
        return this.dataStore;
    }

    public setdataStore(value: any) {
        console.log("setdataStore(value): ")
        this.dataStore = value;

    }

    // public getdataStoreJSON(): Item[] {

    //     // console.log("getDataStoreJSON")

    //     if (this.isValidJson(this.dataStore)) {

    //         console.log("getdataStoreJSON valid")

    //         return (this.dataStore !== undefined) ? JSON.parse(this.dataStore) : []
    //     }

    //     return this.dataStore


    // }

    isValidJson(str: any) {
        console.log("isValidJson")
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    public getdataTurmas(): any {
        return this.dataTurmas;
    }

    public setdataTurma(value: any) {
        console.log("setdataStore(value): ")
        this.dataStore = value;

    }

    // public getdataTurmaJSON(): any | undefined {

    //     // console.log("getDataStoreJSON")

    //     if (this.isValidJson(this.dataTurmas)) {

    //         console.log("getdataStoreJSON valid")

    //         return (this.dataTurmas !== undefined) ? JSON.parse(this.dataTurmas) : []
    //     }

    //     return this.dataTurmas


    // }



}