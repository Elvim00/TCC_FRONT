import React from 'react';
import Cadastro from './Cadastro/cadastro';
import TelaLogin from '../Pages/Login/login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Principal } from './Principal/Principal';


function CarregarRota(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TelaLogin} />
                <Route path="/cadastro-usuario" component={Cadastro} />    
                <Route path="/Principal" component={Principal} />
            </Switch>        
        </BrowserRouter>
    );
};

export default CarregarRota;