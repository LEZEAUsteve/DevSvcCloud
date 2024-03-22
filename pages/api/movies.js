// pages/api/movies.js
import { findDocuments, insertDocument } from "../../services/mongodbService";
import Movie from "../../models/Movie";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get all movies
 *     description: Retrieve a list of all movies.
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 *   post:
 *     tags:
 *       - Movies
 *     summary: Create a new movie
 *     description: Add a new movie to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie added successfully
 *       400:
 *         description: Bad Request. Missing required fields.
 *       500:
 *         description: Internal Server Error
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         plot:
 *           type: string
 *           description: Description or plot of the movie.
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           description: List of genres associated with the movie.
 *         runtime:
 *           type: integer
 *           description: Runtime of the movie in minutes.
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *           description: List of cast members in the movie.
 *         poster:
 *           type: string
 *           description: URL or path to the movie poster.
 *         title:
 *           type: string
 *           description: Title of the movie.
 *         fullplot:
 *           type: string
 *           description: Full description or plot of the movie.
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *           description: List of languages spoken in the movie.
 *         released:
 *           type: string
 *           format: date
 *           description: Release date of the movie.
 *         directors:
 *           type: array
 *           items:
 *             type: string
 *           description: List of directors of the movie.
 *         rated:
 *           type: string
 *           description: Rating of the movie.
 *         awards:
 *           type: string
 *           description: Awards received by the movie.
 *         lastupdated:
 *           type: string
 *           format: date-time
 *           description: Date and time when the movie data was last updated.
 *         year:
 *           type: integer
 *           description: Year of release of the movie.
 *         imdb:
 *           type: object
 *           properties:
 *             rating:
 *               type: number
 *               description: IMDb rating of the movie.
 *             votes:
 *               type: integer
 *               description: Number of IMDb votes for the movie.
 *             id:
 *               type: string
 *               description: IMDb ID of the movie.
 *           description: IMDb information about the movie.
 *         countries:
 *           type: array
 *           items:
 *             type: string
 *           description: List of countries where the movie was produced or released.
 *         type:
 *           type: string
 *           description: Type or category of the movie.
 *         tomatoes:
 *           type: object
 *           properties:
 *             viewer:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: number
 *                   description: Viewer rating of the movie on Rotten Tomatoes.
 *                 numReviews:
 *                   type: integer
 *                   description: Number of reviews from viewers on Rotten Tomatoes.
 *               description: Viewer ratings and reviews on Rotten Tomatoes.
 *             lastUpdated:
 *               type: string
 *               format: date-time
 *               description: Date and time when the Rotten Tomatoes data was last updated.
 *           description: Rotten Tomatoes information about the movie.
 *         num_mflix_comments:
 *           type: integer
 *           description: Number of comments associated with the movie in the mflix database.
 */
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const movies = await findDocuments("movies");
                return res.status(200).json({ status: 200, data: movies });
            } catch (error) {
                console.error("Error fetching movies:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

        case "POST":
            try {
                const movieData = new Movie(req.body);

                // Ensure that required fields are present in the request
                if (!Movie.validateRequiredFields(movieData)) {
                    return res.status(400).json({ error: "Bad Request. Missing required fields." });
                }

                // Log the request payload for debugging
                // console.log("Request Payload:", req.body);

                const newMovie = await insertDocument("movies", movieData);

                // Log the result of the document insertion
                // console.log("New Movie:", newMovie);


                return res.status(201).json({ status: 201, data: newMovie, message: "Movie added successfully" });
            } catch (error) {
                console.error("Error adding new movie:", error);
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
