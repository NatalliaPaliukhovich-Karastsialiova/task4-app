import React from 'react';
import { useState } from 'react';

export default function UserCard({ user }) {
  const [selected, setSelected] = useState(false);

  return (
    <tr className={user.status === 'blocked' ? 'text-muted text-decoration-line-through' : ''}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => setSelected(!selected)}
        />
      </td>
      <td>
        <strong>{user.name}</strong>
        <div className="text-muted small">{user.first_name || 'N/A'}</div>
        <div className="text-muted small">{user.last_name || 'N/A'}</div>
        <div className="text-muted small">e-mail: {user.email || 'N/A'}</div>
        <div className="small text-muted">Last seen: {user.last_login}</div>
      </td>
    </tr>
  );
}
