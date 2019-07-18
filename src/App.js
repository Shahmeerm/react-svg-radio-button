import React from 'react';
import ReactRadio from './components/ReactRadio'

class App extends React.Component {

  handleChange = (event) => {
    console.log ('ReactRadio Turned -> ' + event.target.value);
  }

  handleChange1 = (data) => {
    console.log ('ReactRadio Turned -> ' + data);
  }

  render () {
    return (
      <>
        <ReactRadio width={40} trueColor={'#4CAF50'} falseColor={'#F44336'} checked={true} onChange={this.handleChange}/>
      </>
    );
  }

}

export default App;
