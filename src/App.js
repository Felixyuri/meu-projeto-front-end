/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import 'react';
import './Cdns';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './components/Loader';
import {usePromiseTracker} from 'react-promise-tracker';
import Table from './components/Table';

function App() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div className="dashboard">
      {promiseInProgress && (
        <Loader/>
      )}
      <Table />
    </div >
  );
}

export default App;
