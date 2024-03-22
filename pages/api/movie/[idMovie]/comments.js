// pages/api/movie/[idMovie]/comments.js
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

/**
 * @swagger
 * /api/movie/{idMovie}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments for a movie
 *     description: Retrieve all comments associated with a specific movie.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         description: ID of the movie to retrieve comments for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Internal Server Error
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a new comment for a specific movie
 *     description: Add a new comment for a specific movie using the provided data.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         description: ID of the movie to add the comment to
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment object to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Bad Request. Missing required fields.
 *       500:
 *         description: Internal Server Error
 */

export default async function handler(req, res) {
    const { idMovie } = req.query;
    console.log("ID Movie:", idMovie); // Log idMovie for debugging
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "GET":
            try {
                const comments = await db.collection("comments").find({ movie_id: ObjectId(idMovie) }).toArray();
                if (!comments) {
                    return res.status(404).json({ error: "Comments not found" });
                }
                return res.status(200).json({ status: 200, data: comments });
            } catch (error) {
                console.error("Error fetching movie:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
