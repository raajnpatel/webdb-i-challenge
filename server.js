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

server.post('/', (req,res)=>{
    const account = req.body;
    !req.body.name || !req.body.budget ? res.status(400).json({message: "Must have a name and a budget!"}):
        db('accounts').insert(account)
            .then( account => {
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

server.put('/:id', (req,res)=> {
    const account = req.body;
    !account.name || !account.budget ? res.status(400).json({message: "Must have a name and a budget!"}):
        db("accounts")
            .where({ id: req.params.id})
            .update(req.body)
            .then(newPut => {
                res
                    .status(200)
                    .json(newPut);
            })
            .catch(error => {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Error retrieving accounts from database" });
            });
});

server.delete('/:id', (req,res) => {
    db('accounts')
        .where('id', '=', req.params.id)
        .del()
        .then( count => {
            if(count > 0){
                res
                    .status(200)
                    .json(count)
            } else {
                res
                    .status(404)
                    .json({message: 'ID Not Found!'})
            }
        })
        .catch( error => {
            console.log(error);
            res
                .status(500)
                .json({ message: "Error retrieving accounts from database" });
        })
});


module.exports = server;