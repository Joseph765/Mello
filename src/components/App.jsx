const React = require('react');
const ReactDOM = require('react-dom');

import $ from 'jquery';
import Table from './Table.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tables: 0,
      name: ''
    }
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    });
  }

  createList() {
    const number = this.state.tables + 1;
    const name = this.state.name;
    this.setState({
      tables: number
    });
    $('#tables').append(`<div id=tableDiv${number}></div>`);
    ReactDOM.render(<Table name={name} number={number}/>, document.getElementById(`tableDiv${number}`));
  }

  createItem() {
    $('.tables ul').append('<li>sample</li>');
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Mello</h1>
        <label>Input List Name: </label>
        <input type="text" onChange={(e) => this.updateName(e)}></input>
        <button onClick={() => this.createList()}>Create new list</button>
        <div id="tables">

        </div>
      </div>
    );
  }

}

export default App;