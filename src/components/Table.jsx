const React = require('react');
const ReactDOM = require('react-dom');

import $ from 'jquery';
import ListItem from './ListItem.jsx';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number,
      name: this.props.name,
      items: this.props.items,
      listItemName: '',
    }
  }

  componentDidMount() {
    const obj = {
      id: this.state.number,
      tableName: this.props.name,
      tableList: this.props.items
    }
    console.log(obj.tableList);
    $.ajax({
      context: this,
      method: 'POST',
      url: '/tables/post',
      data: obj,
      success: function(result) {
        console.log(result);
      },
      error: function(err) {
        console.log(err)
      }
    });
  }

  createItem() {
    ReactDOM.render(
      <ListItem name={this.state.listItemName} id={this.state.number} />,
      document.getElementById(`list${this.state.number}`)
    );
  }

  updateListItemName(e) {
    this.setState({
      listItemName: e.target.value
    });
  }

  deleteTable() {
    var obj = {
      id: this.state.number
    }
    $.ajax({
      context: this,
      method: 'DELETE',
      data: obj,
      url: '/list/delete',
      success: function() {
        console.log('Success deleting List!');
      },
      error: function(err) {
        console.log(err)
      }
    });
  }

  render() {
    let items;
    if (this.props.items.length > 0) {
      items = this.props.items.map(item => {
        return (
          <ListItem name={item} id={this.props.number} />
        );
      });
    }
    return (
      <div className={`table${this.state.number}`}>
        <h2>{this.state.name}
          <button onClick={() => this.deleteTable()}>delete</button>
          <button>edit</button>
        </h2>
        <ul id={`list${this.state.number}`}>{items}</ul>
        <label>Enter in list item</label>
        <input type="text" id="listItemInput" onChange={(e) => this.updateListItemName(e)}></input>
        <button onClick={() => this.createItem()}>Create new item</button>
      </div>
    );
  }
}

export default Table;