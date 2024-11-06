// Initialize accepted guests array
let guests = [];

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
              guests.push(data.name);
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
  guests.forEach((guest) => {
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

document.addEventListener('DOMContentLoaded', function() {
  // Load the accepted guests when the page loads
  loadAcceptedGuests();

  // Event listener for the RSVP function (this part is working as intended)
  document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission
    const guestName = document.getElementById('guestName').value;
    if (guestName) {
      fetch('http://localhost:3000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: guestName }),
      })
      .then(response => response.json())
      .then(data => {
        alert('RSVP accepted: ' + data.name);
        loadAcceptedGuests();  // Reload the list of accepted guests after RSVP
      })
      .catch(err => console.error('Error submitting RSVP:', err));
    } else {
      alert('Please enter a name');
    }
  });
});

// Function to load the list of accepted guests from the backend
function loadAcceptedGuests() {
  fetch('/guestList.json')  // Make sure the path to the file is correct
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('guestList');
      list.innerHTML = '';  // Clear any previous content

      // Ensure the data is in the expected format (an array of guests)
      if (Array.isArray(data)) {
        data.forEach(guest => {
          const listItem = document.createElement('li');
          listItem.textContent = guest.name;  // Adjust based on your JSON structure
          list.appendChild(listItem);
        });
      } else {
        alert('No guests found in the file');
      }
    })
    .catch(error => {
      console.error('Error loading guest list:', error);
      alert('Failed to load guest list');
    });
}

document.getElementById('loadGuestList').addEventListener('click', function() {
  fetch('guestList.json')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('guestList');
      list.innerHTML = '';  // Clear existing list

      // Check if data is an array and display it
      if (Array.isArray(data)) {
        data.forEach(guest => {
          const listItem = document.createElement('li');
          listItem.textContent = guest.name;  // Adjust this based on your JSON structure
          list.appendChild(listItem);
        });
      } else {
        alert('No guests found in the file');
      }
    })
    .catch(error => {
      console.error('Error loading guest list:', error);
      alert('Failed to load guest list');
    });
});

/* MOBILE MENU */
document.getElementById('mobile-menu').addEventListener('click', function() {
    const menu = document.querySelector('.navbar__menu');
    menu.classList.toggle('active'); // This toggles the active class
});
