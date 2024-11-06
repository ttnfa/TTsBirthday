const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const dataFilePath = './guestList.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility function to read the guest list file
function readGuestList() {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

// Utility function to write to the guest list file
function writeGuestList(guests) {
    fs.writeFileSync(dataFilePath, JSON.stringify(guests, null, 2));
}

// API route to accept RSVP
app.post('/api/rsvp', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    // Read current list and add new guest
    let guests = readGuestList();
    guests.push({ name, accepted: true });

    // Write updated list back to file
    writeGuestList(guests);

    res.status(201).json({ name });
});

// API route to get accepted guests
app.get('/api/accepted', (req, res) => {
    const guests = readGuestList();
    const acceptedGuests = guests.filter(guest => guest.accepted);
    res.status(200).json(acceptedGuests);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
