import { Component } from "react";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={this.props.logo} alt="logo" className="App-logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
        )
    }
}

export default Header;