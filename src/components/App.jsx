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
    $.ajax({
      context: this,
      method: 'GET',
      url: '/tables/get',
      success: function(result) {
        this.updateTables(result.length, result);
      },
      error: function(err) {
        console.log(err);
      }
    })
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
        document.getElementById(`tableDiv${i}`)
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
    this.forceUpdate();
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Mello</h1>
        <label>Input List Name: </label>
        <input type="text" onChange={(e) => this.updateName(e)}></input>
        <button onClick={() => this.createList()}>Create new list</button>
        <div id="tables"></div>
      </div>
    );
  }

}

export default App;