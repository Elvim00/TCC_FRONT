import React from 'react';
import './login.css'
import { InputText } from 'primereact/inputtext';
import { MdEmail, MdLock} from "react-icons/md";
import { Button } from 'primereact/button';
import axios from 'axios';

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
    "Login": {usuario},
    "senha": {senha}
  };
  const url = "/ValidarUsuario";

    axios.get(url, {headers})
    .then((response) => {
      console.log(response.data[0].usuario_id)
  //    console.log(event.target.usuario.value)
     // console.log({senha})
    //  if (response.data.usuario_id = 1) {
   //     alert('OK')
   //   } else {
   //     alert('Erro')
   //   }
      
    }).catch((error) => {
        alert("Ocorreu um erro ao buscar os items" + error);
    });   
    
    
}  


function login (){ 
  
     
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
                  onKeyDown={(e) => preencherUsuario(e.target.value)}
                />                    
              </div>   

              <div className = "login-senha"> 
                <MdLock/>
                <InputText                   
                    type = 'text'                    
                    placeholder = 'Digite uma senha'
                    onKeyDown={(e) => preencherSenha(e.target.value)}
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
              <Button type = "submit"> 
                Cadastrar
              </Button>                  
                
            </div>         
            
        </div>
        
    )
}
export default login;