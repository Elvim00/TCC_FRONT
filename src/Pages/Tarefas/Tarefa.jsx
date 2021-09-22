import React from 'react';
import 'primeflex/primeflex.css';


  

class Tarefa extends React.Component {        
  
  constructor(props) {
    super(props);    
    this.state = {              

        }}              
          

    render() {         
        return(
        <div>
               <h5>Vertical</h5>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="firstname1">Firstname</label>
                        <InputText id="firstname1" type="text"/>
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastname1">Lastname</label>
                        <InputText id="lastname1" type="text"/>
                    </div>
                </div>            
        </div>
        )
    }}

export default Tarefa;  