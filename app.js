const rates = document.getElementById("rates");
const key = '68729acf9d43e1af7e81f024ae29a72163fd6a09';
const coins = ['BTC', 'ETH', 'ADA', 'BNB', 'USDT'];
const promises = [];

const FetchRates = () => {

    const url = `https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${coins}`;
    const reqData = fetch(url).then((res) => res.json());

    reqData.then( results => {
        const cryptoInformation = results.map((data) => ({
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.logo_url,
            high: data.high
        }));
        DisplayRates(cryptoInformation);
    })
};

const DisplayRates = (cryptoArray) => {

    const cryptoInfoHTML = cryptoArray.map(data => 
        `
        <li class="card">
            <div class="card-identifier">
                <img class="card-img" src="${data.image}" width="90" height="90">
                <h2 class="card-id">${data.id}</h2>
                <h3 class="card-name">${data.name}</h3>
            </div>
            <div class="card-pricedata">
                <p class="card-price"><b>current price:</b> $${data.price}</p>
                <p class="card-high"><b>quarterly high:</b> $${data.high}</p>
            </div>
        </li>
        `
    ).join(' ');
    rates.innerHTML = cryptoInfoHTML;
};

const delay = (seconds = 1000) => new Promise(res => setTimeout(res, seconds));
let list = [];
let names = [];
const pushNames = async  res => {
    for (let index = 1; index <= 2; index++) {

        await delay();

        const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${key}&per-page=100&page=${index}`).then(data => data.json());
        list.push(res);
    }
    console.log("push names");
};

var checker = (name) => {
    pushNames();
    //for(let i = 0; i <= 1; i++){
        list[0].map( data => names.push(data.id));
    //}
    for(let i = 0; i <= names.length - 1; i++){
        console.log(name.localeCompare(names[i].toString()));
        if(name.localeCompare(names[i].toString()) == 0){
            return true;
        }
    }
    console.log("done");
    return false;
};

const addCoin = () => {
    const inputValue = document.getElementById("inputText").value;
    if(inputValue == ""){
        console.log("what");
    }else{
        console.log(inputValue);
        if(checker(inputValue)){
            console.log("GOOD NAME");
        }else{
            console.log("invalid name");
        }
    }
};