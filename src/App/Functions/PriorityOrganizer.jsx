// PriorityOrganizer.jsx
function organizeTicketsByPriority(tickets) {
    const priorityStatus = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    };
  
    tickets.forEach(ticket => {
      if (priorityStatus[ticket.priority]) {
        priorityStatus[ticket.priority].push(ticket);
      }
    });
  
    return priorityStatus;
  }
  
  export default organizeTicketsByPriority;
  