CREATE DATABASE trackor;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);