export const dateYYYYMMDDHHMMSS = (input) => {
	let date = new Date(input);
	let year = date.getFullYear();
  	let month = (1 + date.getMonth()).toString();
  	month = month.length > 1 ? month : '0' + month;
  	let day = date.getDate().toString();
  	let hour = date.getHours().toString();
  	hour = hour.length > 1 ? hour : '0' + hour;
  	let minute = date.getMinutes().toString();
  	minute = minute.length > 1 ? minute : '0' + minute;
  	let second = date.getSeconds().toString();
  	second = second.length > 1 ? second : '0' + second;
  	day = day.length > 1 ? day : '0' + day;
  	return year + '-' + month + '-' + day + " "+ hour + ":" + minute + ":" + second;
}