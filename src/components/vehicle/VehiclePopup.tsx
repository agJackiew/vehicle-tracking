import React, { FC, Fragment, useEffect, useState } from 'react';

import styles from './VehiclePopup.module.scss';
import { VehicleType } from '../../types/types';

const VehiclePopup:FC<{id: string}> = (props) => {	

	const [details, setDetails] = useState<VehicleType | undefined>(undefined);
	const [error, setError] = useState({
		isError: false,
		message: ''
	});

	const vehicleUrl = "https://android.jrotor.com/api/vehicles/" + props.id
	const pictureUrl = "https://android.jrotor.com/api/attachments/" + details?.picture.id;

	const fetchDetails = async () => {
		try {
			const response = await fetch(vehicleUrl);

			if (!response.ok) {
				throw new Error();
			} 

			const data = await response.json();	
			setDetails(data);
		} catch (error: any) {
			setError({isError: true, message: "Oops, something went wrong..."});
		}
	};

	useEffect(() => {
		fetchDetails();
	}, []);

	return ( 
		<Fragment>
			{!error.isError ?
				<div className={styles.popup}>
					<div className={styles.popup__title}>Details</div>
					<figure>
						<img className={styles.popup__img} src={pictureUrl} alt="" />
					</figure>
				    <div className={styles.popup__name}>
						<div className={styles.popup__brand}>{details?.brand}</div>
						<div className={styles.popup__spec}>
							<div className={styles.popup__model}>{details?.model}</div>
							<div className={styles.popup__year}>
								<span>Prod: </span>
								{details?.year}
							</div>
						</div>
					</div>
					<div className={styles.popup__spec}>
						<div className={styles.popup__status}>
							<span>Status: </span>
							{details?.status}
						</div>
						<div className={styles.popup__batLv}>
							<span>Battery: </span>
							{details?.batteryLevelPct}
						</div>
					</div>
				</div> :
				<div className={styles.error}>{error.message}</div>}
		</Fragment>
	);
};

export default VehiclePopup;