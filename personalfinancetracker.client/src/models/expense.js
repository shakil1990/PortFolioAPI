/**
 * @typedef {Object} Expense
 * @property {string} id
 * @property {string} date ISO date YYYY-MM-DD (local calendar day)
 * @property {number} amount
 * @property {string} description
 * @property {string} [category]
 * @property {string} [notes]
 */

/**
 * @param {Date} d
 * @returns {string} YYYY-MM-DD in local time
 */
export function toISODateLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * @param {string} isoDate YYYY-MM-DD
 * @param {number} n
 * @returns {string}
 */
export function addDays(isoDate, n) {
  const [y, mo, d] = isoDate.split('-').map(Number);
  const date = new Date(y, mo - 1, d);
  date.setDate(date.getDate() + n);
  return toISODateLocal(date);
}

/**
 * @param {string} startIso YYYY-MM-DD
 * @param {string} endIso YYYY-MM-DD
 * @returns {string[]}
 */
export function eachDayInclusive(startIso, endIso) {
  const out = [];
  let cur = startIso;
  while (cur <= endIso) {
    out.push(cur);
    cur = addDays(cur, 1);
  }
  return out;
}
