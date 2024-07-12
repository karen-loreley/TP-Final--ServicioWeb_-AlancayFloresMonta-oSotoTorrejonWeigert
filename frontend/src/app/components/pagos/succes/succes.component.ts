import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-succes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './succes.component.html',
  styleUrl: './succes.component.css'
})
export class SuccesComponent {
  transactionStatus: string='';
  aprobado:boolean=true
  contador:number=3
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transactionStatus = params['collection_status'];
      console.log(this.transactionStatus)
      if (this.transactionStatus === 'approved') {
        this.aprobado=true
      }else{
        this.aprobado=false
      }
    });
    setInterval(() => {
      this.contador--;
      if (this.contador === 0) {
        this.router.navigate(['/home']);
      }
    }, 1000);
  }
}
