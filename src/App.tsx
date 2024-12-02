import React from 'react';
import "./App.css";
import Autocomplete from './components/Autocomplete/Autocomplete';

export default function App() {
  return (
    <div className="App">
      <h1>Books Search</h1>
      <Autocomplete
        placeholder="Search..."
        lang="en"
        dir="ltr"
      />
    </div>
  );
}
