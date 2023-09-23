// StatusOrganizer.jsx
function organizeTicketsByStatus(tickets) {
    const ticketStatus = {
      "Backlog": [],
      "Todo": [],
      "In progress": [],
      "Done": [],
      "Cancelled": []
    };
  
    tickets.forEach(ticket => {
      if (ticketStatus[ticket.status]) {
        ticketStatus[ticket.status].push(ticket);
      }
    });
  
    return ticketStatus;
  }
  
  export default organizeTicketsByStatus;
  