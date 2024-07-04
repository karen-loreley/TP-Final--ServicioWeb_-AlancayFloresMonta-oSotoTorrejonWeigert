import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Local } from '../../../models/local';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../../services/local.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-local-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './local-form.component.html',
  styleUrl: './local-form.component.css'
})
export class LocalFormComponent {

  local!: Local;
  listaLocales!: Array<Local>;
  accion: string = "new";
  selectedFile: File | null = null;

  constructor(private activatedRoute: ActivatedRoute, 
              private localService: LocalService,
              private router: Router,
              private http: HttpClient) 
  {

  }

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(params => 
      {
        if (params['id'] == "0")
          {
            this.accion = "new"; 
            this.iniciarVariable();
          }
        else
        {
          this.accion = "update"; 
          this.cargarLocal(params['id']);
        }
      });
      //this.cargarEspectadores();
  }/**/

      /*async onSubmit() 
      {
        if (this.selectedFile) 
        {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
    
          try 
          {
            const response: any = await this.http.post('your-api-endpoint-to-upload-image', formData).toPromise();
            this.local.pathimagen = response.filePath; // Asegúrate de que la respuesta del servidor incluya la URL del archivo subido
          } 
          catch (error) 
          {
            console.error('Error uploading file:', error);
            return;
          }
        }
    
        /*this.activatedRoute.params.subscribe(params => 
          {
            if (params['id'] == "0")
              {
                this.accion = "new"; 
                this.iniciarVariable();
              }
            else
            {
              this.accion = "update"; 
              this.cargarLocal(params['id']);
            }
          });
      }/**/

  /*onFileChange(event: any) 
  {
    const file = event.target.files[0];
    if (file) 
    {
      this.selectedFile = file;
    }
  }/**/

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.local.pathimagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  cargarLocal(id: string): void 
  {
    console.log(this.local);
    this.localService.getLocalById(id).subscribe
    (
      (result) => 
      {
        this.local = result; 
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }

  agregarLocal(): void
  {
    console.log("Datos enviados:", this.local);
    this.localService.addLocal(this.local).subscribe
    (
      (result) => 
      {
        if(result.status == 1)
          {
            alert("Local guardado");
            this.router.navigate(['local']);
          }
        
      },
      (error: any) => 
      {
        console.log(error);
      }
    ); 
    this.local = new Local(); 
  }

  actualizarLocal():void
  {
    this.localService.updateLocal(this.local).subscribe
    (
      (result) => 
      {
        if(result.status == 1)
          {
            alert("Local actualizado");
            this.router.navigate(['local']);
          }
        
      },
      (error: any) => 
      {
        console.log(error);
      }
    ); 
  }

  iniciarVariable(): void
  {
    this.local = new Local(); 
  }

}
