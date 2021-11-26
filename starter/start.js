const cors  = require('cors')
const customersRoute = require('../routes/customers.route') 
const genresRoute = require('../routes/genres.route') 
const moviesRoute = require('../routes/movies.route') 
const rentalRoute = require('../routes/rental.route') 
const helmet = require('helmet')
const compression = require('compression')

module.exports = function (app,express) {
    app.use(helmet())
    app.use(compression())
    app.use(cors())
    app.use(express.json({ extended: true }));
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/customers', customersRoute)
    app.use('/api/genres', genresRoute)
    app.use('/api/movies', moviesRoute)
    app.use('/api/rental', rentalRoute)
}