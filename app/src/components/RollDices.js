import React, {useEffect, useState} from 'react';
import Backend from "./Backend";
import ImageList from "./ImageList";

const RollDices = ({sides, dices, gamesPlayed}) => {

    const [results, setResults] = useState({dicesOutput: [], total: 0})

    useEffect(() => {

        const input = {
            sides: sides,
            numberOfDices: dices
        }
        setResults(Backend(input))
    }, [sides, dices, gamesPlayed])

    return (
        <div className={`ui header`}>

            <ImageList scores={results.dicesOutput} />
            <hr />

            <div>
                Total: <hr/>
                {results.total}
            </div>

        </div>
    )
}

export default RollDices;