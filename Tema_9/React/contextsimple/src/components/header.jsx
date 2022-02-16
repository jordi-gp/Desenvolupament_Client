import React, { useContext } from 'react';
import { appContext } from './contextData';

export const Header = () => {

    const valores = useContext(appContext);

    return (
        <header className='App-header'>
            <div>
                <h1 style={{color: valores.color}}>{valores.title}</h1>
            </div>
        </header>
    )
}

export default Header;