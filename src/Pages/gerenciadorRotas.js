import React from 'react';
import Cadastro from './Cadastro/cadastro';
import TelaLogin from '../Pages/Login/login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


function CarregarRota(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TelaLogin} />
                <Route path="/cadastro-usuario" component={Cadastro} />    
            </Switch>        
        </BrowserRouter>
    );
};

export default CarregarRota;