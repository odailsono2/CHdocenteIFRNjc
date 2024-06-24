import { Component, inject } from '@angular/core';
import { DataServices } from '../services/DataServices.service';

@Component({
  selector: 'carregar-arquivo',
  templateUrl: './carrega-arquivo.component.html',
  styleUrls: ['./carrega-arquivo.component.css']
})
export class CarregaArquivoComponent {
  fileName: string = '';
  fileSize: number = 0;
  fileType: string = '';
  fileContent: string | ArrayBuffer | null = null;
  data = inject(DataServices)

  constructor(){}

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.fileSize = file.size;
      this.fileType = file.type;

      
      reader.onload = (e) => {
        this.fileContent = reader.result;
        this.data.setdataStore(this.fileContent)
        
      };

      reader.readAsText(file);
    }
  }
}
