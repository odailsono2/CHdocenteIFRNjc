import { Routes } from '@angular/router';
import { TableJSONComponent } from './tabela-from-json/tabela-from-json.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    // {path:'',redirectTo:'/test',pathMatch:'full'},
    {path:'listaDisciplinas',component:TableJSONComponent},
    {path:'ProjCH',component:TestComponent}
];
