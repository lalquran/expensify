import moment from 'moment';

// Get visible expenses using filter
const getVisibleExpenses = (expenses, {
  text, sortBy, startDate, endDate,
}) => expenses.filter((expense) => {
  const createdAtMoment = moment(expense.createdAt);
  const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'date') : true;
  const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

  return startDateMatch && endDateMatch && textMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    return a.createdAt < b.createdAt ? 1 : -1;
  }

  if (sortBy === 'amount') {
    return a.amount < b.amount ? 1 : -1;
  }
});

export default getVisibleExpenses;
