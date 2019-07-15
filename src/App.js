import React from 'react';
import ReactRadio from './components/ReactRadio'

class App extends React.Component {

  handleChange = (data) => {
    console.log ('ReactRadio Turned -> ' + data);
  }

  render () {
    return (
      <ReactRadio trueColor={'#4CAF50'} falseColor={'#F44336'} onPropertyChange={this.handleChange}/>
    );
  }

}

export default App;
