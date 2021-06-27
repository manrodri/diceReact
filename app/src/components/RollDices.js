import React, {useEffect, useState} from 'react';
import Backend from "./Backend";

const RollDices = ({sides, dices}) => {

    const [results, setResults] = useState({dicesOutput: [], total: 0})

    useEffect(()=> {
        console.log(`sides: ${sides}`)
        console.log(`dices: ${dices}`)
        const input = {
            sides: sides,
            numberOfDices: dices
        }
        setResults(Backend(input))
    }, [sides, dices])

    return (
        <div className={`ui header`}>

            <div>
                Total: <hr />
                {results.total}
            </div>

        </div>
    )
}

export default RollDices;