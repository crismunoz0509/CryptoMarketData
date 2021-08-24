const rates = document.getElementById("rates");

const FetchRates = () => {
    
    const endpoint = 'live';
    const url = 'http://api.coinlayer.com/' + endpoint + '?access_key=6bfe2cb9ec8df03ade6d71bfa7c0cfa1';
    const reqData = fetch(url).then((res) => res.json())
    DisplayRates(reqData)
}

const DisplayRates = (data) => {
    const wantedRates = ['BTC', 'BAT', 'DGB'];
    data.then(res => {
        let htmlString;
        for(let i = 0; i <= 2; i++){
            htmlString = `
                <li>
                    <p>${wantedRates[i]}</p>
                </li>
            `
            rates.innerHTML = htmlString;
            console.log(wantedRates[i]);
        }
    });
};

FetchRates();