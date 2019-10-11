const convertCurrency = function convertCurrencyFn(from, currency, exchangeRate) {
  const intermediate = from * exchangeRate.rates[currency];
  return Math.round(intermediate * 100) / 100;
};

const exchangeUrl = 'http://localhost:8080/rates';

const getRates = async function getRates() {
  const response = await fetch(exchangeUrl);
  return response.json();
};

export default ({
  namespaced: true,

  state: {
    exchange: {
      data: Object.create(null),
      currencyOptions: Object.create(null),
      status: 'waiting',
    },

    formData: {
      currency: '0',
      amount: '',
      submitValue: '',
    },
  },

  mutations: {
    setAmount(state, value) {
      state.formData.amount = value;
    },

    setActiveCurrency(state, value) {
      state.formData.currency = value;
    },

    setCurrencyOptions(state, value) {
      state.exchange.currencyOptions = value;
    },

    setExchange(state, value) {
      state.exchange.data = value.exchangeData;
      state.exchange.currencyOptions = value.currencies;
      state.exchange.status = value.status;
    },

    submit(state, value) {
      state.formData.submitValue = `R${value}`;
    },
  },

  actions: {
    async refreshExchange({ commit }) {
      const payload = {
        exchangeData: Object.create(null),
        currencies: Object.create(null),
        status: 'waiting',
      };

      try {
        payload.exchangeData = await getRates();
        payload.currencies = Object.keys(payload.exchangeData.rates);

        payload.currencies = payload.currencies.map((item, index) => ({
          text: item,
          value: index.toString(),
        }));

        payload.status = 'downloaded';
      } catch (error) {
        payload.status = 'failed';
      }

      commit('setExchange', payload);
    },

    submitAmount({ state, commit }) {
      const intermediate = parseFloat(state.formData.amount);
      const currencyIndex = state.formData.currency;
      const currency = state.exchange.currencyOptions[parseInt(currencyIndex, 10)].text;

      const result = convertCurrency(intermediate, currency, state.exchange.data);

      commit('submit', result);
    },
  },
});
