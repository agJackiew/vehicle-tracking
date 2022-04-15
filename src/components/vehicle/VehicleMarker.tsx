import React, { FC, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import './VehicleMarker.module.scss';
import VehiclePopup from './VehiclePopup';
import { VehicleType } from '../../types/types';

type propsType = { 
	item: VehicleType,
	hidden: boolean,
	minBattery: number
};

const VehicleMarker: FC<propsType> = (props) => {	

	const [location, setLocation] = useState<[number, number]>([props.item.location.latitude, props.item.location.longitude]);
	const [status, setStatus] = useState(props.item.status.toString() === "AVAILABLE" ? true : false);

	const s = (props.hidden || (props.item.batteryLevelPct < props.minBattery)) ? 0 : 30;
	const iconGreen = L.icon({
		iconUrl: require("../../assets/icons/car-green.png"),
		iconSize: [s, s],
		popupAnchor:  [0, -15],
	})

	const iconRed = L.icon({
		iconUrl: require("../../assets/icons/car-red.png"),
		iconSize: [s, s],
		popupAnchor:  [0, -15],
	})

	return (
	  <Marker position={location} icon={status ? iconGreen : iconRed} >
	    <Popup className="popup">
		    <VehiclePopup id={props.item.id} />
	    </Popup>
	  </Marker>
	);
};

export default VehicleMarker;