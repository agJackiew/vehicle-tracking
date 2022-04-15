import React, { FC } from 'react';

import styles from './Main.module.scss';
import VehicleMap from '../map/VehicleMap';

const Main: FC = (props) => {

	return (
		<section className={styles.main}>
			<div className={styles.map}>
				<VehicleMap />
			</div>	
		</section>
	);	
}

export default Main;