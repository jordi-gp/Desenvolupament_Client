import React from "react";
import Moneda from './moneda';

class Conversor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dollars: 0,
            euros: 0
        }
    }

    //Función para mostrar solo dos decimales
    financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    //Función para realiar el cambio de monedas
    cambioMoneda(evt) {
        let valor = parseFloat((evt.target.value));

        if(evt.target.name === "euros") {
            this.setState ({
                dollars: this.financial(valor / this.props.canvi),
                euros: valor
            })
        } else {
            this.setState ({
                dollars: valor,
                euros: this.financial(valor * this.props.canvi)
            })
        }

        console.log(this.state)
    }

    render () {
    return (
        <div className="form-row">
            <div className="form-group col-auto">
                <label  className="col-sm-2 col-form-label" >Dollars</label>
                <input 
                    type="number"
                    value={this.state.dollars}
                    name="dollars"
                    className="form-control"
                    onChange={(evt) => this.cambioMoneda(evt)}
                >
                </input>
            </div>
            <div className="col">
                <label className="col-sm-2 col-form-label" >Euros</label>
                <input
                    type='number'
                    value={this.state.euros}
                    name="euros"
                    className="form-control"
                    onChange={(evt) => this.cambioMoneda(evt)}
                >
                </input>
            </div>
        </div>    
    )
}
}

export default Conversor;