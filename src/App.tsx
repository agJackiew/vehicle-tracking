import React, { FC, useState } from 'react';

import styles from './App.module.scss';
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';

const App: FC = (props) => {

  const [showFilters, setShowFilters] = useState(false);

  const showFiltersHandler = () => {
    setShowFilters(current => !current);
  }
  return (
    <section className={styles.app}>
      <Sidebar onShow={showFiltersHandler}/>
      <Main showFilters={showFilters}/>
    </section>
  );
}

export default App;