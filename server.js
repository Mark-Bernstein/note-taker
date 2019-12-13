// Dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// creates random ID for note
var ID = function () {
    return (
        "_" +
        Math.random()
            .toString(36)
            .substr(2, 9)
    );
};

// Routes
// If no matching route is found default to home
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function noteCallBack(err, data) {
        return res.json(JSON.parse(data));
    });
});

// recieve a new note to save on the request body, add it to the db.json file...  
// and then return the new note to the client.
app.post("/api/notes", function (req, res) {
    var notes = req.body;
    let noteText = { title: "Test Title2", text: "Test text2" };
    noteText.title = notes.title;
    noteText.text = notes.text;
    noteText.id = ID();

    var data = fs.readFileSync("./db/db.json");
    var noteObject = JSON.parse(data);
    console.log(noteObject);

    noteObject.push(noteText);
    noteJSON = JSON.stringify(noteObject);

    fs.writeFile("./db/db.json", noteJSON, "utf8", err => {
        if (err) throw err;
    });
});

<<<<<<< HEAD:server.js
//Delete api target an object by the object's id in the db json file after a user deletes a note.
app.delete("/api/notes/:id", function deleteNote(req, res) {
    var noteId = req.body.id;
  
    fs.readFile("./db/db.json", "utf8", function getNoteId(err, d) {
      console.log("this is the array", d);
      noteArray = JSON.parse(d);
  
      for (var i = 0; i < noteArray.length; i++) {
        console.log(noteArray[i]);
        if (noteArray[i].id === noteId) {
          noteArray.splice(i, 1);
  
          fs.writeFile("./db/db.json", JSON.stringify(noteArray), "utf8", err => {
            if (err) throw err;
          });
        }
      }
=======
// (deletes the targeted note when the trashcan icon is clicked)
// Delete api target an object by the object's id in the db json file after a user deletes a note.
app.delete("/api/notes/:id", function deleteNote(req, res) {
    var noteId = req.body.id;

    fs.readFile("./db/db.json", "utf8", function getNoteId(err, data) {
        noteArray = JSON.parse(data);

        for (var i = 0; i < noteArray.length; i++) {
            if (noteArray[i].id === noteId) {
                noteArray.splice(i, 1);

                fs.writeFile("./db/db.json", JSON.stringify(noteArray), "utf8", err => {
                    if (err) throw err;
                });
            }
        }
>>>>>>> bab0a3c5df0978a2fe05556b46de4f4211bcbea5:Develop/server.js
    });
});

// Starts the server to begin listening
// ==============================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// var data = fs.readFileSync('./db/db.json');
// var words = JSON.parse(data);
// console.log(words);