import React, {useState} from 'react';
import Search from './components/Search';
import DrugTable from './components/DrugTable';
import './App.css';

const App = () => {
  const [term, setTerm] = useState('');
  return (
    <div className="App">
      <Search updateTerm={setTerm} />
      <DrugTable term={term} />
    </div>
  );
};

export default App;
