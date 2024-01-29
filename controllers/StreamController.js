const Movie                 = require('../models/MovieModel');
const {movieUploads}        = require('../helpers/fileUploads');
const fsPromise             = require('fs/promises');
const fs                    = require('fs');
const path                  = require('path');


class StreamController{


    static async index(req, res) {

        if(!req.headers.range){
            res.status(400).json({message: "request headers Range Required", status:400});
        }
        try {
            const videoPath = path.join(__dirname, 'public/videos/');
            const videoSize = (await fsPromise.stat(videoPath)).size;
    
            const CHUNK_SIZE = 10**6 //1mb
            const start = Number(req.headers.range.replace(/\D/g, "")) //replace all non-digit characters with empty string
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4"
    
            }
    
            res.writeHead(206, headers);
            const videoStream = fs.createReadStream(videoPath,{start, end});
            videoStream.pipe(res);

           } catch (error) {
            res.status(400).json({message:error.message, status:400});
        }
        
    }


    static create(req, res) {
        if(!req.user){
            res.send('welcome to the video page ✌✌✌');
        }else{
            res.send(`welcome to the video page ${req.user.email}`);
        }
        
    }


    static async store(req, res) {
        
        try {

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static async show(req, res) {
       
        try {
            
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static edit(req, res) {
        try {

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static async update(req, res) {
        
        try {

           
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }
    }


    static async destroy(req, res) {
        
        try {
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }
    }
}



module.exports = StreamController;