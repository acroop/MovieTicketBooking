import express from 'express'
import movieRoutes from '../modules/movie/movie.route'

const router = express.Router()

router.use('/movies', movieRoutes)


export default router