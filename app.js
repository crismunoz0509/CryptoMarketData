const rates = document.getElementById("rates");
const key = '68729acf9d43e1af7e81f024ae29a72163fd6a09';
const coins = ['BTC', 'BAT', 'DGB', 'ETH'];
const promises = [];

const FetchRates = () => {

    const url = `https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${coins}`;
    const reqData = fetch(url).then((res) => res.json());
    console.log("data fetched");

    reqData.then( results => {
        console.log(results);
        const cryptoInformation = results.map((data) => ({
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.logo_url
        }));
        console.log(cryptoInformation);
        DisplayRates(cryptoInformation);
    })
    console.log("ran fetch rates");
};

const DisplayRates = (cryptoArray) => {

    const cryptoInfoHTML = cryptoArray.map(data => 
        `
        <li class="card">
            <img class="card-img" src="${data.image}" width="90" height="90">
            <h2 class="card-id">${data.id}</h2>
            <h3 class="card-name">${data.name}</h3>
            <p class="card-price">$${data.price}</p>
        </li>
        `
    ).join(' ')
        rates.innerHTML = cryptoInfoHTML;
    console.log("ran display rate");
};

FetchRates();