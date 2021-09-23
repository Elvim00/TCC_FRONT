import React, { Component } from 'react';
import 'primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import './Tarefa.css'
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';


  

class Tarefa extends React.Component {        
  
  constructor(props) {
    super(props);    
    this.state = {   
        solicitacao_id: 0,
        tarefa_id: 0,
        text1: '',
        tarefas:[],
        dadosTarefa:[]         

        }} 
        
        componentDidMount() { 
            const headers = {
                "Content-Type": "application/json",
                "solicitacao_id": this.solicitacao_id,                 
                };            
            
            axios.get("/TarefasSolicitacao", {headers})
            .then((response) => {
              if (response.status === 200){
                this.state.tarefas.push()
                this.setState({tarefas: response.data})              
            }
          
        })}           
          
        preenhcerComboTarefa() {        
            return this.state.tarefas.map(obj =>{
              return <option value={obj.tarefa_id}>{obj.descricao}</option>
            })
          }                 
               

    render() {             
        return(
        <div>             
          <div className="p-fluid p-formgrid p-grid">
                    
            <div className="p-field p-col">                        
              <select  className="Tarefas" value={this.state.tarefa_id} onChange={(e) => this.setState({tarefa_id: e.target.value})}>
                {this.preenhcerComboTarefa()}
              </select>
            </div>                    
          </div>      

          <div className="p-fluid p-formgrid p-grid">        
            <div className="p-field p-col">          
              <label htmlFor="NomeResponsavel"> Responsavel Tarefa</label>                                                      
              <InputText type="text"  readOnly value = {this.state.dadosTarefa.nome_responsavel}/>
            </div> 

            <div className="p-field p-col">          
              <label htmlFor="DataEntrega"> Data Entrega</label>                                                      
              <InputText type="text"  readOnly value = {this.state.dadosTarefa.data_entrega}/>
            </div> 

            <div className="p-field p-col">          
              <label htmlFor="TempoGasto"> Tempo Gasto</label>                                                      
              <InputText type="text"  readOnly value = {this.state.dadosTarefa.tempo_gasto}/>
            </div> 

            <div className="p-field p-col">          
            <Button  type = "submit"> Iniciar Tempo</Button>                                                                                      
            </div>

            <div className="p-field p-col">          
            <Button  type = "submit"> Iniciar Tempo</Button>                                                                                      
            </div>            

          </div>
          
               
                    <h5>Default</h5>
                     <textEditor height="300" />
               
          



        </div>
        )
    }}

export default Tarefa;  