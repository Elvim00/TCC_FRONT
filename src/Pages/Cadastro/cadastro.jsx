import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import './Cadastro.css'
import { InputMask } from 'primereact/inputmask';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import {Password} from 'primereact/password';
import axios from 'axios';

  

class Cadastro extends React.Component {        
  
  constructor(props) {
    super(props);    
    this.state = {              
            nome: '',          
            telefone: '',
            tipo_documento: 'CPF',
            documento: '',
            email: '',
            sexo: 'M', 
            tipo_usario: '',         
            login: '',
            senha: '',
            isFuncionario: false,
            isCliente: false,
            cargo_id: null,
            nome_empresa: '',
            status: 'A',                            
          mascaraDocumento: '999.999.999-99',
          cargo: []
        }}  
        
        componentDidMount() {          
          axios.get("/Cargos")
          .then((response) => {
            if (response.status === 200){
              this.state.cargo.push()
              this.setState({cargo: response.data})              
          }
        
      })}   

      preenhcerComboCargo() {        
        return this.state.cargo.map(obj =>{
          return <option value={obj.cargo_id}>{obj.descricao}</option>
        })
      }      
          

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

          console.log(this.state)
          axios.post('/Usuarios',  this.state )
            .then(res => {
              if (res.status === 201){
                alert('Usuario criado com sucesso!');                
                window.location.href ='/'
                
              }
            } ).catch((error) => {
              alert("Ocorreu um erro ao tentar cadastrar o usuaario" + error);
          });            


        }                      

        const OnchangeTipoDocumento = e => {               
            this.setState({tipo_documento: e.target.value}) 
                        
            if (e.target.value === 'CPF' ){
              this.setState({mascaraDocumento: '999.999.999-99'})              
            }else{
              this.setState({mascaraDocumento: '99.999.999/9999-99'})              
            }
          }    
          
        const OnchangeTipoUsuario = e => {
          this.setState({tipo_usario: e.target.value})

          if (e.target.value === 'C'){
            this.setState({isCliente: true})
            this.setState({cargo_id: null})
            this.setState({isFuncionario: false})
          }
          else{
            this.setState({isFuncionario: true})
            this.setState({nome_empresa: ''})
            this.setState({isCliente: false})            
          }
        }
    
        return (         
                    
          
            <div className = "Principal" > 
            <div className = 'p-field p-grid' style={{position:'Center'}}>
            <div className = "p-col" >
                <img  src = "https://cdn2.iconfinder.com/data/icons/web-technology-outline/100/outline_user_person_people_usuario-256.png" alt =''/>
            </div>                      
            <div className = "p-col">               
                <h1>Cadastro Usuario</h1>  

                <div className = 'p-field p-grid' style={{paddingRight:'400px', position:'center'}} >                                                  
                <div className="p-col" >                                
                <InputText style={{width:'290px'}} type = 'text' placeholder = 'Digite Nome' id="Nome"   type="text"  ref='nometeste'  value = {this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}/>
                </div> 
                </div>

                <div className = 'p-field p-grid'>                                                  
                <div className="p-col">                                
                <InputMask style={{width:'290px'}} type = 'text' placeholder = 'Digite Telefone' mask="(99)-9 9999-9999"  value = {this.state.telefone} onChange={(e) => this.setState({telefone: e.target.value})}/>
                </div>                                                                           
                </div>    

                <div className = 'p-field p-grid'>                  
                  <div className= "p-col">                  
                    <select  style={{height:'30px', width: '70px', marginRight:'10px'}} className='Selecao-TipoDocumento' value={this.state.tipo_documento} onChange={(e) => OnchangeTipoDocumento(e)}>
                      <option value="CPF">CPF</option>
                      <option value="CNPJ">CNPJ</option>        
                    </select>                    
                    <InputMask style={{ width:'210px'}} className='Documento' mask={this.state.mascaraDocumento}  value = {this.state.documento} onChange={(e) => this.setState({documento: e.target.value})}/>                                       
                  </div>
                </div> 

                <div className = 'p-field p-grid'>                                                
                <div className="p-col">                                
                <InputText style={{width:'290px'}} placeholder = 'Digite Email' id="Email" type="text" size= '40' value = {this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                </div> 
                </div> 

                <div className = 'p-field p-grid'>                                                  
                <div className="p-col">                                
                  <select style={{height:'30px', width: '100px'}} value = {this.state.sexo} onChange={(e) => this.setState({sexo: e.target.value})}>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>        
                  </select>
                </div> 
                </div> 

                <div className = 'p-field p-grid'>                                                  
                <div className="p-col">                                
                  <select style={{height:'30px', width: '100px'}} value = {this.state.tipo_usuario} onChange={(e) => OnchangeTipoUsuario(e)}>  
                    <option value=""></option>
                    <option value="F">Funcionario</option>
                    <option value="C">Cliente</option>        
                  </select>
                </div> 
                </div> 

                { this.state.tipo_usario === 'F' &&(
                <div className = 'p-field p-grid' >                                                  
                <div className="p-col"> 
                <select style={{height:'30px', width: '290px'}} value={this.state.cargo_id} onChange={(e) => this.setState({cargo_id: e.target.value})}>
                  {this.preenhcerComboCargo()}
                </select>
                </div> 
                </div>                        
                )}

                { this.state.tipo_usario === 'C' &&(
                <div className = 'p-field p-grid' >                                                
                <div className="p-col"> 
                <InputText placeholder = 'Digite Nome Empresa' id="empresa" type="text" size= '40' value = {this.state.nome_empresa} onChange={(e) => this.setState({nome_empresa: e.target.value})}/>
                </div> 
                </div>                        
                )}                                

                <div className = 'p-field p-grid'>                                                  
                <div className="p-col">                                
                <InputText style={{width:'290px'}} placeholder = 'Digite Login' id="Login" type="text" value = {this.state.login} onChange={(e) => this.setState({login: e.target.value})}/>
                </div> 
                </div>

                <div className = 'p-field p-grid'>                                                  
                <div className="p-col">                                
                <Password size='37' placeholder = 'Digite Senha'  feedback={false} toggleMask value = {this.state.senha} onChange={(e) => this.setState({senha: e.target.value})}/>
                </div> 
                </div>                                
                <div className = 'p-field p-grid' style={{paddingLeft:'7px'}}>     
                  <Button  type = "submit"  style={{height:'30px', width: '250px', background: '#121214'}} onClick={CadastrarUsuario}> Cadastrar </Button>                                                                          
                </div>                  

            </div>    
            </div>
            </div>        
        )
    
    }
  }

export default Cadastro;  