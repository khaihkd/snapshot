'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    hash: { type: String, unique: true },
    pool0: Number,
    pool1: Number,
    pool2: Number,
    pool3: Number,
    pool4: Number,
    balanceNumber: Number,
    accountType: { type: String, index: true },
    isSend: { type: Boolean, index: true, default: false },
    hasBalance: { type: Boolean, index: true, default: false }
}, { timestamps: false })

module.exports = mongoose.model('Account', Account)
