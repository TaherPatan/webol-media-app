import pkg from 'sqlite3';
const { Database } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import { Movie, Comment } from '~/types';

const dbPath = path.resolve(process.cwd(), './database/media.db');

export default defineEventHandler(async (event) => {
    const db = new Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        }
    });

    return new Promise<Movie[]>((resolve, reject) => {
        db.all("SELECT * FROM movies", [], (err, rows: Movie[]) => {
            if (err) {
                console.error('Error fetching movies:', err.message);
                reject(err);
            } else {
                console.log('Fetched movies:', rows);
                // For each movie, fetch the latest 5 comments
                const moviesWithComments: Promise<Movie & { comments: Comment[] }>[] = rows.map(async (movie) => {
                    return new Promise((resolveComment, rejectComment) => {
                        db.all("SELECT * FROM comments WHERE media_type = 'movie' AND media_id = ? ORDER BY created_at DESC LIMIT 5", [movie.id], (err, comments: Comment[]) => {
                            if (err) {
                                console.error(`Error fetching comments for movie ${movie.id}:`, err.message);
                                rejectComment(err);
                            } else {
                                console.log(`Fetched comments for movie ${movie.id}:`, comments);
                                resolveComment({ ...movie, comments });
                            }
                        });
                    });
                });

                Promise.all(moviesWithComments)
                    .then((data) => {
                        console.log('Resolved movies with comments:', data);
                        resolve(data);
                    })
                    .catch(reject)
                    .finally(() => {
                        db.close();
                    });
            }
        });
    });
});