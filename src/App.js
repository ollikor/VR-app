import React from 'react';
import './App.css';

import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <div className="Container">
        <Header />
        <Search />
        <Results />
      </div>
    </div>
  );
}

export default App;
