//imports
const mongoose = require('mongoose')

const nicheSchema = new mongoose.Schema({
    type: {type: Number},
    bg: {type: String},
    icon: {type: String},
    langs: {type: Array},
    names: {type: Map},
    itemNames: {type:Map},
    isItem: {type: Boolean, default: false},
    itemIcon: {type: Array},
    keywords: {type: Array},
    isSelect: {type: Boolean, default: false},
    selectType: {type: Number},
    isPlatforms: {type: Boolean, default: false},
    platforms: {type:Array},
    isVideo: {type: Boolean, default: false},
    video: {type: String},
    isAmounts: {type:Boolean, default: false},
    amounts: {type:Array},
    customLocker: {type: String},
    isCustomLocker: {type:Boolean, default: false},
    isReceiver: {type:Boolean, default: false},
    isUsername: {type: Boolean, default: false},
    path: {type: String}
})

const Niche = mongoose.model("dev-test", nicheSchema)

module.exports = Niche