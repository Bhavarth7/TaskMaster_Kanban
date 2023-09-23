// UserOrganizer.jsx
function organizeTicketsByUser(tickets) {
    const userStatus = {
      "usr-1": [],
      "usr-2": [],
      "usr-3": [],
      "usr-4": [],
      "usr-5": []
    };
  
    tickets.forEach(ticket => {
      if (userStatus[ticket.userId]) {
        userStatus[ticket.userId].push(ticket);
      }
    });
  
    return userStatus;
  }
  
  export default organizeTicketsByUser;
  