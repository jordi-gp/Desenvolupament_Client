import React from 'react';

export default function Example() {
    function con() {
        console.log("Has fet click sobre el botó")
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => con()}>Click over me</button>
        </div>
    )
}