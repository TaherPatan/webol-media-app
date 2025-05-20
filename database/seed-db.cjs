const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'media.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database for seeding.');

        db.serialize(() => {
            // Clear existing data
            db.run("DELETE FROM tv_shows");
            db.run("DELETE FROM movies");
            db.run("DELETE FROM comments");

            // Insert sample TV shows
            const insertTvShow = db.prepare("INSERT INTO tv_shows (title, description, release_year) VALUES (?, ?, ?)");
            const tvShows = [
                { title: 'Stranger Things', description: 'A group of kids in a small town uncover a series of supernatural mysteries.', release_year: 2016 },
                { title: 'The Crown', description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.', release_year: 2016 },
                { title: 'The Mandalorian', description: 'A lone gunfighter in the outer reaches of the galaxy.', release_year: 2019 },
            ];
            tvShows.forEach(show => insertTvShow.run(show.title, show.description, show.release_year));
            insertTvShow.finalize();

            // Insert sample movies
            const insertMovie = db.prepare("INSERT INTO movies (title, description, release_year) VALUES (?, ?, ?)");
            const movies = [
                { title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', release_year: 2010 },
                { title: 'Parasite', description: 'A poor family schemes to become employed by a wealthy family by infiltrating their household.', release_year: 2019 },
                { title: 'Dune', description: 'A gifted young man travels to the most dangerous planet in the universe to ensure the future of his family and his people.', release_year: 2021 },
            ];
            movies.forEach(movie => insertMovie.run(movie.title, movie.description, movie.release_year));
            insertMovie.finalize();

            // Insert sample comments
            const insertComment = db.prepare("INSERT INTO comments (media_type, media_id, author, content) VALUES (?, ?, ?, ?)");
            const comments = [
                { media_type: 'tv_show', media_id: 1, author: 'Alice', content: 'Loved the first season!' },
                { media_type: 'tv_show', media_id: 1, author: 'Bob', content: 'Can\'t wait for the next one.' },
                { media_type: 'tv_show', media_id: 2, author: 'Charlie', content: 'Very historically accurate.' },
                { media_type: 'movie', media_id: 1, author: 'David', content: 'Mind-bending plot!' },
                { media_type: 'movie', media_id: 1, author: 'Eve', content: 'Saw it multiple times.' },
                { media_type: 'movie', media_id: 3, author: 'Frank', content: 'Visually stunning.' },
            ];
            comments.forEach(comment => insertComment.run(comment.media_type, comment.media_id, comment.author, comment.content));
            insertComment.finalize();

            console.log('Sample data seeded successfully.');
        });

        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed after seeding.');
            }
        });
    }
});