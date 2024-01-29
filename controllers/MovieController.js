const Movie                 = require('../models/MovieModel');
const {movieUploads}        = require('../helpers/fileUploads');
const fsPromise             = require('fs/promises');


class MovieController{


    static async index(req, res) {
        try {
            const movies= await Movie.find({});
            res.status(200).json({movies:movies, status:200});
           } catch (error) {
            res.status(400).json({message:error.message, status:400});
           }
        
    }


    static create(req, res) {
        if(!req.user){
            res.send('welcome to the movie page ✌✌✌');
        }else{
            res.send(`welcome to the movie page ${req.user.email}`);
        }
        
    }


    static async store(req, res) {
        
        try {

            if(!req.body){
                res.status(400).json({ status: 400, message:"request body cannot be empty" });
            }


            //HANDLED FILE UPLOADs FOR NEW MOVIE HERE WITH MULTER
            const saveMovieUploads = movieUploads.single('movieImage');

            saveMovieUploads(req, res, async (err)=>{
                if(err){
                    res.status(400).json({ status: 400, message: err })
                }else{
                    const movie= await Movie.create({
                        movieName:          req.body.movieName.toLowerCase(),
                        movieImage:         req.file.path,
                        movieReleaseDate:   req.body.movieReleaseDate,
                        movieDuration:      req.body.movieDuration,
                        movieCasts:         req.body.casts,
                    })
                    res.status(200).json({movie:movie, status:200});
                }
            })
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static async show(req, res) {
       
        let movieId = ""

        if(!req.params){
            res.status(400).json({ status: 400, message:"request parameter cannot be empty" });
        }else{
            movieId = req.params?.movieid;
        }
        try {
            const singleMovie = await Movie.findById({_id: movieId});
            res.status(200).json({movie: singleMovie, status:200});

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
        let movieId = ""

        if(!req.params || !req.body){
            res.status(400).json({ status: 400, message:"request parameter or body cannot be empty" });
        }else{
            movieId = req.params?.movieid;
        }
        try {

            //HANDLED FILE UPLOADs FOR MOVIE UPDATE HERE WITH MULTER
            const saveMovieUploads = movieUploads.single('updateMovieImage');

            saveMovieUploads(req, res, async (err)=>{
                if(err){
                    res.status(400).json({ status: 400, message: err })
                }else{

                    //Get the single Movie from database if it exist
                    const singleMovie = await Movie.findById({_id: movieId});

                    //check if the single movie has an image and remove from upload folder befor update to avoid multiple storage of same image
                    if(singleMovie.movieImage){
                        await fsPromise.unlink(singleMovie.movieImage);
                    }

                    //Save updated data to the database
                    singleMovie.movieName           = req.body.updateMovieName.toLowerCase(),
                    singleMovie.movieImage          = req.file.path,
                    singleMovie.movieReleaseDate    = req.body.updateMovieReleaseDate,
                    singleMovie.movieDuration       = req.body.updateMovieDuration,
                    singleMovie.movieCasts          = req.body.updateCasts,
                    singleMovie.save();
                    res.status(200).json({movie: singleMovie, status:200});
                }
            })
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }
    }


    static async destroy(req, res) {
        let movieId = ""

        if(!req.params){
            res.status(400).json({ status: 400, message:"request parameter cannot be empty" });
        }else{
            movieId = req.params?.movieid;
        }
        try {

            const singleMovie = await Movie.findById({_id: movieId});

            //check if the single movie has an image and remove from upload folder before deleting from db to avoid having image of a deleted movie in our upload folder.
            if(singleMovie.movieImage){
                await fsPromise.unlink(singleMovie.movieImage);
            }

            await Movie.findByIdAndDelete({_id: movieId});
            res.status(200).json({message:"Movie deleted successfully", status:200});
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }
    }
}



module.exports = MovieController;