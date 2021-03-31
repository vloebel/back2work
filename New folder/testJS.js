var dropdowns = document.querySelectorAll('.dropdown-trigger')
for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i]);
}

$(function () {
  $('#meeting-date-time').ejDateTimePicker({
    interval: 30,
    dateTimeFormat: "yyyy/MM/dd HH:mm",
    highlightWeekend:true, // highlight the weekend in DatePicker calendar
    width: '180px',
    value: new Date(),
    minDateTime: "now 9:00",
    maxDateTime: "now 17:00"
  });
});