//imports
const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
    arLocker: {type: String},
    enLocker: {type: String},
    trLocker: {type: String},
    idLocker: {type: String},
    frLocker: {type: String},
    deLocker: {type: String},
    esLocker: {type: String},
    brLocker: {type: String},
})

const Settings = mongoose.model("dev-settings", settingsSchema)

module.exports = Settings