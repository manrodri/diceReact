 exports.handler = async (event) => {
    const {sides, numberOfDices} = event
    const results = [];
    let statusCode = 400;
    let response;
    if(!parseInt(sides) || !parseInt(numberOfDices)){
        response = {
            body: {},
            message: "Number of sides and number of dices must be an integer",
            error: "Bad request",
            statusCode: 400
        }
        return response
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