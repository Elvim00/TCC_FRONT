import React, { cloneElement, Component } from 'react';
import Geral from '../Componentes/Geral';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from 'axios';


class CadastroSolicitacao extends Component {

    constructor(props) {
        super(props);
        this.state = {                                                                          
            etapas:[],
            usuarios:[],  
            etapa_id: 0,                      
            solicitacao:{
              data_entrega: 0,
              descricao: '',
              usuario_id: window.sessionStorage.usuario,
              tempo_gasto: '00:00:00'},

            tarefa:{
              etapa_id: 0,
              usuario_id: 0,
              solicitacao_id:0,
              data_entrega: 0,
              tempo_gasto: '00:00:00'}                        
                
        }      
        
      }
        
        componentDidMount() {          
          axios.get("/Etapas")
          .then((response) => {
            if (response.status === 200){
              this.state.etapas.push()
              this.setState({etapas: response.data})              
            }        
          })
          axios.get("/Usuarios")
          .then((response) => {
            if (response.status === 200){                 
              this.state.usuarios.push()
              this.setState({usuarios: response.data})              
            }        
          }              
        )

        }
                       

    render() {



      const cadastrarSolicitacao = () =>{   

        
        axios.post('/Solicitacao',  this.state.solicitacao )
        .then(res => {
          if (res.status === 201){
            this.state.tarefa.solicitacao_id = res.data.solicitacao_id    
            this.state.tarefa.etapa_id = this.state.etapa_id 
            this.state.tarefa.usuario_id = this.state.usuario_id    
            this.state.tarefa.tempo_gasto = '00:00:00'                                      

            console.log(this.state.tarefa)
            axios.post('/Tarefas1',  this.state.tarefa )
            .then(res => {
              if (res.status === 201){
                alert('Cadstro com sucesso!');                
                window.location.href ='/Principal'
                
              }
            } ).catch((error) => {
              alert("Ocorreu um erro ao tentar cadastrar a tarefa" + error);
          });   

          }
        } ).catch((error) => {
          alert("Ocorreu um erro ao tentar cadastrar a solicitação" + error);
      });      
    }                     
      

      const preencherdata_entrega=(valor)=>{
        this.state.solicitacao.data_entrega = valor
      } 
      
      const preencherdescricao=(valor)=>{
        this.state.solicitacao.descricao = valor
      }          
      
      const preencherdata_entrega_tarefa=(valor)=>{
        this.state.tarefa.data_entrega = valor
      }


        return (
          <div>
            <Geral/>
            <div className="p-fluid p-formgrid p-grid">        
              <div className="p-field p-col">          
                <h3>Dados Solicitação</h3>
              </div>
            </div>            

            <div className="p-fluid p-formgrid p-grid">        
              <div className="p-field p-col12 p-md-6" style={{width:'20%'}}>          
                <label > Data Entrega </label>                                                      
                <Calendar  id="calendar" value={this.state.data_entrega} onChange={(e) => preencherdata_entrega(e.target.value)}/>
              </div>

              <div className="p-field p-col10 p-md-6" style={{width:'80%'}}>          
                <label > Descrição Solicitação </label>                                                      
                <InputTextarea rows={1} cols={100} value={this.state.descricao} onChange={(e) => preencherdescricao(e.target.value)} autoResize />
              </div>

            </div>

            <div className="p-fluid p-formgrid p-grid">        
              <div className="p-field p-col">          
                <h3>Dados Primeria Tarefa</h3>
              </div>
            </div>   

            <div className="p-fluid p-formgrid p-grid">        
              <div className="p-field p-col12 p-md-6" style={{width:'20%'}}>          
                <label > Primeira Etapa </label>                                                      
                <Dropdown value={this.state.etapa_id} options={this.state.etapas} onChange={(e) => this.setState({etapa_id: e.target.value})} optionLabel="descricao" optionValue="etapa_id"  editable={true} placeholder="Selecione uma Etapa" />
              </div>

              <div className="p-field p-col10 p-md-6" style={{width:'20%'}}>          
                <label > Usuario Responsavel </label>                                                      
                <Dropdown value={this.state.usuario_id} options={this.state.usuarios} onChange={(e) => this.setState({usuario_id: e.target.value})} optionLabel="nome"  optionValue="usuario_id" placeholder="Selecione um usuario" />
              </div>

              <div className="p-field p-col12 p-md-6" style={{width:'20%'}}>          
                <label > Data Entrega </label>                                                      
                <Calendar  id="calendar" value={this.state.data_entrega} onChange={(e) => preencherdata_entrega_tarefa(e.target.value)}/>
              </div>              

              <div className="p-field p-col10 p-md-6" style={{paddingTop:'8px', width:'15%'}}>                                          
                <Button  style={{height:'35px'}} label="Salvar" icon="pi pi-check" onClick={cadastrarSolicitacao} />
              </div>              

            </div>

            <div className="p-fluid p-formgrid p-grid">        
              <div className="p-field p-col10 p-md-6" style={{width:'15%'}}>                                          
                <Button  style={{height:'35px'}} label="Voltar" icon="pi pi-chevron-left" onClick ={()=> window.location.href ='/Principal'} />
              </div>              

            </div>            

          </div>
        )
    }
}
export default CadastroSolicitacao;