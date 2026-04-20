import { useContext } from 'react';
import { ExpenseContext } from '@/context/expenseContext.js';

export function useExpenses() {
  const ctx = useContext(ExpenseContext);
  if (ctx === null) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return ctx;
}
