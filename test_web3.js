fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify({
    access_key: 'ed6e35c1-04e9-492a-a44e-0e98c5a19cc7',
    name: 'Test Name',
    email: 'test@example.com',
    message: 'This is a test message from node'
  })
}).then(res => res.text()).then(console.log).catch(console.error);
