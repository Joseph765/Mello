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

  componentDidMount() {
    //get all info from database
    $.ajax({
      context: this,
      method: 'GET',
      url: '/tables/get',
      success: function(result) {
        //update tabl info in state
        this.updateTables(0, result);
      },
      error: function(err) {
        console.log(err);
      }
    })
    //if tables is greater than 0,
      //loop through tables
      //each iteration create a new div (id=tableDiv${number})
      //use reactDOM.render and pass in props, including items from database
  }

  updateTables(num, arr) {
    this.setState({
      tables: num
    });
    if (num > 0) {
      this.generateTables(arr);
    }
  }

  generateTables(arr) {
    for (let i = 1; i <= arr.length; i ++) {
      $('#tables').append(`<div id=tableDiv${i}></div>`);
        ReactDOM.render(
        <Table
          name={arr[i - 1].tableName}
          number={i}
          items={arr[i - 1].tableItems}
        />,
        document.getElementById(`tableDiv${number}`)
      );
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
    ReactDOM.render(<Table name={name} number={number} items={[]}/>, document.getElementById(`tableDiv${number}`));
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