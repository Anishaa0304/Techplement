REST API built using Node.js, Express, MongoDB.

1. GET
   a. localhost:3000/quotes : Here you can view all the quotes
   b. localhost:3000/quotes/random-quote : Retrieves a random quote of the day
   c. localhost:3000/quotes/:quoteAuthor : Retrieves the quote by a specific author

2. POST
   a. localhost:3000/quotes : Enter the author name and quote and it will be added in the database

3. PUT/PATCH
   a. localhost:3000/quotes/:quoteAuthor : Enter the author name and quote with the required changes and then it will update the document in the database with the given author name

4. DELETE
   a. localhost:3000/quotes : Deletes all the quotes
   b. localhost:3000/quotes/:quoteAuthor : Deletes the quote by a specific author
