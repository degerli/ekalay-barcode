function startTime() {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var day = today.getDate();
    var monthIndex = today.getMonth();
    var year = today.getFullYear();
    document.getElementById('copyYear').innerHTML = '© '+ year +' eKalay | Kalayaan Residence Hall | Made with &#10084;';
    m = checkTime(m);
    s = checkTime(s);
    day = checkTime(day);
    var ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    h = checkTime(h);
    //m = m < 10 ? '0'+m : m;
    var strTime = '<b>' + h + ':' + m + ':' + s + ' ' + ampm + '</b>&nbsp;<br>' + monthNames[monthIndex] + ' ' + day + ', ' + year;
    document.getElementById('countdown').innerHTML = strTime;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
