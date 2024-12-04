// Previous code remains the same until the calendar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Previous code remains exactly the same...

    // Calendar functionality
    function showCalendar() {
        const modal = document.getElementById('calculatorModal');
        const modalContent = modal.querySelector('.modal-content');
        
        // Clear previous content
        modalContent.innerHTML = '<span class="close-modal">&times;</span>';
        
        // Create calendar content
        const calendarDiv = document.createElement('div');
        calendarDiv.className = 'calendar-container';
        
        // Add calendar header
        const header = document.createElement('div');
        header.className = 'calendar-header';
        const currentDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        header.innerHTML = `
            <button class="calendar-nav" id="prevMonth">&lt;</button>
            <h2>${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</h2>
            <button class="calendar-nav" id="nextMonth">&gt;</button>
        `;
        calendarDiv.appendChild(header);

        // Add day labels
        const daysHeader = document.createElement('div');
        daysHeader.className = 'calendar-days-header';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            daysHeader.appendChild(dayDiv);
        });
        calendarDiv.appendChild(daysHeader);

        // Add calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Get first day of month and total days
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();

        // Add empty cells for days before start of month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = day;
            
            // Highlight current day
            if (day === currentDate.getDate()) {
                dayDiv.classList.add('current-day');
            }

            // Add click event for scheduling
            dayDiv.addEventListener('click', function() {
                const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                showScheduleForm(selectedDate);
            });

            calendarGrid.appendChild(dayDiv);
        }

        calendarDiv.appendChild(calendarGrid);

        // Add event section
        const eventSection = document.createElement('div');
        eventSection.className = 'calendar-events';
        eventSection.innerHTML = `
            <h3>Upcoming Events</h3>
            <div class="event-list">
                <div class="no-events">No events scheduled</div>
            </div>
        `;
        calendarDiv.appendChild(eventSection);

        modalContent.appendChild(calendarDiv);

        // Add event listeners for navigation
        document.getElementById('prevMonth').addEventListener('click', () => navigateMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => navigateMonth(1));

        // Show the modal
        modal.style.display = 'block';

        // Add event listener to new close button
        const newCloseBtn = modalContent.querySelector('.close-modal');
        newCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    function showScheduleForm(date) {
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const modal = document.getElementById('calculatorModal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <div class="schedule-form">
                <h2>Schedule Event for ${formattedDate}</h2>
                <div class="input-group">
                    <label for="eventTitle">Event Title</label>
                    <input type="text" id="eventTitle" placeholder="Enter event title">
                </div>
                <div class="input-group">
                    <label for="eventTime">Time</label>
                    <input type="time" id="eventTime">
                </div>
                <div class="input-group">
                    <label for="eventType">Event Type</label>
                    <select id="eventType">
                        <option value="showing">Property Showing</option>
                        <option value="meeting">Client Meeting</option>
                        <option value="inspection">Property Inspection</option>
                        <option value="closing">Closing</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="eventNotes">Notes</label>
                    <textarea id="eventNotes" placeholder="Add any additional notes"></textarea>
                </div>
                <button class="schedule-btn">Schedule Event</button>
                <button class="back-to-calendar">Back to Calendar</button>
            </div>
        `;

        // Add event listeners
        modalContent.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modalContent.querySelector('.back-to-calendar').addEventListener('click', () => {
            showCalendar();
        });

        modalContent.querySelector('.schedule-btn').addEventListener('click', () => {
            const title = document.getElementById('eventTitle').value;
            const time = document.getElementById('eventTime').value;
            const type = document.getElementById('eventType').value;
            const notes = document.getElementById('eventNotes').value;

            if (title && time) {
                alert(`Event scheduled:\n${title}\n${formattedDate} at ${time}\nType: ${type}\nNotes: ${notes}`);
                showCalendar();
            } else {
                alert('Please enter a title and time for the event.');
            }
        });
    }

    function navigateMonth(direction) {
        // Implementation for month navigation
        showCalendar(); // Refresh calendar view
    }

    // Add calendar button click handler
    const calendarButton = document.querySelector('.nav-item:has(.icon:contains("📅"))');
    if (calendarButton) {
        calendarButton.addEventListener('click', function(e) {
            e.preventDefault();
            showCalendar();
        });
    }

    // Previous code remains exactly the same...
});
