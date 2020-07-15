const React = require('react');
const ReactDOM = require('react-dom');

import $ from 'jquery';

class ListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      item: this.props.name
    }
  }

  componentDidMount() {
    var obj = {
      id: this.props.id,
      item: this.props.name
    }
    $.ajax({
      context: this,
      method: 'POST',
      url: '/item/post',
      data: obj,
      success: function(result) {
        console.log('successfully posted item');
      },
      error: function(err) {
        console.log(err)
      }
    });
  }

  deleteItem() {
    var obj = {
      id: this.props.id,
      item: this.props.name
    }
    $.ajax({
      context: this,
      method: 'DELETE',
      url: '/item/delete',
      data: obj,
      success: function(result) {
        console.log('successfully posted item');
      },
      error: function(err) {
        console.log(err)
      }
    });
  }

  render() {
    return (
      <li className={this.props.name}>{this.props.name}
        <button onClick={() => this.deleteItem(this.props.name)}>delete</button>
        <button>edit</button>
      </li>
    );
  }
}

export default ListItem;