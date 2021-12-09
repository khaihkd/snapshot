'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    hash: { type: String, unique: true },
    s1325: Number,
    s1305: Number,
    s1280: Number,
    stb: Number,
    convert2Drace: Number
}, { timestamps: false })

module.exports = mongoose.model('Account', Account)
