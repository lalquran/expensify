import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper; let editExpense; let removeExpense; let history; let expense;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  expense = expenses[0];
  wrapper = shallow(<EditExpensePage expense={expense} editExpense={editExpense} removeExpense={removeExpense} history={history} />);
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);

  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle onClick', () => {
  wrapper.find('button').prop('onClick')();

  expect(removeExpense).toHaveBeenLastCalledWith(expense.id);
  expect(history.push).toHaveBeenLastCalledWith('/');
});
