const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
// Admin Home
router.get('/', (req,res)=>{
    res.render('admin/index.ejs', { layout: 'layouts/adminLayout.ejs' })
})
//Admin View Artists
router.get('/artists', async(req,res)=>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')

    }
    try{
        const artists = await Artist.find(searchOptions)
        res.render('admin/artists/index', { 

        layout: 'layouts/adminLayout.ejs', 
        artists: artists, 
        searchOptions: req.query
    })
    }catch{
        res.render('admin/index.ejs', { layout: 'layouts/adminLayout.ejs' })
    }
    
})

//Admin Add Artists
router.get('/artists/new', (req,res)=>{
    res.render('admin/artists/new.ejs', { layout: 'layouts/adminLayout.ejs', artist: new Artist()})
})

//Admin View Releases
router.get('/releases', (req,res)=>{
    res.render('admin/releases/index.ejs', { layout: 'layouts/adminLayout.ejs' })
})

//Admin Add Releases
router.get('/releases/new', (req,res)=>{
    res.render('admin/releases/new.ejs', { layout: 'layouts/adminLayout.ejs' })
})

//Admin View Blog Posts
router.get('/blog', (req,res)=> {
    res.render('admin/blog.ejs', { layout: 'layouts/adminLayout.ejs' })
})
//Admin Add Blog Posts
router.get('/blog/new', (req,res)=>{
    res.render('admin/blog/new.ejs', { layout: 'layouts/adminLayout.ejs' })
})

//Add Author
router.post('/artists', async(req,res)=>{
    const artist =  new Artist({
        name: req.body.artistname
    })
    try{
        const newArtist = await artist.save()
     
                res.redirect('/admin/artists/')
    }catch{
        res.render('admin/artists/new.ejs',{
                        layout: 'layouts/adminLayout.ejs', 
                        artist: artist,
                        errorMessage: 'Error creating Artist'
                     })
    }
    // artist.save((err, newArtist) => {
    //      if (err){
    //          res.render('admin/artists/new.ejs',{
    //             layout: 'layouts/adminLayout.ejs', 
    //             artist: artist,
    //             errorMessage: 'Error creating Artist'
    //          })
    //         }else{
    //             // res.redirect(`/admin/artists/${newArtist.id}`)
    //             res.redirect('/admin/artists/')
                
    //         }
            
         
    // })
})





module.exports = router