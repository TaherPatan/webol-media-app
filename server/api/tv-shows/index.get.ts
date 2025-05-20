import pkg from 'sqlite3';
const { Database } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import { TvShow, Comment } from '~/types';

const dbPath = path.resolve(process.cwd(), './database/media.db');

export default defineEventHandler(async (event) => {
    const db = new Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        }
    });

    return new Promise<TvShow[]>((resolve, reject) => {
        db.all("SELECT * FROM tv_shows", [], (err, rows: TvShow[]) => {
            if (err) {
                console.error('Error fetching TV shows:', err.message);
                reject(err);
            } else {
                console.log('Fetched TV shows:', rows);
                // For each TV show, fetch the latest 5 comments
                const tvShowsWithComments: Promise<TvShow & { comments: Comment[] }>[] = rows.map(async (show) => {
                    return new Promise((resolveComment, rejectComment) => {
                        db.all("SELECT * FROM comments WHERE media_type = 'tv_show' AND media_id = ? ORDER BY created_at DESC LIMIT 5", [show.id], (err, comments: Comment[]) => {
                            if (err) {
                                console.error(`Error fetching comments for TV show ${show.id}:`, err.message);
                                rejectComment(err);
                            } else {
                                console.log(`Fetched comments for TV show ${show.id}:`, comments);
                                resolveComment({ ...show, comments });
                            }
                        });
                    });
                });

                Promise.all(tvShowsWithComments)
                    .then((data) => {
                        console.log('Resolved TV shows with comments:', data);
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