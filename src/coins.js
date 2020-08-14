const axios = require("axios");

exports.searchSimpleCoin = async function (coin) {
  const response = await axios.get(
    `https://economia.awesomeapi.com.br/json/all/${coin}-BRL`,
  );
  if (response.status == 200) {
   return `${response.data[coin].name}: R$${Number(response.data[coin].high).toFixed(2)}`;
  }
  else {
    return "Não foi possível encontrar o valor";
  }
}

exports.searchCoinToUSD = async function (coin) {
  const response = await axios.get(
    `https://economia.awesomeapi.com.br/json/all/${coin}-BRL,USD-BRL`,
  );
  if (response.status == 200) {
   return `${response.data[coin].name}: U$${(Number(response.data[coin].high)/Number(response.data.USD.high)).toFixed(2)}`;
  }
  else {
    return "Não foi possível encontrar o valor";
  }
}