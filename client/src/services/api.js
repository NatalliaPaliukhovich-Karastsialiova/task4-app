const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async userData => {
  const res = await fetch(`${API_URL}/api/v1/auth/web/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  return { ok: res.ok, data };
};

export const loginUser = async credentials => {
  const res = await fetch(`${API_URL}/api/v1/auth/web/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  return { ok: res.ok, data };
};

export const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/v1/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
};

export const batchUsersUpdate = async payload => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/api/v1/users/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
};
