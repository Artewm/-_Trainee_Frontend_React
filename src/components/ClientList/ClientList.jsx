import './ClientList.css'

const ClientList = ({
  clients,
  onSelectClient,
  selectedClientId
}) => {
  if (clients.length === 0) {
  return (
      <p className="client-list__empty">
        Клиенты не найдены
      </p>
    );
  }

  return (
    <div className="client-list">
      {clients.map((client) => (
       <button
        type="button"
        key={client.id}
        className={`client ${
          selectedClientId === client.id ? 'client--active' : ''
        }`}
        onClick={() => onSelectClient(client.id)}
      >
        <h3>{client.name}</h3>
        <p>{client.phone}</p>
      </button>
      ))}
    </div>
  );
};

export default ClientList;