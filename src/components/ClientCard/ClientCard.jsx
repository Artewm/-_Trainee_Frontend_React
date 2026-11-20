import './ClientCard.css'
import { getTodayString, isMembershipActive } from '../../utils/utils';
import SellMembership from '../SellMembership/SellMembership';

const ClientCard = ({ client, plans, onMarkVisit, onSellMembership }) => {
  const membership = client.membership;

  const currentPlan = plans.find(
    (plan) => plan.id === membership?.planId
  );

  const isActive = isMembershipActive(membership);

  const getMembershipStatus = () => {
    if (!membership) {
      return 'Нет абонемента';
    }

    if (!isActive) {
      if (membership.endDate < getTodayString()) {
        return 'Истёк';
      }

      return 'Занятия закончились';
    }

    return 'Активен';
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const sortedVisits = [...client.visits].sort((a, b) => {
    return b.localeCompare(a);
  });

  return (
    <div className="client-card">
      <div className="client-card__header">
        <h2>{client.name}</h2>
        <p>{client.phone}</p>
      </div>

      <div className="client-card__membership">
        <h3>Абонемент</h3>

        {membership ? (
          <>
            <p>
              Тариф: {currentPlan?.title || 'Неизвестный тариф'}
            </p>

            <p>
              Дата окончания: {formatDate(membership.endDate)}
            </p>

            <p>
              Остаток занятий:{' '}
              {membership.visitsLeft === null
                ? 'Безлимит'
                : membership.visitsLeft}
            </p>
          </>
        ) : (
          <p>У клиента нет абонемента</p>
        )}

        <p>Статус: {getMembershipStatus()}</p>
      </div>

      <div className="client-card__visits">
        <h3>История посещений</h3>

        {sortedVisits.length > 0 ? (
          <ul>
            {sortedVisits.map((visit, index) => (
              <li key={`${visit}-${index}`}>
                {formatDate(visit)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Посещений пока нет</p>
        )}
      </div>

      <div className="client-card__actions">
        <button
          disabled={!isActive}
          onClick={() => onMarkVisit(client.id)}
        >
          Отметить посещение
        </button>

        {!isActive && (
          <p className="client-card__hint">
            Нет активного абонемента
          </p>
        )}
      </div>
      <div className="client-card__sale">
        {isActive ? (
          <p>
            У клиента уже есть активный абонемент.
            Продажа нового недоступна.
          </p>
        ) : (
          <SellMembership
            plans={plans}
            onSell={(planId) =>
              onSellMembership(client.id, planId)
            }
          />
        )}
      </div>
    </div>
  );
};

export default ClientCard;