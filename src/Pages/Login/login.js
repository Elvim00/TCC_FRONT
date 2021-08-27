import React, { UseState } from 'react';
import './login.css'
import { InputText } from 'primereact/inputtext';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Button } from 'primereact/button';

function login (){
    return (
        <div className = "login">
            <div className = "login-logo">
                <img src = "https://software.muz.ifsuldeminas.edu.br/balanced_diet_v2/assets/img/login.png"/>
            </div>  

            <div className = "login-componente"> 
              <h1>Acesso ao sistema</h1>

              <div className = "login-usuario">   
                <MdEmail/>
                <InputText                   
                  type = 'text'
                  placeholder = 'Digite um usuario'                  
                />                    
              </div>   

              <div className = "login-senha"> 
                <MdLock/>
                <InputText                   
                    type = 'text'
                    placeholder = 'Digite uma senha'/> 
              </div>    
             

              <Button type = "submit" icon="pi pi-check"> 
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

export default login