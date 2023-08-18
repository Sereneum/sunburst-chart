import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import Store from "./store/store";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Context.Provider value={{
                store: new Store()
            }}>
                <App/>
            </Context.Provider>
        </ChakraProvider>
    </React.StrictMode>
);
