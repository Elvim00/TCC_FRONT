import React, { Component } from 'react';
import './login.css'
import { InputText } from 'primereact/inputtext';
import { MdEmail, MdLock} from "react-icons/md";
import { Button } from 'primereact/button';
import axios from 'axios';
import  { useHistory } from 'react-router-dom'
import {Password} from 'primereact/password';

var usuario;
var senha;
function preencherUsuario(valor){  
  usuario = valor;
}

function preencherSenha(valor){
  senha = valor;
}

async function ValidaUsuario (){ 

  const headers = {
    "Content-Type": "application/json",
    "login": usuario, 
    "senha": senha
    };

  const url = "/ValidarUsuario";

    axios.get(url, {headers})
    .then((response) => {
      if (response.status === 200){
        window.sessionStorage.usuario = response.data[0].usuario_id;
        window.location.href ='/Principal'
      }
      
      
    }).catch((error) => {
        alert("Ocorreu um erro ao buscar os items" + error);
    });   
    
    
}  


function Login (){ 

  let history = useHistory();

  function CadastrarUsuario() {
    history.push("/cadastro-usuario");
  }  
  
     
    return (        
      
        <div className = "login">
          
          
            <div className = "login-logo">
                <img src = "https://software.muz.ifsuldeminas.edu.br/balanced_diet_v2/assets/img/login.png" alt =''/>
            </div>                        
            <div className = "login-componente"> 
              <h1>Acesso ao sistema</h1>

              
              <div className = "login-usuario">   
                <MdEmail/>
                <InputText                   
                  type = 'text'                  
                  placeholder = 'Digite um usuario'  
                  onChange={(e) => preencherUsuario(e.target.value)}
                />                    
              </div>   

              <div className = "login-senha"> 
                <MdLock/>
                <Password                   
                    type = 'text'                    
                    placeholder = 'Digite uma senha'
                    onChange={(e) => preencherSenha(e.target.value)}
                    />                                      
                    
              </div>    
             

              <Button 
              type = "submit" 
              icon="pi pi-check"
              onClick={ValidaUsuario}
              >
                Entrar
              </Button>   

              <h4>Não tenho conta!</h4>    
              <Button 
                type = "submit"
                onClick={CadastrarUsuario}> 
                Cadastrar
              </Button>                  
                
            </div>         
            
        </div>
        
    )
}
export default Login;