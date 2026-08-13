import React, { useState } from 'react';

function Card({ id, name, email, username, role, isFavorite, onToggleFavorite }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card-container"
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${name} card. Click to ${flipped ? 'see avatar' : 'see details'}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFlipped((f) => !f); }}
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        {/* FRONT */}
        <div className="card-face card-front">
          <img
            src={`https://robohash.org/${id}?150x150`}
            height="120"
            width="120"
            alt={`${name} robot avatar`}
          />
          <h2 className="card-name">{name}</h2>
          <span className={`role-badge role-${role ? role.toLowerCase() : 'engineer'}`}>{role}</span>
          <button
            className={`fav-btn${isFavorite ? ' fav-active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(id); }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        {/* BACK */}
        <div className="card-face card-back">
          <img
            src={`https://robohash.org/${id}?150x150`}
            height="70"
            width="70"
            alt={`${name} robot avatar`}
          />
          <h3 className="card-name">{name}</h3>
          <div className="card-detail">
            <span className="detail-label">Username</span>
            <span className="detail-value">@{username}</span>
          </div>
          <div className="card-detail">
            <span className="detail-label">Email</span>
            <span className="detail-value">{email}</span>
          </div>
          <div className="card-detail">
            <span className="detail-label">Role</span>
            <span className={`role-badge role-${role ? role.toLowerCase() : 'engineer'}`}>{role}</span>
          </div>
          <p className="card-hint">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
