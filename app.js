const rates = document.getElementById("rates");
const key = '68729acf9d43e1af7e81f024ae29a72163fd6a09';
const coins = ['BTC', 'ETH', 'ADA', 'BNB', 'USDT'];
const promises = [];
let list = [];
let namesCache = [];

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
async function pushNames() {

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    for (let index = 1; index <= 8; index++) {
        await delay(1100);
        const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${key}&per-page=100&page=${index}`).then(data => data.json());
        list.push(res);
    }  

    list.map((data) => {   
        data.map( (info) => {
            namesCache.push(info.id);
        });
    });

    const buttonSpot = document.getElementById("button-spot");
    buttonSpot.innerHTML = `
        <button class="add-button" type="button" value="ADD COIN" onclick="addCoin()"><b>ADD COIN</b></button>
        <input class="input-box" type="text" id="inputText" placeholder="enter crypto abbrevation">
    `

    console.log("pushnames complete");
};


var checker = (name) => {
    for(let i = 0; i < namesCache.length; i++){
        if(name == namesCache[i]){
            return true;
        }
    }
    return false;
};

const addCoin = () => {
    const inputValue = document.getElementById("inputText").value;
    if(inputValue == ""){
        console.log("what");
    }else{
        console.log(inputValue);
        if(checker(inputValue)){
            coins.push(inputValue);
            FetchRates();
            console.log("GOOD NAME");
        }else{

            console.log("invalid name");
        }
    }
};

pushNames();
FetchRates();