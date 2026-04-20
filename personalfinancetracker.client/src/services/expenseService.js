import { eachDayInclusive } from '@/models/expense.js';

/**
 * @typedef {import('@/models/expense.js').Expense} Expense
 */

/**
 * @typedef {Object} ExpenseInput
 * @property {string} date ISO YYYY-MM-DD
 * @property {number} amount
 * @property {string} description
 * @property {string} [category]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} DailyTotalRow
 * @property {string} date
 * @property {number} total
 * @property {number} count
 * @property {Expense[]} expenses
 */

/**
 * @param {ExpenseInput} input
 * @returns {Expense}
 */
function buildExpense(input) {
  return {
    id: crypto.randomUUID(),
    date: input.date,
    amount: Number(input.amount),
    description: input.description.trim(),
    ...(input.category !== undefined && input.category !== ''
      ? { category: input.category }
      : {}),
    ...(input.notes !== undefined && input.notes !== '' ? { notes: input.notes } : {}),
  };
}

/**
 * @param {Expense[]} expenses
 * @param {ExpenseInput} input
 * @returns {{ list: Expense[], created: Expense }}
 */
export function addExpense(expenses, input) {
  const created = buildExpense(input);
  return { list: [...expenses, created], created };
}

/**
 * @param {Expense[]} expenses
 * @param {string} startIso
 * @param {string} endIso
 * @returns {Expense[]}
 */
export function getExpensesInRange(expenses, startIso, endIso) {
  return expenses.filter((e) => e.date >= startIso && e.date <= endIso);
}

/**
 * @param {Expense[]} expenses
 * @param {string} startIso
 * @param {string} endIso
 * @returns {DailyTotalRow[]}
 */
export function getDailyTotals(expenses, startIso, endIso) {
  const days = eachDayInclusive(startIso, endIso);
  return days.map((date) => {
    const dayExpenses = expenses.filter((e) => e.date === date);
    const total = dayExpenses.reduce((sum, e) => sum + e.amount, 0);
    return {
      date,
      total,
      count: dayExpenses.length,
      expenses: dayExpenses,
    };
  });
}
