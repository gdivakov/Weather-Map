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
import BUTTON_CONSTS from '../constants/SidebarButtons.js'

export const mailFolderListItems = (
  <div>
		<SearchButton type={BUTTON_CONSTS.BY_CITY_NAME}>
			<CityIcon />
		</SearchButton>

		<SearchButton type={BUTTON_CONSTS.BY_COORDS}>
			<GpsFixedIcon />
		</SearchButton>

		<PointButton type={BUTTON_CONSTS.BY_POINT}>
			<AdjustIcon />
		</PointButton>
	</div>
);

export const otherMailFolderListItems = (
	<div>
		<LevelButton type={BUTTON_CONSTS.TEMP_LEVEL}>
			<WbSunnyIcon/>
		</LevelButton>

		<LevelButton type={BUTTON_CONSTS.HUMIDITY_LEVEL}>
			<CloudIcon/>
		</LevelButton>
	</div>
);

export const buttonItems = (
	<div>
		<ListItem>
			<LayersDisplayButton label={BUTTON_CONSTS.DISPLAY_LAYERS}/>
		</ListItem>
	</div>
);
