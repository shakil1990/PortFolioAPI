import { useCallback, useMemo, useState } from 'react';
import { ExpenseContext } from '@/context/expenseContext.js';
import {
  addExpense as appendExpense,
  getDailyTotals as computeDailyTotals,
  getExpensesInRange as filterExpensesInRange,
} from '@/services/expenseService.js';

/**
 * @typedef {import('@/models/expense.js').Expense} Expense
 */

/**
 * @param {{ children: React.ReactNode }} props
 */
export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(
    /** @type {Expense[]} */ ([])
  );

  const addExpense = useCallback((input) => {
    /** @type {Expense | undefined} */
    let created;
    setExpenses((prev) => {
      const next = appendExpense(prev, input);
      created = next.created;
      return next.list;
    });
    return /** @type {Expense} */ (created);
  }, []);

  const getExpensesInRange = useCallback(
    (startIso, endIso) => filterExpensesInRange(expenses, startIso, endIso),
    [expenses]
  );

  const getDailyTotals = useCallback(
    (startIso, endIso) => computeDailyTotals(expenses, startIso, endIso),
    [expenses]
  );

  const value = useMemo(
    () => ({
      expenses,
      addExpense,
      getExpensesInRange,
      getDailyTotals,
    }),
    [expenses, addExpense, getExpensesInRange, getDailyTotals]
  );

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}
