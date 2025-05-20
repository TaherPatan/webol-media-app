CREATE TABLE tv_shows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    release_year INTEGER
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    release_year INTEGER
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    media_type TEXT NOT NULL, -- 'tv_show' or 'movie'
    media_id INTEGER NOT NULL,
    author TEXT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES tv_shows(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES movies(id) ON DELETE CASCADE
);