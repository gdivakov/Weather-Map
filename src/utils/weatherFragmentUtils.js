const timeConverter = (UNIX_timestamp) => {
	let a = new Date(UNIX_timestamp * 1000),
		hour = a.getHours(),
		min = a.getMinutes();
	
	hour = hour > 10 ? hour : '0' + hour;
	min = min > 10 ? min : '0' + min;

	const time = hour + ':' + min;
	return time;
}

const getIconSrc = (name) => {
	return `http://openweathermap.org/img/w/${name}.png`
}

const transform = (val) => isNaN(Math.round(val)) ? null : Math.round(val);

export {
	timeConverter,
	getIconSrc,
	transform,	
}