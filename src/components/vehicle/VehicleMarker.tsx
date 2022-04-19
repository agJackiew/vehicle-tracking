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
	const [status, setStatus] = useState(props.item.status.toString() === 'AVAILABLE' ?
	 {value: true, label: 'AVAILABLE'} : {value: false, label: 'NOT AVAILABLE'});

	const size = ((props.hidden && !status.value) || (props.item.batteryLevelPct < props.minBattery)) ? 0 : 30;
	const iconGreen = L.icon({
		iconUrl: require("../../assets/icons/car-green.png"),
		iconSize: [size, size],
		popupAnchor:  [0, -15],
	})

	const iconRed = L.icon({
		iconUrl: require("../../assets/icons/car-red.png"),
		iconSize: [size, size],
		popupAnchor:  [0, -15],
	})

	const onStatusChange = () => {
		setStatus(status.value ? {value: false, label: 'NOT AVAILABLE'} : {value: true, label: 'AVAILABLE'})
	}

	return (
	  <Marker position={location} icon={status.value ? iconGreen : iconRed}>
	    <Popup className="popup">
		    <VehiclePopup id={props.item.id} onReserve={onStatusChange} status={status} />
	    </Popup>
	  </Marker>
	);
};

export default VehicleMarker;