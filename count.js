'use strict'

const db = require('./models')
const { web3Eth } = require('./web3')
const BigNumber = require('bignumber.js')
const Web3 = require('web3')
const pool = require('./files/pool.json')
const accounts = require('./account.json')

BigNumber.config({ EXPONENTIAL_AT: [-100, 100] })

async function main () {
    let url = 'http://localhost:8545'
    const providerEth = new Web3.providers.HttpProvider(url)
    const web3Eth = new Web3(providerEth)
    let contract = new web3Eth.eth.Contract(pool, '0x7ea253D31aAF943F44cf375CE540F0920cea4053')

    /*
    pool0 = nft
    pool1 = drace
    pool2 = lp
    pool3 = xdrace
    pool4 = xdracev2
     */
    console.log('total', accounts.length)
    for (let i = 0; i < accounts.length; i++) {
        if (i % 50 === 0) { console.log('process', i, '/', accounts.length) }
        let account = accounts[i]
        let b0 = await contract.methods.userInfo(0, account).call()
        b0 = new BigNumber(b0.nftPoint).div(10 ** 18).toNumber()
        let b1 = await contract.methods.userInfo(1, account).call()
        b1 = new BigNumber(b1.amount).div(10 ** 18).toNumber()
        let b2 = await contract.methods.userInfo(2, account).call()
        b2 = new BigNumber(b2.amount).div(10 ** 18).toNumber()
        let b3 = await contract.methods.userInfo(3, account).call()
        b3 = new BigNumber(b3.amount).div(10 ** 18).toNumber()
        let b4 = await contract.methods.userInfo(4, account).call()
        b4 = new BigNumber(b4.amount).div(10 ** 18).toNumber()

        await db.Account.updateOne({ hash: account },
            { $set: { pool0: b0, pool1: b1, pool2: b2, pool3: b3, pool4: b4 } }, { upsert: true, new: true })

        // console.log('update acc %s is %s', account.hash, b0, b1, b2, b3)
        // console.log('update acc %s is %s', account.hash, b1)
    }
}

main()
