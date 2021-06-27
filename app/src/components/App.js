import React, {useState} from 'react';
import "../css/App.css";

import Dice from "./Dice"


const App = () => {

    return (
            <div className="ui container" style={{marginTop: '1em'}}>
                <Dice />

            </div>
        );
}



export default App;
