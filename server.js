// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// var db = require("db");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// notes (DATA)
// =============================================================
var notes = [];

// ================================================== Routes ==================================================
//gets all notes
app.get('api/notes', (req, res) => {
  res.json(data);

//   fs.readFile('/db/db.json', (err, data) => {
//     if (err) throw err;
//     let fuck = JSON.parse(data);
//     console.log(fuck);
// });

// console.log('This is after the read call');

//FUCKING GIVING UP!

  // fs.readFile(__dirname + '/db/db.json', notes, function(err, data){
  //   if (err) throw err;
  //   var fileObj = JSON.parse(data.toString());
  //   var postObj = JSON.parse(notes);

  //   for(var key in postObj) {
  //     fileObj[key] = postObj[key];
  //   }
    // return res.json(notes)
    
  // });
});

//none of this shit above works. giving the fuck up


//route to get specific note
app.get('/api/notes/:id', (req, res) => {
  res.send(req.query.id);
});

// Create New notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  var newnotes = req.body;
  console.log(newnotes);
  notes.push(newnotes);
  res.json(newnotes);
});



//these load the html content from index.html and notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});




//GET / api / notes
//GET / api / notes / 1 (for specific notes)
//PUT / api / notes / 1 (update specific notes)
//DELETE / api / notes / 1 (delete specific note)
//POST / api / notes




// app.readFile (parse)
// push
// write



// app.readFile('./db/db.json', function(err, data){
//   if (err) throw err
//   var arrayOfObjects = JSON.parse(data)


//   app.writeFile("./dp/dp.json", JSON.stringify(arrayOfObjects), function(err){
//     if (err) throw err
//   })
// })






// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
// you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.




// Displays a single note, or returns false
// res.post("/api/notes", function(req, res) {
//   var chosen = req.params.notes;

//   console.log(chosen);

//   for (var i = 0; i < notes.length; i++) {
//     if (chosen === notes[i].routeName) {
//       return res.json(notes[i]);
//     }
//   }

//   return res.json(false);
// });












// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
