import { createContext } from "react";

export const valores = {
    title: "Mi Aplicación en Context",
    color: "Green"
};

export const appContext = createContext(valores);
