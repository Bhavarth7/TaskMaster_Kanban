import React from 'react';
import "./Card.css";
import { MoreHorizontal } from 'react-feather';

const Card = (props) => {
  const { ticket, users, groupBy } = props;

  const logoImages = {
    "Backlog": "https://cdn-icons-png.flaticon.com/128/10905/10905332.png",
    "Todo": "https://cdn-icons-png.flaticon.com/128/446/446163.png",
    "In progress": "https://cdn-icons-png.flaticon.com/128/5460/5460873.png",
    "Done": "https://cdn-icons-png.flaticon.com/128/5461/5461184.png",
    "Cancelled": "https://cdn-icons-png.flaticon.com/128/1008/1008968.png"
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[1] : '';
    const initials = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
    return initials.toUpperCase();
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const user = getUserById(ticket.userId);
  const initials = user ? getInitials(user.name) : '';

  return (
    <div className='card'>
      <div className='card-top'>
        <p className='card-title'>{ticket.id}</p>
        {groupBy !== 'user' && (
          <div
            className="user-pic"
            style={{
              backgroundColor: getRandomColor()
            }}
          >
            {initials}
          </div>
        )}
      </div>
      <div className='card-middle'>
        {groupBy !== 'status' && <img src={logoImages[ticket.status]} className='logo-pic' alt={ticket.status} />}
        <p className='card-desc bold'>
          {ticket.title}
        </p>
      </div>
      <div className='card-bottom'>
        {groupBy !== 'priority' && (
          <div className='component-1 pointer'>
            <MoreHorizontal className='icon' />
          </div>
        )}
        <div className='component-2 pointer'>
          <img
            src="https://cdn-icons-png.flaticon.com/128/5720/5720434.png"
            className='icon'
            alt='logo'
          />
          <p>{ticket.tag[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
