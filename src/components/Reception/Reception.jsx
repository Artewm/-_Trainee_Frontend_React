import './Reception.css'
import { useState } from "react";
import ClientList from "../ClientList/ClientList"
import { plans, initialClients }from "../../data/data"
import Search from "../Search/Search";
import ClientCard from "../ClientCard/ClientCard";
import { getTodayString, isMembershipActive, addDaysToDate } from '../../utils/utils';

const Reception = () => {
    
const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(null);

  const filteredClients = clients.filter((client) => {
    const query = search.trim().toLowerCase();

    const clientName = client.name.toLowerCase();
    const clientPhone = client.phone.replace(/\D/g, '');
    const searchPhone = query.replace(/\D/g, '');

    return (
      clientName.includes(query) ||
      (searchPhone.length > 0 && clientPhone.includes(searchPhone))
    );
  });

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId
  );

  // Отмечаем посещение
  const handleMarkVisit = (clientId) => {
    const today = getTodayString();

    setClients((prevClients) =>
      prevClients.map((client) => {
        // Если это не выбранный клиент — оставляем без изменений
        if (client.id !== clientId) {
          return client;
        }

        // Проверяем активность абонемента
        if (!isMembershipActive(client.membership)) {
          return client;
        }

        return {
          ...client,

          // Обновляем абонемент
          membership: {
            ...client.membership,

            // У безлимита null остаётся null
            visitsLeft:
              client.membership.visitsLeft === null
                ? null
                : client.membership.visitsLeft - 1,
          },

          // Добавляем сегодняшнюю дату в историю
          visits: [...client.visits, today],
        };
      })
    );
  };

  const handleSellMembership = (clientId, planId) => {
  const selectedPlan = plans.find(
    (plan) => plan.id === planId
  );

  if (!selectedPlan) return;

  const today = getTodayString();

  const endDate = addDaysToDate(
    today,
    selectedPlan.days
  );

  setClients((prevClients) =>
    prevClients.map((client) => {
      if (client.id !== clientId) {
        return client;
      }

      // Не разрешаем продавать второй активный абонемент
      if (isMembershipActive(client.membership)) {
        return client;
      }

      return {
        ...client,

        membership: {
          planId: selectedPlan.id,
          startDate: today,
          endDate: endDate,
          visitsLeft: selectedPlan.visits
        }
      };
    })
  );
};

  return (
    <div className="reception">
        <header className="reception__header">
        <h1>Ресепшен</h1>
        </header>

        <div className="reception__content">
        <aside className="reception__sidebar">
            <Search
            value={search}
            onChange={setSearch}
            />

            <ClientList
            clients={filteredClients}
            onSelectClient={setSelectedClientId}
            selectedClientId={selectedClientId}
            />
        </aside>

        <main className="reception__main">
            {selectedClient && (
            <ClientCard
                key={selectedClient.id}
                client={selectedClient}
                plans={plans}
                onMarkVisit={handleMarkVisit}
                onSellMembership={handleSellMembership}
            />
            )}
        </main>
        </div>
    </div>
    );
}
export default Reception