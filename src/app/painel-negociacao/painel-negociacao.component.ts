import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {
  
  oportunidades = [];
  oportunidade = {descricao:"",nomeProspecto:"",valor:"0"};
  colunasExibidas = ['Descrição', 'Prospecto','Valor']

  constructor(private oportunidadeService: OportunidadeService) { }

  ngOnInit(): void {
    this.consultar();
  }

  consultar(){
    this.oportunidadeService.listar().
    subscribe(resposta=>this.oportunidades = <any> resposta)
  }

  adicionar(){
    this.oportunidadeService.adicionar(this.oportunidade).
    subscribe(() => {
      this.oportunidade = {descricao:"",nomeProspecto:"",valor:""};
      this.consultar();
    })
  }

  getValorTotal() {
    return this.oportunidades.map(t => t.valor).reduce((acc, valor) => acc + valor, 0);
  }

}
