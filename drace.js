'use strict'

const db = require('./models')
const { web3Eth } = require('./web3')
const BigNumber = require('bignumber.js')
const Web3 = require('web3')
const pool = require('./files/pool.json')

BigNumber.config({ EXPONENTIAL_AT: [-100, 100] })

async function main () {
    let accounts = await db.Account.find()

    /*
    pool0 = nft
    pool1 = drace
    pool2 = lp
    pool3 = xdrace
    pool4 = xdracev2
     */

    let totalNFT = 0
    let totalDrace = 0
    let totalLP = 0
    let totalXDrace = 0
    let totalXDracev2 = 0

    let result = {}
    let count = 0
    console.log('total', accounts.length)
    for (let i = 0; i < accounts.length; i++) {
        let account = accounts[i]
        if (account.pool0 > 0 || account.pool1 > 0 || account.pool2 > 0 || account.pool3 > 0 || account.pool4 > 0) {
            totalNFT += account.pool0
            totalDrace += account.pool1
            totalLP += account.pool2
            totalXDrace += account.pool3
            totalXDracev2 += account.pool4

            result[account.hash] = {
                nft: account.pool0,
                drace: account.pool1,
                lp: account.pool2,
                xdrace: account.pool3,
                xdracev2: account.pool4
            }
            count++
        }
    }
    console.log(result)
    console.log('count', count)
    console.log('totalNFT', totalNFT)
    console.log('totalDrace', totalDrace)
    console.log('totalLP', totalLP)
    console.log('totalXDrace', totalXDrace)
    console.log('totalXDracev2', totalXDracev2)
}

main()
