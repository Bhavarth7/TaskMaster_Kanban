import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "../Components/Navbar/Navbar";
import Board from "../Components/Board/Board";
import axios from "axios"; 
import createUserLabels from "./Functions/UserLabels";
import organizeTicketsByStatus from "./Functions/StatusOrganizer";
import organizeTicketsByPriority from "./Functions/PriorityOrganizer";
import organizeTicketsByUser from "./Functions/UserOrganizer";
function App() {
  const initialGroupingOption = localStorage.getItem('groupBy') || "status";
  const initialSortingOption = localStorage.getItem('sortBy') || "priority";
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(initialGroupingOption);
  const [sortingOption, setSortingOption] = useState(initialSortingOption);

  const priorityLabels = {
    0:(
      <div className="user-label">
      <img src="https://cdn-icons-png.flaticon.com/128/9974/9974563.png" className='user-pic1' alt="No Priority" />  No Priority
      </div>
    ),  
    1:(
      <div className="user-label">
      <img src="https://cdn-icons-png.flaticon.com/128/6324/6324052.png" className='user-pic2' alt="Urgent" />  Urgent
      </div>
    ),
    2:(
      <div className="user-label">
      <img src={process.env.PUBLIC_URL + "/l.jpg"} className='user-pic' alt="Low" />  Low
      </div>
    ),
    3:(
      <div className="user-label">
      <img src={process.env.PUBLIC_URL + "/m.jpg"} className='user-pic' alt="Medium" />  Medium
      </div>
    ), 
    4:(
      <div className="user-label">
      <img src={process.env.PUBLIC_URL + "/h.jpg"}  className='user-pic' alt="High" />  High
      </div>
    )
  };
  const userLabels=createUserLabels(users);
  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupingOption);
    localStorage.setItem('sortBy',sortingOption);
  }, [groupingOption, sortingOption])

  async function getDetails() {
    try {
      const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      const updatedTickets = data.tickets.map((ticket) => {
        if (ticket.priority === 1) {
          ticket.priority = 2;
        } else if (ticket.priority === 2) {
          ticket.priority = 3;
        } else if (ticket.priority === 3) {
          ticket.priority = 4;
        } else if (ticket.priority === 4) {
          ticket.priority = 1;
        }
        return ticket;
      });
      setTickets(updatedTickets); 
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const sortByPriority = (tickets) => {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  };

  const sortByTitle = (tickets) => {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  const sortedTickets = (tickets) => {
    const sortingFunctions = {
      priority: sortByPriority,
      title: sortByTitle,
    };
  
    const sortingFunction = sortingFunctions[sortingOption];
  
    if (sortingFunction) {
      return sortingFunction(tickets);
    }
  
    return tickets;
  };
  
  const organizeTickets = () => {
    switch (groupingOption) {
      case 'status':
        return organizeTicketsByStatus(tickets);
      case 'priority':
        return organizeTicketsByPriority(tickets);
      case 'user':
        return organizeTicketsByUser(tickets);
      default:
        return {};
    }
  }

  const boards = organizeTickets();

  return (
    <div className="app-container">
      <div className="app-navbar">
        <nav>
          <Navbar
            sortingOption={sortingOption}
            onSortingChange={handleSortingChange}
            groupingOption={groupingOption}
            onGroupingChange={handleGroupingChange}
          />
        </nav>
      </div>
      <div className="app-outer-container">
        <div className="app-boards">
        {Object.keys(boards).map(boardKey => (
            <Board 
              key={boardKey} 
              title={groupingOption === 'priority' ? priorityLabels[boardKey] : 
              groupingOption === "user" ? userLabels[boardKey] : boardKey}
              count={boards[boardKey].length}
              tickets={sortedTickets(boards[boardKey])}
              sortingOption={sortingOption}
              groupingOption={groupingOption} 
              users={users}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;