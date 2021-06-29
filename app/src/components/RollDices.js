import React, {useEffect, useState} from 'react';
import ImageList from "./ImageList";

const RollDices = ({sides, dices, gamesPlayed}) => {

    const [results, setResults] = useState({dicesOutput: [], total: 0})

    useEffect(() => {

        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

        postData('https://5chcn1mqnb.execute-api.eu-west-1.amazonaws.com/prod/diceRoll', {sides: sides, numberOfDices: dices})
            .then(data => {
                setResults(data.body); // JSON data parsed by `data.json()` call
            });

       // const input = {
       //      sides: sides,
       //      numberOfDices: dices
       //  }
       //  setResults(Backend(input))
    }, [sides, dices, gamesPlayed])

    return (
        <div className={`ui header`}>

            <ImageList scores={results.dicesOutput}/>
            <hr/>

            <div>
                Total: <hr/>
                {results.total}
            </div>

        </div>
    )
}

export default RollDices;


