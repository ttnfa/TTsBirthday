// Initialize accepted guests array
let acceptedGuests = [];

// Event listener for the home page (make sure there's an element with this ID)
document.getElementById('homePage').addEventListener('click', function () {
  showPage('rsvpPage');
});

// RSVP function
function rsvp(isAccepted) {
  if (isAccepted) {
      const guestName = prompt('Please enter your name:');
      if (guestName) {
          // Send RSVP to the backend
          fetch('http://localhost:3000/api/rsvp', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: guestName }),
          })
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('Failed to save RSVP');
          })
          .then(data => {
              acceptedGuests.push(data.name);
              updateAcceptedList();
              showPage('acceptedPage');
              sendEmail(data.name);
              addToCalendar(data.name);
          })
          .catch(error => {
              alert(error.message);
          });
      }
  } else {
      alert("Sorry you can't attend. We'll miss you! Gifts are still accepted!!!");
      showPage('homePage');
  }
}


// Update accepted guests list
function updateAcceptedList() {
  const list = document.getElementById('acceptedList');
  list.innerHTML = ''; // Clear existing list
  acceptedGuests.forEach((guest) => {
    const listItem = document.createElement('li');
    listItem.textContent = guest;
    list.appendChild(listItem);
  });
}

// Go back to home page
function goHome() {
  showPage('homePage');
}

// Show event info page
function showInfo() {
  showPage('infoPage');
}

// Email sending function (placeholder)
function sendEmail(guestName) {
  // Integrate your email API here
  alert(`An email with event details has been sent to ${guestName}.`);
}

// Add to Google Calendar function (placeholder)
function addToCalendar(guestName) {
  // Integrate Google Calendar API here
  alert('The event has been added to your Google Calendar.');
}

// Helper function to change the displayed page
function showPage(pageId) {
  // Hide all pages (you'll need to implement this)
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // Show the requested page
  document.getElementById(pageId).style.display = 'block';
}
function loadAcceptedGuests() {
  fetch('http://localhost:3000/api/accepted')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load accepted guests');
      }
      return response.json();
    })
    .then(data => {
      acceptedGuests = data.map(guest => guest.name);
      updateAcceptedList();
    })
    .catch(error => console.error('Error loading accepted guests:', error));
}

// Ensure it runs on page load
document.addEventListener('DOMContentLoaded', loadAcceptedGuests);


// Call this function when you want to load the list, for example when showing the acceptedPage
loadAcceptedGuests();


/* MOBILE MENU*/
document.getElementById('mobile-menu').addEventListener('click', function() {
    const menu = document.querySelector('.navbar__menu');
    menu.classList.toggle('active'); // This toggles the active class
});
