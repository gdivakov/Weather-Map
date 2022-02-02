import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {Paper} from '@material-ui/core'
import {
	timeConverter,
	getIconSrc,
	transform,
} from '../utils/weatherFragmentUtils'
import '../css/weatherFragment.css'

class WeatherFragment extends React.Component {

	render() {
		const { classes, weather } = this.props;

		const temp = transform(weather.getIn(['main', 'temp'])-273.15),
			windSpeed = transform(weather.getIn(['wind', 'speed'])) + ' (m/s)',
			windDegree = transform(weather.getIn(['wind', 'deg'])) + '°',
			humidity = transform(weather.getIn(['main', 'humidity'])) + '%',
			pressure = transform(weather.getIn(['main', 'pressure'])) + ' hPa',
			cloudiness = transform(weather.getIn(['clouds', 'all'])) + '%';

		return (
			<div id='main'>
				<Paper square={false} elevation={2} className={classes.paper}>

				<Typography id="weather-desc">
					{weather.getIn(['weather', 0, 'description'])}
				</Typography>

				<Typography>
					<span>
						<img 
							className="weather-icon" 
							src={getIconSrc(weather.getIn(['weather', 0, 'icon']))} 
							alt={weather.get('weather', 0, 'description')} />
						<span className="temp">{temp}</span>
						<span className="celsius" aria-label="°Celsius" aria-disabled="true" role="button">°C</span>
					</span>
				</Typography>

				<Typography className={classes.sunBlock}>
					<img className="sun-img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZDMTA3OyIgZD0iTTQxNiwzMjBjMC4wNzksNDEuODM4LTE2LjIzMiw4Mi4wNDQtNDUuNDQsMTEyaC00My44NGwtNTkuNTItNTkuMiAgYy01Ljg4My02LjE4Ni0xNS42NjYtNi40MzEtMjEuODUxLTAuNTQ5Yy0wLjE4OCwwLjE3OC0wLjM3LDAuMzYxLTAuNTQ5LDAuNTQ5TDE4NS4yOCw0MzJoLTQzLjg0ICBjLTYxLjY4OC02My4yNy02MC40MDUtMTY0LjU2OCwyLjg2NS0yMjYuMjU2czE2NC41NjgtNjAuNDA1LDIyNi4yNTYsMi44NjVDMzk5LjYyMSwyMzguNDE0LDQxNS45MjEsMjc4LjM3Miw0MTYsMzIweiIvPgo8cGF0aCBkPSJNNDk2LDQ0OEgzMjBjLTQuMjQ2LDAuMDA4LTguMzIyLTEuNjczLTExLjMyOC00LjY3MkwyNTYsMzkwLjYyNGwtNTIuNjcyLDUyLjcwNGMtMy4wMDYsMi45OTktNy4wODIsNC42OC0xMS4zMjgsNC42NzJIMTYgIGMtOC44MzcsMC0xNi03LjE2My0xNi0xNnM3LjE2My0xNiwxNi0xNmgxNjkuMzc2bDU5LjI5Ni01OS4zMjhjNi4yNC02LjI1NiwxNi4zNzEtNi4yNjksMjIuNjI3LTAuMDI5ICBjMC4wMSwwLjAxLDAuMDE5LDAuMDE5LDAuMDI5LDAuMDI5TDMyNi42MjQsNDE2SDQ5NmM4LjgzNywwLDE2LDcuMTYzLDE2LDE2UzUwNC44MzcsNDQ4LDQ5Niw0NDh6Ii8+CjxwYXRoIGQ9Ik0zOTEuNjgsMzg0Yy0xLjg1NiwwLjAwOS0zLjY5OS0wLjMxNy01LjQ0LTAuOTZjLTguMzA0LTMuMDA3LTEyLjYwMS0xMi4xNzQtOS42LTIwLjQ4YzQuOTE0LTEzLjY1LDcuNDA1LTI4LjA1Myw3LjM2LTQyLjU2ICBjMC03MC42OTItNTcuMzA4LTEyOC0xMjgtMTI4cy0xMjgsNTcuMzA4LTEyOCwxMjhjLTAuMDQ1LDE0LjUwNywyLjQ0NiwyOC45MSw3LjM2LDQyLjU2YzIuNzY5LDguMzkxLTEuNzg4LDE3LjQzOS0xMC4xNzksMjAuMjA4ICBjLTguMDU4LDIuNjU5LTE2Ljc5LTEuNDM0LTE5LjkwMS05LjMyOEM5OS4wOTEsMzU2LjMwNSw5NS45NSwzMzguMjE4LDk2LDMyMGMwLTg4LjM2Niw3MS42MzQtMTYwLDE2MC0xNjBzMTYwLDcxLjYzNCwxNjAsMTYwICBjMC4wNSwxOC4yMTgtMy4wOTEsMzYuMzA1LTkuMjgsNTMuNDRDNDA0LjQzLDM3OS43NzUsMzk4LjQxNiwzODMuOTk3LDM5MS42OCwzODR6Ii8+CjxwYXRoIGQ9Ik0yNTYsMTI4Yy04LjgzNywwLTE2LTcuMTYzLTE2LTE2VjgwYzAtOC44MzcsNy4xNjMtMTYsMTYtMTZjOC44MzcsMCwxNiw3LjE2MywxNiwxNnYzMkMyNzIsMTIwLjgzNywyNjQuODM3LDEyOCwyNTYsMTI4eiIvPgo8cGF0aCBkPSJNNDgsMzM2SDE2Yy04LjgzNywwLTE2LTcuMTYzLTE2LTE2czcuMTYzLTE2LDE2LTE2aDMyYzguODM3LDAsMTYsNy4xNjMsMTYsMTZTNTYuODM3LDMzNiw0OCwzMzZ6Ii8+CjxwYXRoIGQ9Ik00OTYsMzM2aC0zMmMtOC44MzcsMC0xNi03LjE2My0xNi0xNnM3LjE2My0xNiwxNi0xNmgzMmM4LjgzNywwLDE2LDcuMTYzLDE2LDE2UzUwNC44MzcsMzM2LDQ5NiwzMzZ6Ii8+CjxwYXRoIGQ9Ik0xMDguOCwxODguOGMtNC4yNTEtMC4wMDEtOC4zMjctMS42OTMtMTEuMzI4LTQuNzA0bC0yMi42MjQtMjIuNTkyYy02LjM1Ni02LjEzOS02LjUzMi0xNi4yNjgtMC4zOTMtMjIuNjI0ICBjNi4xMzktNi4zNTYsMTYuMjY4LTYuNTMyLDIyLjYyNC0wLjM5M2MwLjEzMywwLjEyOSwwLjI2NCwwLjI2LDAuMzkzLDAuMzkzbDIyLjYyNCwyMi41OTJjNi4yNTYsNi4yNCw2LjI2OSwxNi4zNzEsMC4wMjksMjIuNjI3ICBDMTE3LjEyNCwxODcuMTA4LDExMy4wNDksMTg4Ljc5OSwxMDguOCwxODguOHoiLz4KPHBhdGggZD0iTTQwMy4yLDE4OC44Yy04LjgzNy0wLjAwMi0xNS45OTgtNy4xNjctMTUuOTk3LTE2LjAwM2MwLjAwMS00LjI0OSwxLjY5Mi04LjMyNCw0LjcwMS0xMS4zMjVsMjIuNjI0LTIyLjU5MiAgYzYuMTM5LTYuMzU2LDE2LjI2OC02LjUzMiwyMi42MjQtMC4zOTRjNi4zNTYsNi4xMzksNi41MzIsMTYuMjY4LDAuMzk0LDIyLjYyNGMtMC4xMjksMC4xMzMtMC4yNiwwLjI2NS0wLjM5NCwwLjM5NGwtMjIuNjI0LDIyLjU5MiAgQzQxMS41MjcsMTg3LjEwNyw0MDcuNDUxLDE4OC43OTksNDAzLjIsMTg4Ljh6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" alt="sunrise"/>
					<span className="sun-time">
						{timeConverter(weather.getIn(['sys', 'sunrise']))}
					</span>
				</Typography>

				<Typography className={classes.sunBlock}>
					<img className="sun-img" src="https://png.icons8.com/cotton/50/000000/sunset.png" alt="sunset" />
					<span className="sun-time">
						{timeConverter(weather.getIn(['sys', 'sunset']))}
					</span>
				</Typography>

				</Paper>

				<Paper square={false} elevation={2} className={classes.paper}>
					<Typography className={classes.secHead}>
						Wind:
					</Typography>
					<Typography className={classes.other}>
						Speed: {windSpeed} 
					</Typography>
					<Typography className={classes.other}>
						Direction: {windDegree}
					</Typography>     
				</Paper>  

				<Paper square={false} elevation={2} className={classes.paper}>
					<Typography className={classes.secHead}>
						Other:
					</Typography>
					<Typography className={classes.other}>
						Humidity: {humidity}
					</Typography>
					<Typography className={classes.other}>
						Pressure: {pressure}
					</Typography>
					<Typography className={classes.other}>
						Cloudiness: {cloudiness}
					</Typography>
				</Paper>
				
			</div>
		);
	}
}

const styles = theme => ({
	sunBlock: {
		display: 'inline-block',
		width:'50%',
		margin:'0% auto',
		textAlign:'center',
	},
	other: {
		color: 'darkslategrey',
		margin: 0,
		verticalAlign: 'top',
		fontSize: '17px',
	},
	paper: {
		margin: '8px auto',
		width: '85%',
		padding: '2% 3%',
		textAlign: 'left'
		// background: '#ffd9b8'
	},
	secHead: {
		textAlign: 'center',
		color: 'darkslategrey',
		margin: 0,
		verticalAlign: 'top',
		fontSize: '17px',
		fontWeight: 'bold'
	}
});

WeatherFragment.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	return {
		weather: state.getIn(['main', 'currentRegion'])
	}
}

export default connect(mapStateToProps)(withStyles(styles)(WeatherFragment));