const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// Get All Accounts
server.get('/', (req,res)=>{
    db('accounts')
        .then(accounts => {
            res
                .status(200)
                .json(accounts)
        })
        .catch( error => {
            console.log(error);
            res
                .status(500)
                .json({ message: "Error retrieving accounts from database" });
        })
});

// Get One Account
server.get('/:id', (req,res)=>{
    db('accounts')
        .where({id: req.params.id})
            .first()
            .then(account => {
                res
                    .status(200)
                    .json(account)
            })
            .catch( error => {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Error retrieving accounts from database" });
            })
});


module.exports = server;