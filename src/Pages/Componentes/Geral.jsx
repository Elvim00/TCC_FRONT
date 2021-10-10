import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../Principal/principal.css';
import React, { Component } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

class Geral extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleLeft: false,
            products: [],
            selectedProduct1: null,    
            cargos:[],        
            usuario:[]
        };
    }
    componentDidMount() {          
      axios.get('/Usuarios/'+ window.sessionStorage.usuario)
      .then((response) => {
        if (response.status === 200){   
          this.state.usuario.push()
          this.setState({usuario: response.data})              
        }        
      })

      axios.get('/Cargos')
      .then((response) => {
        if (response.status === 200){          
          this.state.cargos.push()                    
          this.setState({cargos: response.data})              
        }        
      })                       
    
    }    

    render() {

        return (
                <div>
                    <div className="card">
                        <Sidebar className="Cadastros" visible={this.state.visibleLeft} onHide={() => this.setState({visibleLeft: false})}>
                            <h3>Cadastros</h3>
                            <Button className="p-button-raised p-button-text" style={{width:'200px'}} icon="pi pi-plus-circle" type = "submit" onClick ={()=> window.location.href ='/CadastroSolicitacao'}> Solicitação</Button>
                            <Button className="p-button-raised p-button-text" style={{width:'200px'}} icon="pi pi-plus-circle" type = "submit" onClick ={()=> window.location.href ='/tarefa'}> Etapa</Button>                            
                            <Button className="p-button-raised p-button-text" style={{width:'200px'}} icon="pi pi-plus-circle" type = "submit" onClick ={()=> window.location.href ='/tarefa'}> Cargo</Button>                                                        
                            <Button className="p-button-raised p-button-text" style={{width:'200px'}} icon="pi pi-angle-left" type = "submit" onClick ={()=> window.location.href ='/'}> Sair</Button>                            
                        </Sidebar>                      
                                
                        <Button icon="pi pi-align-justify" onClick={() => this.setState({visibleLeft: true})} className="p-mr-2" />
                    </div>
                    <div className="p-fluid p-formgrid p-grid">        
                      <div className="p-field p-col">          
                        <h3>Dados Usuario Logado</h3>
                      </div> 
                    </div>
                    
                    <div className="p-fluid p-formgrid p-grid">        
                      <div className="p-field p-col">          
                        <label > Nome </label>                                                      
                        <InputText type="text"  readOnly value={this.state.usuario.nome} />
                      </div> 

                      <div className="p-field p-col">          
                        <label > Telefone </label>                                                      
                        <InputText type="text"  readOnly value={this.state.usuario.telefone} />
                      </div>                                          

                      <div className="p-field p-col" >          
                        <label > Email </label>                                                      
                        <InputText type="text"  readOnly value={this.state.usuario.email}/>
                      </div>       

                      { this.state.usuario.isFuncionario &&(
                      <div className="p-field p-col">          
                        <label > Cargo </label>                                                      
                        <InputText type="text"  readOnly value={this.state.cargos.filter(person => person.cargo_id == this.state.usuario.cargo_id).map(filteredPerson => ( filteredPerson.descricao))}/>
                      </div> 
                      )}     
                      
                      { this.state.usuario.isCliente &&(
                      <div className="p-field p-col">          
                        <label > Nome Empresa </label>                                                      
                        <InputText type="text"  readOnly value={this.state.usuario.nome_empresa}/>
                      </div> 
                      )}   
                    </div>                                   
                </div>
                )
    }
}
export default Geral;