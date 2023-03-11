/* Replace with your SQL commands */
CREATE TABLE learn.user (
  id serial PRIMARY KEY,
  userName text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
)