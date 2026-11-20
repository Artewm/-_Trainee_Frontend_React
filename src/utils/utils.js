

// Получаем сегодняшнюю дату в формате YYYY-MM-DD
export const getTodayString = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Проверяем, активен ли абонемент
export const isMembershipActive = (membership) => {
  if (!membership) {
    return false;
  }

  const today = getTodayString();

  // Проверяем дату окончания
  if (membership.endDate < today) {
    return false;
  }

  // Проверяем остаток занятий
  if (membership.visitsLeft === 0) {
    return false;
  }

  return true;
};

export const addDaysToDate = (dateString, days) => {
  const [year, month, day] = dateString.split('-').map(Number);

  const date = new Date(year, month - 1, day);

  date.setDate(date.getDate() + days);

  const resultYear = date.getFullYear();
  const resultMonth = String(date.getMonth() + 1).padStart(2, '0');
  const resultDay = String(date.getDate()).padStart(2, '0');

  return `${resultYear}-${resultMonth}-${resultDay}`;
};