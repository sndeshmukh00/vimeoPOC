const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    videoUrl: {
        type: String
    }
})

dataSchema.set("toJSON", { virtuals: true });
var Data = mongoose.model('Data', dataSchema)
exports = module.exports = Data;
