import React from 'react';

class Moneda extends React.Component{

    handleChange(evt) {
        this.props.obtenerMoneda(evt.target.name, evt.target.value);
    }

render(){
    return(
        <input
            type='number'
            className="form-control"
            value={this.props.value}
            //onChange={this.handleChange.bind(this)}
            onChange = {(evt) => this.handleChange(evt)}
            name={this.props.tipoMoneda}
        >
        </input>
    )
}

}
export default Moneda;