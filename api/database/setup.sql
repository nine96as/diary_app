DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE entries (
    entry_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    content VARCHAR (500) NOT NULL,
    date DATETIME,
    PRIMARY KEY (entry_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);


CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);