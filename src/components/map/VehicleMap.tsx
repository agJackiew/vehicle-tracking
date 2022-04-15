import React, { FC, useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import styles from './VehicleMap.module.scss';
import VehicleMarker from '../vehicle/VehicleMarker';
import { VehicleType } from '../../types/types';

const VehicleMap: FC = (props) => {

	const [vehicles, setVehicles] = useState<VehicleType[]>([]);
	const [error, setError] = useState('');
	const [minBattery, setMinBattery] = useState('');
	const [isHidden, setIsHidden] = useState(false);

	const urlCars = 'https://android.jrotor.com/api/map?objectType=VEHICLE';

	const fetchDataHandler = async () => {

		try {
			const response = await fetch(urlCars);

			if (!response.ok) {
				throw new Error('Fetching data failed');
			}	

			const data = await response.json();
			const fetchedVehicles = data.objects.map((item: VehicleType ) => {
				return item;
			});

			setVehicles(fetchedVehicles);
		} catch (error: any) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchDataHandler();
	}, []);	

	const changeBatteryLvHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		setMinBattery(event.target.value);
	}, [])
;

	const filterAvailableHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
 		setIsHidden(event.target.checked);
  	}, [])

	return (
		<div>
			<div className={styles.actions}>
				<label htmlFor="available">Available only</label>
				<input id="available" type="checkbox" checked={isHidden} onChange={filterAvailableHandler}/>
				<label htmlFor="batteryLv">Min battery level</label>
				<input 
					id="batteryLv" 
					type="number" 
					min="0"
					max="100"
					value={minBattery}
					onChange={changeBatteryLvHandler} 
				/>
			</div>
			<MapContainer 
				center={[52.193829425325, 20.929869743200268]} 
				zoom={18} 
				style={{ height:'80vh' }}
            	className='markercluster-map'
			>
				<TileLayer
			    	attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			    	url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			  	/>
			  	<MarkerClusterGroup
			  		showCoverageOnHover={false}
				    spiderfyDistanceMultiplier={2}
				    maxClusterRadius={40}
			  	>
			  		{vehicles.map((item) => (
					<VehicleMarker 
						key={item.id}
						item={item}
						hidden={isHidden}
						minBattery={parseInt(minBattery)}
					/>
				))}
			  	</MarkerClusterGroup>
			</MapContainer>
		</div>	
	);		
}

export default VehicleMap;