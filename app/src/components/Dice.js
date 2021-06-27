import React, {useState} from 'react'
import Dropdown from "./Dropdown";
import RollDices from "./RollDices";

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
            <RollDices dices={dices} sides={sides.value}/>

        </div>

    )
}

export default Dice;