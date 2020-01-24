const mongoose = require('mongoose');

const NotSchema = mongoose.Schema({
    id:{
      type:String,
      required:true
    },
    Friends: {
        type: Array,
        default:[]
    },
    Request: {
        type: Array,
        default:[]
    },
    Accept: {
        type: Array,
        default:[]
    },
});

module.exports = mongoose.model('Notification', NotSchema);