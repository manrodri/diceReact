const isNumeric = (str) => {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

const validInput = (input) => {
    if (!isNumeric(input)) return false
    const value = parseInt(input) || parseFloat(input)
    console.log(`value: ${value}`)
    return 0 > value || value <= 10 ? value : false
}


exports.handler = async (event) => {
    const {sides, numberOfDices} = event
    const results = [];
    let statusCode = 400;
    let response;
    if(!validInput(numberOfDices)){
        throw new Error("Number dices must be an integer between 1 and 10");
    }

    if(!validInput(sides)) {
        throw new Error("Number of sides must be an integer. Options: [ 5,6,12,18,21 ]. Default: 5")
    }

    for (let i = 0; i < parseInt(numberOfDices); i++) {
        const output = {
            id: i,
            result: Math.floor(Math.random() * parseInt(sides)) + 1
        }
        results.push(output);
    }
    const total = results.reduce((total, amount) => {
        return total + amount.result;
    }, 0);

    statusCode = 200;

    response = {
        body: {
            dicesOutput: results,
            total: total
        },
        statusCode: statusCode,
    }

    return response;
};


// Todo: use regex to provide proper validation. This fails to flag float values!