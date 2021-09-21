import React from 'react';
import Cadastro from './Cadastro/cadastro';
import TelaLogin from '../Pages/Login/login';
import Principal from '../Pages/Principal/principal';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


function CarregarRota() {
    return(
            <BrowserRouter>
                <Switch>
                <Route path="/" exact component={TelaLogin} />
                <Route path="/cadastro-usuario" component={Cadastro} />                
                <Route path="/tela-principal" component={Principal} />                
                </Switch>        
            </BrowserRouter>
            );
}
;

export default CarregarRota;