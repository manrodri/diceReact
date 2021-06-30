import React, {useEffect, useState} from 'react';
import ImageList from "./ImageList";
import Dice from "./Dice";

const API_URL = process.env.APIURL || 'https://5chcn1mqnb.execute-api.eu-west-1.amazonaws.com/prod'

const DisplayError = ({error}) => {
        return <div>{`Something went wrong!: ${error}`}</div>
    }

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

        postData(`${API_URL}/diceRoll`, {sides: sides, numberOfDices: dices})
            .then(data => {
                console.log("in the then...")
                console.log(data)
                if('body' in data){
                    setResults(data.body); // JSON data parsed by `data.json()` call
                } else {
                    setResults(data)
                }


            })
            .catch(
                error => {
                    console.log(`error: ${error}`)
                    setResults(error)
                }
            )
        ;

       // const input = {
       //      sides: sides,
       //      numberOfDices: dices
       //  }
       //  setResults(Backend(input))
    }, [sides, dices, gamesPlayed])

    if(!(`dicesOutput` in results)){
        return (
             <div className={`ui header`}>
           <DisplayError error={results.errorMessage} />
        </div>
        )
    } else {
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






}

export default RollDices;


