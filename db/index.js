const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mello', {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', function() {
  console.log('Connected to mongodb!');
});

db.on('error', console.error.bind(console, 'connection error:'));

const schema = new mongoose.Schema({
  id: Number,
  tableName: String,
  tableItems: [String],
});

const TableList = mongoose.model('TableList', schema);

const insert = (obj) => {
  const newTable = new TableList({
    id: obj.id,
    tableName: obj.tableName,
    tableItems: obj.tableItems
  });

  newTable.save((err) => {
    if (err) {
      console.log(err);
    }
  });
}

const find = (cb) => {
  TableList.find({}, (err, result) => {
    console.log(result);
    cb(err, result);
  });
}

const deleteAll = () => {
  TableList.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const toDoList = mongoose.model('toDoList', schema);

module.exports = {find, insert};