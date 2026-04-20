import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toISODateLocal } from '@/models/expense.js';
import { useExpenses } from '@/context/useExpenses.js';

export default function AddExpensePage() {
  const { addExpense } = useExpenses();
  const navigate = useNavigate();
  const [date, setDate] = useState(() => toISODateLocal(new Date()));
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(/** @type {string | null} */ (null));

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const trimmed = description.trim();
    if (!trimmed) {
      setError('Description is required.');
      return;
    }

    const n = Number.parseFloat(amount);
    if (!Number.isFinite(n) || n <= 0) {
      setError('Enter a positive amount.');
      return;
    }

    addExpense({
      date,
      amount: n,
      description: trimmed,
    });

    navigate(`/expenses?date=${encodeURIComponent(date)}`);
  }

  return (
    <div className="expense-page expense-add">
      <header className="expense-page__header">
        <h1 className="expense-page__title">Add expense</h1>
        <p className="expense-page__lede">
          Record a purchase for a specific calendar day.
        </p>
      </header>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        {error ? (
          <p className="expense-form__error" role="alert">
            {error}
          </p>
        ) : null}

        <label className="expense-field">
          <span className="expense-field__label">Date</span>
          <input
            type="date"
            className="expense-field__input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            aria-required="true"
            aria-label="Expense date"
          />
        </label>

        <label className="expense-field">
          <span className="expense-field__label">Amount</span>
          <input
            type="number"
            className="expense-field__input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            aria-label="Amount in dollars"
          />
        </label>

        <label className="expense-field">
          <span className="expense-field__label">Description</span>
          <input
            type="text"
            className="expense-field__input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            aria-label="Expense description"
          />
        </label>

        <div className="expense-form__actions">
          <button type="submit" className="expense-button expense-button--primary">
            Save expense
          </button>
          <Link className="expense-button expense-button--ghost" to="/expenses">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
