// UserLabels.jsx
import React from 'react';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createUserLabels(users) {
  return users.reduce((labels, user) => {
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[1] : '';
    const firstLetterFirstName = firstName.charAt(0).toUpperCase();
    const firstLetterLastName = lastName.charAt(0).toUpperCase();
    const randomColor = getRandomColor();
    labels[user.id] = (
      <div className="user-label" key={user.id}>
        <div
          className="user-pic"
          style={{
            backgroundColor: randomColor,
          }}
        >
          {firstLetterFirstName}
          {lastName && ` ${firstLetterLastName}`}
        </div>
        {user.name}
      </div>
    );
    return labels;
  }, {});
}

export default createUserLabels;
