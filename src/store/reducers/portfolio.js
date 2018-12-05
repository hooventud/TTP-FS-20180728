import axios from 'axios';

const GET_PORTFOLIO = 'GET_PORTFOLIO';
const PUT_PORTFOLIO = 'PUT_PORTFOLIO';
const SET_HOLDINGS = 'SET_HOLDINGS';
const SET_PRICES = 'SET_PRICES';
const SET_SYMBOLS = 'SET_SYMBOLS';

const getPortfolio = portfolio => ({ type: GET_PORTFOLIO, portfolio });
const putPortfolio = portfolio => ({ type: PUT_PORTFOLIO, portfolio });
const setHoldings = holdings => ({ type: SET_HOLDINGS, holdings });
const setPrices = prices => ({ type: SET_PRICES, prices });
const setSymbols = symbols => ({ type: SET_SYMBOLS, symbols });

const defaultPortfolio = {
  portfolio: {},
  holdings: {},
  prices: {},
  symbols: []
};

export const getSymbols = holdings => {
  return dispatch => {
    try {
      const tickers = Object.keys(holdings);
      const symbols = tickers.filter(key => {
        return key !== 'cash' && key !== 'user';
      });
      dispatch(setSymbols(symbols));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPrices = symbols => {
  return async dispatch => {
    try {
      const prices = await axios.get(
        `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols.join(
          ','
        )}&types=quote`
      );
      dispatch(setPrices(prices.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHoldings = portfolioId => {
  return async dispatch => {
    try {
      const holdings = await axios.get(
        `/api/portfolio/${portfolioId}/holdings`
      );
      dispatch(setHoldings(holdings.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPortfolio = userId => {
  return async dispatch => {
    try {
      const portfolio = await axios.get(`/api/portfolio/${userId}`);
      dispatch(getPortfolio(portfolio.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePortfolio = (userId, state) => {
  return async dispatch => {
    try {
      const portfolio = await axios.put(`api/portfolio/${userId}`, state);
      dispatch(putPortfolio(portfolio.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return { ...state, portfolio: action.portfolio };
    case PUT_PORTFOLIO:
      return { ...state, portfolio: action.portfolio };
    case SET_HOLDINGS:
      return { ...state, holdings: action.holdings };
    case SET_PRICES:
      return { ...state, prices: action.prices };
    case SET_SYMBOLS:
      return { ...state, symbols: action.symbols };
    default:
      return state;
  }
}
