import { Routes } from '@angular/router';
import { Test2Component } from './test2/test2.component';
import { TurmasComponent } from './turmas/turmas.component';
import { CarregaArquivoComponent } from './carrega-arquivo/carrega-arquivo.component';
import { ListarDisciplinasComponent } from './listar-disciplinas/listar-disciplinas.component';

export const routes: Routes = [
    {path:'',redirectTo:'/listaDisciplinas',pathMatch:'full'},
    {path:'listaDisciplinas',component:ListarDisciplinasComponent},
    {path:'Teste2',component:Test2Component},
    {path:'CarregaArquivo',component:CarregaArquivoComponent},
    {path:'Turmas',component:TurmasComponent}

];
