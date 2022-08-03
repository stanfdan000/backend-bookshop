DROP table if exists authors;

CREATE table authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob VARCHAR NOT NULL,
    pob VARCHAR NOT NULL
);

INSERT INTO authors (name, dob, pob) VALUES 
('tom lawyer', '8-jun-1772', 'west england'),
('billy bob', '12-july-1987', 'seattle  washington'),
('mike watts', '4-mar-1967', 'new york'),
('lip galmore', '5-dec-1994', 'west texas');
