import React from 'react';
import "./Board.css";
import { MoreHorizontal, Plus } from 'react-feather';
import Card from '../Card/Card';

const logoImages = {
  "Backlog": "https://cdn-icons-png.flaticon.com/128/10905/10905332.png",
  "Todo": "https://cdn-icons-png.flaticon.com/128/446/446163.png",
  "In progress": "https://cdn-icons-png.flaticon.com/128/5460/5460873.png",
  "Done": "https://cdn-icons-png.flaticon.com/128/5461/5461184.png",
  "Cancelled": "https://cdn-icons-png.flaticon.com/128/1008/1008968.png"
};

const Board = (props) => {
  const { title, count, tickets, groupingOption, users } = props;

  return (
    <div className='board'>
      <div className='board-top'>
        <div className='board-top-left'>
          {groupingOption === "status" && <img src={logoImages[title]} className='logo-pic' alt={title} />}
          <p className='board-title bold'>{title}</p>
          <span className='board-count'>{count}</span>
        </div>
        <div className='board-top-right'>
          <MoreHorizontal className='icon' />
          <Plus className='icon' />
        </div>
      </div>
      <div className='card-container'>
        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} groupBy={groupingOption} users={users} />
        ))}
      </div>
    </div>
  );
};

export default Board;
