import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter; let sortByDate; let sortByAmount; let setStartDate; let setEndDate; let wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />,
  );
});

test('should render ExpenseListFilters with default filters', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alternative filters', () => {
  wrapper.setProps({
    filters: altFilters,
  });

  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const e = {
    target: {
      value: 'hi',
    },
  };

  wrapper.find('input').prop('onChange')(e);

  expect(setTextFilter).toHaveBeenLastCalledWith(e.target.value);
});

test('should sort by date', () => {
  const e = {
    target: {
      value: 'date',
    },
  };

  wrapper.find('select').prop('onChange')(e);

  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const e = {
    target: {
      value: 'amount',
    },
  };

  wrapper.find('select').prop('onChange')(e);

  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const dates = {
    startDate: filters.startDate,
    endDate: filters.endDate,
  };

  wrapper.find('DateRangePicker').prop('onDatesChange')(dates);

  expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate);
});

test('should handle date focus changes', () => {
  wrapper.find('DateRangePicker').prop('onFocusChange')('startDate');

  expect(wrapper.state('calendarFocused')).toBe('startDate');
});
