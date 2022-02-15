import React, { useState, useEffect } from 'react';
export default function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = 'Has fet click un total de ${count} vegades';
    });

    return (
        <div>
            <p>Has fet click {count} vegades</p>
            <button onClick={() => setCount(count + 1)}>
                Fes click
            </button>
        </div>
    )
}