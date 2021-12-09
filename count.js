'use strict'

const db = require('./models')
const BigNumber = require('bignumber.js')
const Web3 = require('web3')
const pool = require('./files/pool.json')

BigNumber.config({ EXPONENTIAL_AT: [-100, 100] })

// 13250000
// 13050000
// 12800000

async function getUserInfo (contract, poolId, address) {
    try {
        return await contract.methods.userInfo(2, address).call()
    } catch (e) {
        console.error(e)
        await getUserInfo(contract, poolId, address)
    }
}
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
    let accounts = await db.Account.find()
    console.log('total', accounts.length)
    for (let i = 0; i < accounts.length; i++) {
        if (i % 50 === 0) { console.log('process', i, '/', accounts.length) }
        let account = accounts[i]
        let b1 = await getUserInfo(contract, 1, account.hash)
        b1 = new BigNumber(b1.amount).div(10 ** 18).toNumber()

        account.s1325 = b1
        account.save()
        // await db.Account.updateOne({ hash: account },
        //     { $set: { s1325: b1 } }, { upsert: true, new: true })
    }
    console.log('done')
}

main()
