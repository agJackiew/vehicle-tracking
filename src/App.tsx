import React from 'react';

import styles from './App.module.scss';
import Header from './components/layout/Header';
import Main from './components/layout/Main';

function App() {
  return (
    <section className={styles.app}>
      <Header />
      <Main />
    </section>
  );
}

export default App;