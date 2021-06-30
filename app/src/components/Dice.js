import React, {useState} from 'react'
import Dropdown from "./Dropdown";
import RollDices from "./RollDices";
import "../css/Dice.css"

const options = [
    {
        label: "5",
        value: '5'
    },
    {
        label: "6",
        value: '6'
    },
    {
        label: '12',
        value: '12'
    },
    {
        label: '18',
        value: '18'
    },
    {
        label: "21",
        value: "21"
    }
]


const Dice = () => {
    const [sides, setSides] = useState(options[0])
    const [dices, setDices] = useState('2')
    const [gamesPlayed, setGamesPlayed] = useState(0)

    let increment = 0

    const playAgain = () => {
        setGamesPlayed(increment++)
    }

    return (
        <div className={`ui container`}>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="">Enter number of Dices</label>
                    <input type="text"
                           value={dices}
                           onChange={(e) => setDices(e.target.value)}
                    />
                </div>
            </div>
            <Dropdown
                label={"Select number of sides for each dice"}
                selected={sides}
                onSelectedChange={setSides}
                options={options}
            />
            <RollDices dices={dices} sides={sides.value} gamesPlayed={gamesPlayed} />
            <div className="container-button">
                <button className="ui icon button" id={`my-button`} onClick={playAgain} >
                    <p>Play again</p>
                   <i className="fas fa-dice fa-lg"/>
            </button>
            </div>
        </div>

    )
}

export default Dice;