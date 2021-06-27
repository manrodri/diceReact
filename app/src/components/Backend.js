const Backend = ({sides, numberOfDices}) => {
    const results = [];
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

    return {
        dicesOutput: results,
        total: total
    }
}

export default Backend