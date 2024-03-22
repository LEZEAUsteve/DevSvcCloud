// pages/api/movie/[idMovie].js
import { findOneDocument, updateDocument, deleteDocument, ObjectId } from "../../../servicies/mongodbService";


/**
 * @swagger
 * /api/movie/{idMovie}:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Get movie by ID
 *     description: Get a movie by its ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID of the movie to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 *   put:
 *     tags:
 *       - Movie
 *     summary: Update movie by ID
 *     description: Update a movie by its ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID of the movie to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Updated movie object
 *         schema:
 *           type: object
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     tags:
 *       - Movie
 *     summary: Delete movie by ID
 *     description: Delete a movie by its ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID of the movie to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
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
    const { idMovie } = req.query;

    switch (req.method) {
        case "GET":
            try {
                const movie = await findOneDocument("movies", { _id: ObjectId(idMovie) });
                if (!movie) {
                    return res.status(404).json({ error: "Movie not found" });
                }
                return res.status(200).json({ status: 200, data: movie });
            } catch (error) {
                console.error("Error fetching movie:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

        case "PUT":
            try {
                const existingMovie = await findOneDocument("movies", { _id: ObjectId(idMovie) });

                if (!existingMovie) {
                    return res.status(404).json({ error: "Movie not found" });
                }

                const updatedMovieData = req.body;

                await updateDocument("movies", { _id: ObjectId(idMovie) }, {
                    $set: updatedMovieData,
                });

                console.log("Movie Updated Successfully");
                return res.status(200).json({ status: 200, message: "Movie updated successfully" });
            } catch (error) {
                console.error("Error updating movie:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

        case "DELETE":
            try {
                await deleteDocument("movies", { _id: ObjectId(idMovie) });
                return res.status(200).json({ status: 200, message: "Movie deleted successfully" });
            } catch (error) {
                console.error("Error deleting movie:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
