


class HomeController{

    static async create(req, res) {
        if(!req.user){
            res.send('welcome to the home page ✌✌✌');
        }else{
            res.send(`welcome to the home page ${req.user.email}`);
        }
        
    }


    static async store(req, res) {
        try {

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static destroy() {

    }
}



module.exports = HomeController;