const express = require('express');
const { postgraphile } = require("postgraphile");
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();

//if you want in every domain then
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/trackor",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

// Create a new instance of an Apollo server with the GraphQL schema

    app.listen(PORT, () => { 
      
      console.log(`  -API> API server running on port ${PORT}!`);
      console.log(`  -GQL> Use GraphQL at http://localhost:${PORT}/graphiql`);
      
    });
