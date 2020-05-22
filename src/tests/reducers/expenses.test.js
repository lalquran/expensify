import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default expense values', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expenses with valid id', () => {
  const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '2' });

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses with invalid id', () => {
  const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '-1' });

  expect(state).toEqual(expenses);
});

test('should add expense', () => {
  const expense = {
    id: '4',
    description: 'Bill',
    note: '',
    amount: 4000,
    createdAt: moment(0).add(8, 'days').valueOf(),
  };

  const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense });
  expect(state).toEqual([...expenses, expense]);
});

test('should edit existing expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[2].id,
    updates: { amount: 0 },
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[1], {
    ...expenses[2],
    amount: 0,
  }]);
});

test('should not edit non-existent expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount: 0,
    },
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
