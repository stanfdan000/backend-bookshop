DROP table if exists books_authors;
drop table if exists books;
drop table if exists authors;




CREATE table books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released VARCHAR NOT NULL
    
);

CREATE table authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob VARCHAR NOT NULL,
    pob VARCHAR NOT NULL
);

CREATE table books_authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id BIGINT,
    author_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id) 
);
INSERT INTO authors (name, dob, pob) VALUES 
('tom lawyer', '8-jun-1772', 'west england'),
('billy bob', '12-july-1987', 'seattle  washington'),
('mike watts', '4-mar-1967', 'new york'),
('lip galmore', '5-dec-1994', 'west texas');


INSERT INTO books (title, released) VALUES
('ten buck two', 2000),
('crossroads', 2001),
('wonders of electricity', 2002),
('the book of shamless', 2003);

INSERT INTO books_authors (book_id, author_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4);