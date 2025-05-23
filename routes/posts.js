const express = require('express')
const router = express.Router()
const Post = require('../models/Post.js')

router.post('/create', async(req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).send(post)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to create the post'})
    }
})

router.get('/', async (req, res) => {
    try{
        const allPosts = await Post.find()
        res.status(201).send(allPosts)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to get all posts'})
    }
})

router.get('/id/:_id', async (req, res) => {
    try{
        const post = await Post.findById(req.params._id)
        res.status(201).send(post)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to get that post'})
    }
})

router.get('/title/:title', async (req, res) => {
    try{
        const post = await Post.find({title: req.params.title}).exec()
        res.status(201).send(post)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to get that post'})
    }
})

router.put('/id/:_id', async(req, res) => {
    try{
        const title = req.body.title
        const body = req.body.body
        const post = await Post.findByIdAndUpdate(req.params._id,{title, body}, {new: true})
        res.status(201).send(post)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to update the post with id'+req.params._id})
    }
})

router.delete('/id/:_id', async(req, res) => {
    try{
        const post = await Post.findByIdAndDelete(req.params._id)
        res.status(201).send(post)
    }catch(error){
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to delete that post'})
    }
})

module.exports = router