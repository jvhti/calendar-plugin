moment.locale('pt-br');

var months = moment.months();

var week = moment.weekdays();
var weekShort = moment.weekdaysShort();
var weekMin = moment.weekdaysMin();

var calendarDate = moment();
calendarDate.set('date', 1);

var monthDisplay = document.getElementById('cur-month');
var nextMonth = document.getElementById('next-month');
var previousMonth = document.getElementById('previous-month');
var calendarDays = document.getElementById('calendar-days');
console.log(week);
var updateMonthDisplay = function() {
	console.log("Updating Display...");
	monthDisplay.childNodes[1].innerText = months[calendarDate.month()];
	monthDisplay.childNodes[3].innerText = calendarDate.year();
	updateCalendar();
};

var updateCalendar = function() {
	console.log("Updating Calendar...");
	var weekDays = Array();
	var tmp = [0,1,2,3,4,5,6];
	
	calendarDays.innerHTML = "";

	for (var i = 0; i < 7; i++) {
		var node = document.createElement("div");
		node.className = "day-group";
		weekDays[tmp[i]] = node;

		var header = document.createElement("div");
		header.className = "day-group-header";
		header.innerText = week[tmp[i]];
		node.appendChild(header);

		header = document.createElement("div");
		header.className = "day-group-header only-medium";
		header.innerText = weekShort[tmp[i]];
		node.appendChild(header);

		header = document.createElement("div");
		header.className = "day-group-header only-small";
		header.innerText = weekMin[tmp[i]];
		node.appendChild(header);

		calendarDays.appendChild(node);
	}

	for (var i = 0; i < calendarDate.weekday(); i++) {
		var day = document.createElement("div");
		day.className = "day day-empty";
		weekDays[tmp[i]].appendChild(day);
	}

	for (var i = 0; i < calendarDate.daysInMonth(); i++) {
		var day = document.createElement("div");
		var dayNumber = document.createElement("div");
		day.className = "day ";
		day.dataset.day = i+1;
		day.onclick = (obj) => {openDay(obj.target);};
		var t = Math.random();
		day.className += t > 0.66 ? "day-full" : (t > 0.33 ? "day-medium" : '');

		dayNumber.className = "day-number";
		dayNumber.innerText = i+1;
		day.appendChild(dayNumber);
		weekDays[tmp[(i + calendarDate.weekday()) % 7]].appendChild(day);
	}

	var dayOffset = 0;
	while((calendarDate.daysInMonth() + calendarDate.weekday() + dayOffset) % 7 != 0){
		var day = document.createElement("div");
		day.className = "day day-empty";
		weekDays[tmp[(calendarDate.daysInMonth() + calendarDate.weekday() + dayOffset) % 7]].appendChild(day);

		++dayOffset;
	}
}

var openDay = function(day) {
	alert("Open day "+ day.dataset.day);
}

nextMonth.onclick = function() {
	calendarDate.add(1, 'M');
	updateMonthDisplay();
};

previousMonth.onclick = function() {
	calendarDate.subtract(1, 'M');
	updateMonthDisplay();
};

updateMonthDisplay();