import React from 'react';
import { InputText } from 'primereact/inputtext';
import './Cadastro.css'
import { InputMask } from 'primereact/inputmask';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import {Password} from 'primereact/password';

class Cadastro extends React.Component {        
  constructor(props) {
    super(props);
    this.state = {              
            nome: '',
            telefone: '',
            tipoDocumento: '',
            documento: '',
            email: '',
            sexo: '',
            dataCadastro: 0,
            login: '',
            senha: '',                            
          mascaraDocumento: '999.999.999-99'       
        }}  

    render() {   
        const CadastrarUsuario = () =>{  
          
          if (!this.state.nome){
            alert('E necessário preencher o nome!')                       
            return
          } 

          if (!this.state.telefone){
            alert('E necessário preencher o telefone!') 
            return
          }           

          if (!this.state.documento){
            alert('E necessário preencher o CPF/CNPJ!') 
            return
          }                     

          if (!this.state.email){
            alert('E necessário preencher o email!')         
            return
          }                               

          if (!this.state.login){
            alert('E necessário preencher o login!') 
            return
          }   
          
          if (!this.state.senha){
            alert('E necessário preencher a senha!') 
            return
          }                   

         //gravar usuario

        }              
      

        const OnchangeTipoDocumento = e => {
          console.log(this.state.nome)
            this.setState({tipoDocumento: e.target.value}) 
                        
            if (e.target.value === 'CPF' ){
              this.setState({mascaraDocumento: '999.999.999-99'})              
            }else{
              this.setState({mascaraDocumento: '99.999.999/9999-99'})              
            }
        }
    
        return (            
          
            <div className = "Principal" > 
            <div className = 'p-field p-grid'>
            <div className = "p-col">
                <img src = "https://cdn2.iconfinder.com/data/icons/web-technology-outline/100/outline_user_person_people_usuario-256.png" alt =''/>
            </div>                      
            <div className = "p-col">               
                <h1>Cadastro Usuario</h1>  

                <div className = 'p-field p-grid'>                                  
                <label htmlFor="Nome" className="p-col-fixed" style={{width:'100px'}}>Nome:</label>                                
                <div className="p-col">                                
                <InputText id="Nome" type="text"  ref='nometeste'  value = {this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}/>
                </div> 
                </div>

                <div className = 'p-field p-grid'>                                  
                <label htmlFor="Telefone" className="p-col-fixed" style={{width:'100px'}}>Telefone:</label>                                
                <div className="p-col">                                
                <InputMask mask="(99)-9 9999-9999"  value = {this.state.telefone} onChange={(e) => this.setState({telefone: e.target.value})}/>
                </div>                                                                           
                </div>    

                <div className = 'p-field p-grid'>
                  <label htmlFor="Documento" className = 'p-col-fixed' style={{width:'100px'}}>Documento:</label>
                  <div className= "p-col">
                    <select className='Selecao-TipoDocumento' value={this.state.tipoDocumento} onChange={(e) => OnchangeTipoDocumento(e)}>
                      <option value="CPF">CPF</option>
                      <option value="CNPJ">CNPJ</option>        
                    </select>
                    <InputMask className="Documento" mask={this.state.mascaraDocumento}  value = {this.state.documento} onChange={(e) => this.setState({documento: e.target.value})}/>                     
                  </div>
                </div> 

                <div className = 'p-field p-grid'>                                  
                <label htmlFor="Email" className="p-col-fixed" style={{width:'100px'}}>Email:</label>                                
                <div className="p-col">                                
                <InputText id="Email" type="text" size= '40' value = {this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                </div> 
                </div> 

                <div className = 'p-field p-grid'>                                  
                <label htmlFor="Sexo" className="p-col-fixed" style={{width:'100px'}}>Sexo:</label>                                
                <div className="p-col">                                
                  <select className='Selecao-Sexo' value = {this.state.sexo} onChange={(e) => this.setState({sexo: e.target.value})}>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>        
                  </select>
                </div> 
                </div> 

                <div className = 'p-field p-grid'>                                  
                <label htmlFor="Login" className="p-col-fixed" style={{width:'100px'}}>Login:</label>                                
                <div className="p-col">                                
                <InputText id="Login" type="text" value = {this.state.login} onChange={(e) => this.setState({login: e.target.value})}/>
                </div> 
                </div>

                <div className = 'p-field p-grid'>                                  
                <label htmlFor="Senha" className="p-col-fixed" style={{width:'100px'}}>Senha:</label>                                
                <div className="p-col">                                
                <Password  feedback={false} toggleMask value = {this.state.senha} onChange={(e) => this.setState({senha: e.target.value})}/>
                </div> 
                </div>                                

                <div className = 'p-field p-grid'>     
                  <Button  type = "submit"  icon="pi pi-check"  className="button" onClick={CadastrarUsuario}> Cadastrar </Button>                                                                          
                </div>  

            </div>    
            </div>
            </div>        
        )
    
    }
  }

export default Cadastro;  