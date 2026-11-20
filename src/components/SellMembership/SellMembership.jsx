import { useState } from 'react';
import './SellMembership.css';

const SellMembership = ({ plans, onSell }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(
    String(plans[0]?.id ?? '')
  );

  const selectedPlan = plans.find(
    (plan) => plan.id === Number(selectedPlanId)
  );

  return (
    <div className="sell-membership">
      <h3>Продажа абонемента</h3>

      <select
        value={selectedPlanId}
        onChange={(event) => setSelectedPlanId(event.target.value)}
      >
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.title}
          </option>
        ))}
      </select>

      {selectedPlan && (
        <div className="sell-membership__info">
          <p>Стоимость: {selectedPlan.price.toLocaleString('ru-RU')} ₽</p>
          <p>Срок действия: {selectedPlan.days} дней</p>
          <p>
            Количество занятий:{' '}
            {selectedPlan.visits === null
              ? 'Безлимит'
              : selectedPlan.visits}
          </p>
        </div>
      )}

      <button
        disabled={!selectedPlan}
        onClick={() => onSell(selectedPlan.id)}
      >
        Продать
      </button>
    </div>
  );
};

export default SellMembership;