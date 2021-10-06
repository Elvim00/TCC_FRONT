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

class Principal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleLeft: false,
            products: [],
            selectedProduct1: null,
        };
    }

    componentDidMount() {          
      axios.get("/TarefasUsuario/"+ window.sessionStorage.usuario)
      .then((response) => {
        if (response.status === 200){
          console.log(response.data)
          this.state.etapas.push()
          this.setState({products: response.data})                        
        }        
      })
      

    }

    render() {

        return (
                <div>
                  <Geral/>

                    <div className="Card">
                      <h3>Tarefas Vinculadas à você</h3>
                      <DataTable  value={this.state.products} selectionMode="single" selection={this.state.selectedProduct1} onSelectionChange={e => this.setState({ selectedProduct1: e.value })} dataKey="id">
                        <Column field="descricao" header="Descrição"></Column>
                        <Column field="tempo_gasto" header="Tempo gasto"></Column>
                        <Column field="data_entrega" header="data_entrega"></Column>                        
                      </DataTable>                       
                    </div>                                     
                </div>
                )
    }
}
export default Principal;