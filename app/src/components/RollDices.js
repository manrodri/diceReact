import React, {useEffect, useState} from 'react';
import Backend from "./Backend";
import ImageList from "./ImageList";
import unsplash from "../api/unsplash";

const wordMapping = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": 'four',
    "5": "five",
    "6": "six"
}


const RollDices = ({sides, dices}) => {

    const [results, setResults] = useState({dicesOutput: [], total: 0})


    useEffect(() => {

        const input = {
            sides: sides,
            numberOfDices: dices
        }
        setResults(Backend(input))
    }, [sides, dices])


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