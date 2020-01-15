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
// app.use(express.json());
app.use(express.static('public'));

// notes (DATA)
// =============================================================
var notes = readNote();

// ================================================== Routes ==================================================
//gets all notes
app.get('/api/notes', (req, res) => {
  let noteData = readNote();
  // console.log(noteData);
  res.json(noteData);
});



//route to get specific note
app.delete('/api/notes/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  //delete notes(id);
  for (var i = 0; i < notes.length; i ++) {
    console.log(notes[i]['id']);
    if (notes[i]['id'] == id){
      console.log(notes[i]);
      notes.splice(i, 1);
      console.log(notes);
    }
  }
  var data = JSON.stringify(notes, null, 2);
  fs.writeFile('db/db.json', data, finished);

  function finished(err){
    console.log('write complete');
  }
});



//add id to each note (*append it) <-- this will help when going back to delete the note later on
app.post("/api/notes", function(req, res) {
  var newnotes = req.body;
  var id = notes.length + 1;
  console.log(id);
  newnotes['id'] = id;

  console.log(newnotes);
  notes.push(newnotes);
  res.json(newnotes);
  var data = JSON.stringify(notes, null, 2);
  fs.writeFile('db/db.json', data, finished);

  function finished(err){
    console.log('write complete');
  }
});


//given by Oren
function readNote(){
  var data = JSON.parse(fs.readFileSync("db/db.json", function(err, data){
    console.log("inside readNote");
    console.log(data);
  }));
  return data;
}


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


// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
// * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
// you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.






// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
