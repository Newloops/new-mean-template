const mongoose = require('mongoose')
const Category = mongoose.model('Category')

//GET - Return all users in the DB
exports.findAllCategories = (req, res) => {

    Category.find({})
        .sort('name')
        .populate('user', 'email')
        .exec((err, categories) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err.errors
                })
            }

            Category.countDocuments({}, (req, total) => {

                res.status(200).json({
                    success: true,
                    categories,
                    total
                })

                console.log('GET /categories')
                
            })
            
        }
    
    )

}

//GET - Return all users in the DB
exports.searchCategories = (req, res) => {

    let term = req.params.term
    let regex = new RegExp(term, 'i')

    Category.find({
            name: regex
        })
        .sort('name')
        .populate('user', 'email')
        .exec((err, categories) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err.errors
                })
            }

            res.status(200).json({
                success: true,
                categories,
                total: categories.length
            })

            console.log('GET /categories')
            
        })

}

//POST - Insert a new Category in the DB
exports.addCategory = (req, res) => {

    console.log('POST');
    console.log(req.body)

    let category = new Category({
        name: req.body.name,
        user: req.user._id
    })

    category.save((err, category) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err.errors
            })
        }

        res.status(200).json({
            success: true,
            category
        })

        console.log('Categoría creada!')

    })

}