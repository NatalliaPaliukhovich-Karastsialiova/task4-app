document.getElementById('register-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = new FormData(e.target);
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: form.get('email'),
      password: form.get('password')
    })
  });
  const data = await res.json();
  console.log(data);
});
