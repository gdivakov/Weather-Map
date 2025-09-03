import React from 'react';
import CloudIcon from '@material-ui/icons/Cloud'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import CityIcon from '@material-ui/icons/LocationCity'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import AdjustIcon from '@material-ui/icons/Adjust'
import LevelButton from './LevelButton'
import SearchButton from './SearchButton'
import PointButton from './PointButton'
import ListItem from '@material-ui/core/ListItem';
import LayersDisplayButton from './LayersDisplayButton'

export const mailFolderListItems = (
  <div>
		<SearchButton type='By city name'>
			<CityIcon />
		</SearchButton>

		<SearchButton type='By coords'>
			<GpsFixedIcon />
		</SearchButton>

		<PointButton type="By point">
			<AdjustIcon />
		</PointButton>
	</div>
);

export const otherMailFolderListItems = (
	<div>
		<LevelButton type='Temp level'>
			<WbSunnyIcon/>
		</LevelButton>

		<LevelButton type='Humidity level'>
			<CloudIcon/>
		</LevelButton>
	</div>
);

export const buttonItems = (
	<div>
		<ListItem>
			<LayersDisplayButton label="Display layers"/>
		</ListItem>
	</div>
);
