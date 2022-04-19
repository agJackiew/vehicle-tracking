import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import Button from '../ui/Button';
import logo from '../../assets/car-orange.png';
import image from '../../assets/car-img4.jpg';


type propsType = {
	onShow: () => void
}

const Sidebar: FC<propsType> = (props) => {

	const [isOpen, setIsOpen] = useState(false);

	const openHandler = () => {
		setIsOpen(current => !current);
		props.onShow();
	}

	return (
		<section className={styles.sidebar}>
			<div className={styles.sidebar__heading}>
				<img className={styles.sidebar__logo} src={logo} alt="logo" />
				<h1 className={styles.sidebar__title}>Car Tracker</h1>
			</div>
			<div className={styles.sidebar__icon}>
				<FontAwesomeIcon icon={ isOpen ? faXmark : faBars } onClick={openHandler}/>
			</div>
			<div className={styles.sidebar__btn}>
				<Button type='button' onClick={openHandler} text={isOpen ? "Hide filters" : "Show Filters"} />
			</div>
			<div className={styles.sidebar__image}>
				<img src={image} alt="car" />
			</div>
		</section>
	)
}

export default Sidebar;