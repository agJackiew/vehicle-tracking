import React, { FC } from 'react';

import styles from './Button.module.scss';

type propsType = {
	type?: "button" | "submit" | "reset" | undefined,
	text: string,
	onClick: () => void
}

const Button: FC<propsType> = (props) => {

	return (
		<button 
			type={props.type} 
			className={styles.button}
			onClick={props.onClick}>{props.text}
		</button>
	);	
}

export default Button;