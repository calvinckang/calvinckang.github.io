document.getElementById('passwordForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  const passwordInput = document.getElementById('passwordInput').value;
  const correctPassword = 'shockedcat';

  if (passwordInput === correctPassword) {
      document.getElementById('protectedContent').style.display = 'grid';
      document.getElementById('passwordForm').style.display = 'none';
  } else {
      alert('Incorrect password');
  }
});