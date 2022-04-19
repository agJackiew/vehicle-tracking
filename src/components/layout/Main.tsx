import React, { FC } from 'react';

import styles from './Main.module.scss';
import VehicleMap from '../map/VehicleMap';

type propsType = {
	showFilters: boolean
}

const Main: FC<propsType> = (props) => {

	return (
		<section className={styles.main}>
			<div className={styles['map-container']}>
				<VehicleMap showFilters={props.showFilters}/>
			</div>	
		</section>
	);	
}

export default Main;