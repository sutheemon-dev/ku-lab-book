
//---------------calendar---------------//
let currentDate = new Date('2025-04-01');
const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date('2025-04-01');
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    document.getElementById('month-year').textContent = `${months[month]} ${year + 543}`;

    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = `
                <div class="day-name">จ</div>
                <div class="day-name">อ</div>
                <div class="day-name">พ</div>
                <div class="day-name">พฤ</div>
                <div class="day-name">ศ</div>
                <div class="day-name">ส</div>
                <div class="day-name">อา</div>
            `;

    let dayCounter = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < 42; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        if (i < firstDay) {
            dayDiv.classList.add('other-month');
            dayDiv.textContent = prevMonthDays - (firstDay - i - 1);
        } else if (dayCounter <= daysInMonth) {
            dayDiv.textContent = dayCounter;
            if (year === today.getFullYear() && month === today.getMonth() && dayCounter === today.getDate()) {
                dayDiv.classList.add('today');
            }
            dayCounter++;
        } else {
            dayDiv.classList.add('other-month');
            dayDiv.textContent = nextMonthDay++;
        }
        calendarDays.appendChild(dayDiv);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

renderCalendar();
//---------------EDN---------------//
