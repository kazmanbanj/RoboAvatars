import React from 'react';
import Card from './Card';

function CardList({ robots, favorites, onToggleFavorite }) {
  return (
    <div className="card-grid">
      {robots.map((robot) => (
        <Card
          key={robot.id}
          id={robot.id}
          name={robot.name}
          email={robot.email}
          username={robot.username}
          role={robot.role}
          isFavorite={favorites.includes(robot.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default CardList;
