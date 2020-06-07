const React = require('react');
const ReactDOM = require('react-dom');
import $ from 'jquery';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number,
      name: this.props.name,
      listItemName: '',
    }
  }

  createItem() {
    $(`.list${this.state.number}`).append(`<li>${this.state.listItemName}</li>`);
  }

  updateListItemName(e) {
    this.setState({
      listItemName: e.target.value
    });
  }

  render() {
    return (
      <div className={`table${this.state.number}`}>
        <h2>{this.state.name}</h2>
        <ul className={`list${this.state.number}`}></ul>
        <label>Enter in list item</label>
        <input type="text" id="listItemInput" onChange={(e) => this.updateListItemName(e)}></input>
        <button onClick={() => this.createItem()}>Create new item</button>
      </div>
    );
  }
}

export default Table;