import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../Principal/principal.css';
import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import Geral from '../../Componentes/Geral';
import Geral from '../Componentes/Geral';
import axios from 'axios';
import dateFormat from 'dateformat';

class Principal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleLeft: false,
            tarefas: [],
            tarefaSelecionada: null,
        };
    }

    componentDidMount() {    
      const headers = {
        "Content-Type": "application/json",
        "usuario_id": window.sessionStorage.usuario,         
        };          
      
      
      axios.get("/TarefasUsuario", {headers})
      .then((response) => {
        if (response.status === 200){        
          this.state.tarefas.push()
          this.setState({tarefas: response.data})                        
        }        
      })
      

    }

    render() {

      const preencherTrafa=()=>{                        
        window.sessionStorage.tarefa_id = this.state.tarefaSelecionada.tarefa_id;
        window.sessionStorage.solcitacao_id = this.state.tarefaSelecionada.solicitacao.solicitacao_id
        window.location.href ='/Tarefa'        
        
      }      

        return (
                <div>
                  <Geral/>

                    <div className="Card">
                      <h3>Tarefas Vinculadas à você</h3>
                      <DataTable   value={this.state.tarefas} selectionMode="single" selection={this.state.tarefaSelecionada} onSelectionChange={e => this.setState({ tarefaSelecionada: e.value })} onRowDoubleClick={ preencherTrafa} dataKey="id">
                        <Column field ="solicitacao.descricao" header="Descrição"></Column>
                        <Column field = "tempo_gasto" header="Tempo gasto"></Column>
                        <Column type = "date" field ="data_entrega" header="data_entrega"></Column>                        
                      </DataTable>                       
                    </div>                                     
                </div>
                )
    }
}
export default Principal;