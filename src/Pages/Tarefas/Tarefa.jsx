import React, { Component } from 'react';
import 'primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import './Tarefa.css'
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import dateFormat from 'dateformat'


var cron;
var ss = 0;
var mm = 0;
var hh = 0;
var tempo = 0;

class Tarefa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iniciar_tempo: false,
      parar_tempo: true,
      salvarAlteracao: true,
      tarefa_id_atual: null,
      usuario_responsavel_id: null,
      data_entrega_tarefa: null,
      tempo_gasto_tarefa: null,
      texto_tarefa: null,
      tarefas: [{
        tarefa_id: null,
        usuario_id: null,
        data_cadastro: null,
        data_entrega: null,
        tempo_gasto: null,
        texto: null,
        etapa_id: null,
        solicitacao_id: null,
        solicitacao: [
          {
            solicitacao_id: null,
            descricao: null,
            data_entrega: null,
            tempo_gasto: null
          }
        ],
        etapa: [{
          etapa_id: null,
          descricao: null
        }]
      }],

      dadosTarefa: [],
      tarefa_alterar: [{}],
      usuarios: []

    };

  }

  componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
      "solicitacao_id": window.sessionStorage.solcitacao_id
    };

    axios.get("/TarefasSolicitacao", { headers })
      .then((response) => {
        if (response.status === 200) {
          this.state.tarefas.push()
          this.setState({ tarefas: response.data })
          this.state.dadosTarefa = this.state.tarefas.filter(person => person.tarefa_id == window.sessionStorage.tarefa_id)
          this.setState({ tarefa_id_atual: this.state.dadosTarefa[0].tarefa_id })
          this.setState({ usuario_responsavel_id: this.state.dadosTarefa[0].usuario_id })
          this.setState({ data_entrega_tarefa: dateFormat(this.state.dadosTarefa[0].data_entrega, "dd/mm/yyyy") })
          this.setState({ tempo_gasto_tarefa: this.state.dadosTarefa[0].tempo_gasto })
          this.setState({ texto_tarefa: this.state.dadosTarefa[0].texto })
        }

      })

    axios.get('/Usuarios')
      .then((response) => {
        if (response.status === 200) {
          this.state.usuarios.push()
          this.setState({ usuarios: response.data })
        }
      })


  }

  preenhcerComboTarefa() {
    return this.state.tarefas.map(obj => {
      return <option value={obj.tarefa_id}>{obj.etapa.descricao}</option>
    })
  }


  render() {

    const startTempo = () => {
      ss = 0
      mm = 0
      hh = 0
      tempo = 0

      this.setState({ iniciar_tempo: true })
      this.setState({ parar_tempo: true })
      this.setState({ salvarAlteracao: false })

      cron = setInterval(() => { timer(); }, 1000);
      alert('Tempo Iniciado com sucesso!')
    }

    function timer() {
      ss++;

      if (ss == 59) {
        ss = 0;
        mm++;

        if (mm == 59) {
          mm = 0;
          hh++;
        }
      }
    }

    const StopTempo = () => {
      tempo = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
      clearInterval(cron);

      const headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "tarefa_id": this.state.tarefa_id_atual,
        "Solicitacao_id": this.state.tarefas[0].solicitacao.solicitacao_id
      };

      const body = JSON.stringify({
        tempo_gasto: tempo
      })
      axios.patch('/AtualizarTempoTarefa', body, { headers })
        .then((response) => {
          this.setState({ dadosTarefa: response.data })
          alert('Tempo parado com sucesso')
          this.setState({ iniciar_tempo: false })
          this.setState({ parar_tempo: true })
          this.setState({ salvarAlteracao: true })

        }).catch((error) => {
          alert("Ocorreu um erro ao tentar atualizar o tempo gasto" + error);
        });
      tempo = 0

      window.sessionStorage.tarefa_id = this.state.tarefa_id_atual
      setInterval(() => { window.location.href = '/Tarefa' }, 1000);

    }

    const preenhcerDadosTarefa = (valor) => {
      this.state.dadosTarefa = this.state.tarefas.filter(person => person.tarefa_id == valor)
      this.setState({ tarefa_id_atual: this.state.dadosTarefa[0].tarefa_id })
      this.setState({ usuario_responsavel_id: this.state.dadosTarefa[0].usuario_id })
      this.setState({ data_entrega_tarefa: dateFormat(this.state.dadosTarefa[0].data_entrega, "dd/mm/yyyy") })
      this.setState({ tempo_gasto_tarefa: this.state.dadosTarefa[0].tempo_gasto })
      this.setState({ texto_tarefa: this.state.dadosTarefa[0].texto })
    }

    const VoltarPrincipal = () => {
      window.location.href = '/Principal'
    }

    const AtualizarTexto = (e) => {
      this.state.texto_tarefa = e
    }

    const SalvarAlteracoes = () => {
      const headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",

        "tarefa_id": this.state.tarefa_id_atual
      };

      const body = JSON.stringify({
        texto: this.state.texto_tarefa
      })

      console.log(body)
      axios.patch('/Tarefas', body, { headers })
        .then((response) => {
          this.setState({ dadosTarefa: response.data })
          alert('Alterado com sucesso!')
          this.setState({ iniciar_tempo: true })
          this.setState({ parar_tempo: false })
          this.setState({ salvarAlteracao: true })

        }).catch((error) => {
          alert("Ocorreu um erro ao tentar atualizar os dados" + error);
        });


    }

    return (
      <div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="Descricao"> Solicitação</label>
            <InputText type="text" readOnly value={this.state.tarefas[0].solicitacao.descricao} />
          </div>

          <div className="p-field p-col">
            <label htmlFor="DataEntrega"> Data Entrega</label>
            <InputText readOnly value={dateFormat(this.state.tarefas[0].solicitacao.data_entrega, "dd/mm/yyyy")} />
          </div>

          <div className="p-field p-col">
            <label htmlFor="TempoGasto"> Tempo Gasto</label>
            <InputText type="Time" readOnly value={this.state.tarefas[0].solicitacao.tempo_gasto} />
          </div>

        </div>

        <div className="p-fluid p-formgrid p-grid">

          <div className="p-field p-col">
            <select style={{ height: '30px' }} value={this.state.tarefa_id_atual} onChange={(e) => preenhcerDadosTarefa(e.target.value)}>
              {this.preenhcerComboTarefa()}
            </select>
          </div>
        </div>


        <div className="p-fluid p-formgrid p-grid">

          <div className="p-field p-col">
            <label htmlFor="NomeResponsavel"> Responsavel Tarefa</label>
            <InputText type="text" readOnly value={this.state.usuarios.filter(obj => obj.usuario_id == this.state.usuario_responsavel_id).map(filteredPerson => (filteredPerson.nome))} />
          </div>


          <div className="p-field p-col">
            <label htmlFor="DataEntrega"> Data Entrega</label>
            <InputText type="text" readOnly value={this.state.data_entrega_tarefa} />
          </div>

          <div className="p-field p-col">
            <label htmlFor="TempoGasto"> Tempo Gasto</label>
            <InputText type="text" readOnly value={this.state.tempo_gasto_tarefa} />
          </div>

          <div className="p-field p-col">
            <Button type="submit" style={{ height: '35px' }} disabled={this.state.iniciar_tempo} onClick={startTempo} > Iniciar Tempo</Button>
          </div>

          <div className="p-field p-col">
            <Button type="submit" style={{ height: '35px' }} disabled={this.state.parar_tempo} onClick={StopTempo}> Parar Tempo</Button>
          </div>

          <div className="p-field p-col">
            <Button type="submit" style={{ height: '35px' }} disabled={this.state.salvarAlteracao} onClick={SalvarAlteracoes} > Salvar Alterações</Button>
          </div>

        </div>
        <Editor style={{ height: '300px' }} value={this.state.texto_tarefa} onTextChange={(e) => AtualizarTexto(e.htmlValue)} ></Editor>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <Button type="submit" style={{ height: '40px', background: '#121214' }} onClick={VoltarPrincipal} > Voltar</Button>
          </div>


          <div className="p-field p-col">
            <Button type="submit" style={{ height: '40px', background: '#121214' }}> Nova Tarefa</Button>
          </div>

        </div>
      </div>


    )
  }
}

export default Tarefa;