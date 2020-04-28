import React from 'react';
import './App.css';
import List from './pages/List'
import Car from './pages/Car';

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <List />
        <Car />
      </div>
    )
  }
  
}
export default App;
