import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  console.log(visibleExpenses);
});

store.dispatch(addExpense({
  description: 'Water bill',
  amount: 800,
  createdAt: 1,
}));

store.dispatch(addExpense({
  description: 'Gas bill',
  amount: 700,
  createdAt: 3,
}));

setTimeout(() => {
  store.dispatch(addExpense({
    description: 'Heat bill',
    amount: 900,
    createdAt: 2,
  }));
}, 3000);

store.dispatch(setTextFilter(''));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
