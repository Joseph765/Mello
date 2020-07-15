const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mello', {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', function() {
  console.log('Connected to mongodb!');
});

db.on('error', console.error.bind(console, 'connection error:'));

const schema = new mongoose.Schema({
  id: {type: Number , unique: true, required: true, dropDups: true},
  tableName: String,
  tableItems: [String],
});

const TableList = mongoose.model('TableList', schema);

const insert = (obj, cb) => {
  const newTable = new TableList({
    id: obj.id,
    tableName: obj.tableName,
    tableItems: obj.tableItems
  });

  newTable.save((err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
}

const find = (cb) => {
  TableList.find({}, (err, result) => {
    console.log(result);
    cb(err, result);
  });
}

const insertItem = (obj, cb) => {
  TableList.find({id: obj.id}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var arr = result[0].tableItems;
      if (arr.includes(obj.item)) {
        cb('Item Already Exists');
      } else {
        arr.push(obj.item);
        TableList.updateOne({id: obj.id}, {tableItems: arr}, (err, result) => {
          cb(err);
        });
      }
    }
  });
}

const deleteAll = () => {
  TableList.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const deleteListItem = (obj, cb) => {
  TableList.find({id: obj.id}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var arr = result[0].tableItems;
      var index = arr.indexOf(obj.item);
      arr.splice(index, 1);
      TableList.updateOne({id: obj.id}, {tableItems: arr}, (err, result) => {
        cb(err);
      });
    }
  });
}

const deleteList = (obj, cb) => {
  TableList.deleteOne({id: obj.id}, (err) => {
    cb(err);
  });
}

const toDoList = mongoose.model('toDoList', schema);

module.exports = {find, insert, insertItem, deleteListItem, deleteList};
