import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../Principal/principal.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

class Principal extends Component {

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
        const customIcons = (
                <React.Fragment>
                    <button className="p-sidebar-icon p-link p-mr-1">
                        <span className="pi pi-print" />
                    </button>
                    <button className="p-sidebar-icon p-link p-mr-1">
                        <span className="pi pi-arrow-right" />
                    </button>
                </React.Fragment>
                );

        return (
                <div>
                    <div className="card">
                        <Sidebar visible={this.state.visibleLeft} onHide={() => this.setState({visibleLeft: false})}>
                            <h3>Left Sidebar</h3>
                        </Sidebar>
                
                        <Sidebar visible={this.state.visibleRight} position="right" onHide={() => this.setState({visibleRight: false})}>
                            <h3>Right Sidebar</h3>
                        </Sidebar>
                
                        <Sidebar visible={this.state.visibleTop} position="top" onHide={() => this.setState({visibleTop: false})}>
                            <h3>Top Sidebar</h3>
                        </Sidebar>
                
                        <Sidebar visible={this.state.visibleBottom} position="bottom" onHide={() => this.setState({visibleBottom: false})}>
                            <h3>Bottom Sidebar</h3>
                        </Sidebar>
                
                        <Sidebar visible={this.state.visibleFullScreen} fullScreen onHide={() => this.setState({visibleFullScreen: false})}>
                            <h3>Full Screen Sidebar</h3>
                        </Sidebar>
                
                        <Sidebar visible={this.state.visibleCustomToolbar} onHide={() => this.setState({visibleCustomToolbar: false})} icons={customIcons}>
                            <h3>Sidebar with custom icons</h3>
                        </Sidebar>
                
                        <Button icon="pi pi-arrow-right" onClick={() => this.setState({visibleLeft: true})} className="p-mr-2" />
                        <Button icon="pi pi-arrow-left" onClick={() => this.setState({visibleRight: true})} className="p-mr-2" />
                        <Button icon="pi pi-arrow-down" onClick={() => this.setState({visibleTop: true})} className="p-mr-2" />
                        <Button icon="pi pi-arrow-up" onClick={() => this.setState({visibleBottom: true})} className="p-mr-2" />
                        <Button icon="pi pi-th-large" onClick={() => this.setState({visibleFullScreen: true})} className="p-mr-2" />
                        <Button icon="pi pi-plus" onClick={() => this.setState({visibleCustomToolbar: true})} />
                    </div>
                </div>
                )
    }
}

export default Principal;
const rootElement = document.getElementById("root");
ReactDOM.render(<Principal />, rootElement);