var stratum = require('stratum');
var config = require('./config.json');

const express = require('express');
const app = express();

var daemon = new stratum.Daemon({
    'name': config.coinName,
    'host': config.host,
    'port': config.rpcport,
    'user': config.rpcuser,
    'password': config.rpcpass
});

async function start() {
    daemon.start();
}

app.get('/getdifficulty/', async (req, res) => {
    try {
        const result = await daemon.call('getdifficulty', []);
        res.json(result);
    } catch (result) {
        res.json(result);
    }
});

app.get('/getconnectioncount/', async (req, res) => {
    try {
        const result = await daemon.call('getconnectioncount', []);
        res.json(result);
    } catch (result) {
        res.json(result);
    }
});

app.get('/getblockcount/', async (req, res) => {
    try {
        const result = await daemon.call('getblockcount', []);
        res.json(result);
    } catch (result) {
        res.json(result);
    }
});

app.get('/getblockhash/:blockNum', async (req, res) => {
    var n = Math.floor(Number(str = req.params.blockNum));
    const height = await daemon.call('getblockcount', []);
    if(n !== Infinity && String(n) === str && n >= 0 && n <= height){
        try {
            const result = await daemon.call('getblockhash', parseInt(str));
            res.json(result);
        } catch (result) {
            res.json(result);
        }
    }else{
        res.json("Error, block not found.");
    }
});

app.get('/getblock/:blockHash', async (req, res) => {
    try {
        const result = await daemon.call('getblock', req.params.blockHash);
        res.json(result);
    } catch (result) {
        res.json("Error, block hash not found.");
    }
});

app.get('/getrawtransaction/:txId/:decrypt', async (req, res) => {
    try {
        const result = await daemon.call('getrawtransaction', req.params.txId, parseInt(req.params.decrypt)); //check
        res.json(result);
    } catch (result) {
        res.json("Error, transaction not found.");
    }
});

app.get('/getnetworkhashps/', async (req, res) => {
    try {
        const result = await daemon.call('getnetworkhashps', []);
        res.json(result);
    } catch (result) {
        res.json(result);
    }
});

app.get('/getmoneysupply/', async (req, res) => {
    try {
        const result = await daemon.call('getmoneysupply', []);
        res.json(result);
    } catch (result) {
        res.json(result);
    }
});

app.get('/getdistribution/', async (req, res) => {
    try {
        const result = await daemon.call('getdistribution', []);
        res.json(result);
    } catch (result) {
        res.json(result);
    }
});

app.get('/getdistribution/', async (req, res) => {
    try {
        const result = await daemon.call('getdistribution', []);
        res.json(result);
    } catch (result) {
        res.json(result);
    }
});

const port = config.apiport;
app.listen(port, () => {
    start();
    console.log("Listening to http://localhost:" + port);
})