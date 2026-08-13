import React, { useState } from 'react';

const ROLES = ['Engineer', 'Designer', 'Manager', 'Analyst'];

function AddRobotModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    role: 'Engineer',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email.';
    }
    if (!form.username.trim()) errs.username = 'Username is required.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAdd(form);
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <h2 id="modal-title">Add New Robot</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Ada Lovelace"
              autoFocus
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. ada.love"
            />
            {errors.username && <span className="form-error">{errors.username}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. ada@robomail.io"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Robot</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRobotModal;
