import React, { FC } from 'react';

import styles from './Header.module.scss';

const Header: FC = (props) => {

	return (
		<section className={styles.header}>
			<h1 className={styles.header__title}>Car Tracker</h1>
		</section>
	)
}

export default Header;