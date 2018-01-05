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
var calendar = document.getElementById('calendar');
var hourlyOverlayActive = false;
var showHourly = true;

console.log(week);

var updateMonthDisplay = function() {
	if(hourlyOverlayActive) closeHourlyView();
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

var updateHourlyView = function(){
	console.log("Updating Hourly View...");
}

var openDay = function(day) {
	console.log(day);
	if(!showHourly) return;
	if(hourlyOverlayActive) closeHourlyView();

	var node = document.createElement("div");
	node.className = "hourly-overlay";
	node.setAttribute("id", "hourlyView");

	var title = document.createElement("div");
	title.className = "hourly-overlay-title";
	title.innerHTML = "<p>Dia: "+day.dataset.day+" de "+months[calendarDate.month()]+" de "+calendarDate.year()+"</p><a href=\"#\" class=\"hourly-overlay-close\" onclick=\"closeHourlyView();\">x</a>";

	node.appendChild(title);

	var hvContainer = document.createElement("div");
	hvContainer.className = "hourly-view";
	hvContainer.setAttribute('id', 'hourly-view-container');


	for (var i = 0; i < 2; i++){
		var group = document.createElement("div");
		group.className = "hour-group-12";
		for (var j = 0; j < 12; j++) {
			var item = document.createElement("div");
			item.className = "hour";
			item.innerHTML = "<p>"+pad((j + (i * 12)), 2)+":00</p>";
			group.appendChild(item);
		}
		hvContainer.appendChild(group);
	}
	for (var i = 0; i < 4; i++){
		var group = document.createElement("div");
		group.className = "hour-group-6";
		for (var j = 0; j < 6; j++) {
			var item = document.createElement("div");
			item.className = "hour";
			item.innerHTML = "<p>"+pad((j + (i * 6)), 2)+":00</p>";
			group.appendChild(item);
		}
		hvContainer.appendChild(group);
	}

	node.appendChild(hvContainer);
/*
	var hinp = document.createElement("div");
	hinp.className = "hour-inputs";
	hinp.innerHTML = "\
					<div class=\"hour-inputs-inside\">\
						<input type=\"text\" name=\"inicio\" value=\"00:00\">\
						até\
						<input type=\"text\" name=\"fim\" value=\"10:00\">\
						<br>\
						<button>Reservar</button>\
						<button onclick=\"closeHourlyView();\">Cancelar</button>\
					</div>";


	hvContainer.appendChild(hinp);
*/
	calendar.appendChild(node);
	hourlyOverlayActive = true;
	setTimeout(() => {node.classList.add("open");}, 100);
	
}

var closeHourlyView = function(){
	document.getElementById("hourlyView").classList.remove("open");
	setTimeout(() => {
		document.getElementById("hourlyView").outerHTML = '';
		hourlyOverlayActive = false;
	}, 600);
}

nextMonth.onclick = function() {
	calendarDate.add(1, 'M');
	updateMonthDisplay();
};

previousMonth.onclick = function() {
	calendarDate.subtract(1, 'M');
	updateMonthDisplay();
};

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

updateMonthDisplay();