import React, { Component } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';


export class Principal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFullScreen: false,
            visibleCustomToolbar: false
        };
    }

    render() {        

        return (
            <div className="p-field p-grid">
                <div className = "p-col" >
                  
                <Sidebar  className= "sidebar" position="Left" visible={this.state.visibleLeft} onHide={() => this.setState({ visibleLeft: false })}>
                    <div className= "teste">
                    <h1> teste </h1>
                    <h3>Left Sidebar</h3>
                    </div>
                  </Sidebar>                     
                  <Button icon="pi pi-arrow-right" onClick={() => this.setState({ visibleLeft: true })} className="p-mr-2" />              

                  </div>  
   
                
                <div className="p-col" id ="coluna2">
                    <div className="dadosUsuario">
                    
                    </div>
                    <div className ="tabelaSolicitacao">

                    </div>
                </div>


               
            </div>
            
        )
    }
}