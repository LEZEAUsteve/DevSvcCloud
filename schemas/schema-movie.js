/**
 * @swagger
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
 *         omatoes:
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