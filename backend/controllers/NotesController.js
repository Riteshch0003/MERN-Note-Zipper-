const Note = require("../models/notesModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  // console.log(notes);

  res.json(notes);
});

const createNote = asyncHandler(async (req, res, next) => {
  //   console.log("Request Headers:", req.headers); // Log the headers
  //   console.log("Request User:", req.user);
  const { title, content, category } = req.body;
  //   console.log(req.body);

  if (!title || !content || !category) {
    // Instead of just setting the status and throwing an error, pass the error to the next middleware
    const error = new Error("Please Fill all the fields");
    res.status(400);
    return next(error); // Pass the error to the next middleware
  } else {
    // console.log("  req.user._id  ", req.user._id);

    const note = new Note({
      user: req.user._id,
      title,
      content,
      category,
    });
    // console.log(user);

    const createdNote = await note.save();
    console.log(createdNote);

    res.status(201).json(createdNote);
  }
});
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Npte not Found" });
  }
});
const updateNote = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cant perform the Action");
  }
  if (note) {
    note.title = title;
    note.category = category;
    note.content = content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note Not Found");
  }
});
const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  console.log(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cant perform the Action");
  }
  if (note) {
    await note.deleteOne();
    res.json({ message: "Note Removed Successfully" });
  } else {
    res.status(404);
    throw new Error("Note Not Found");
  }
});
module.exports = { getNotes, createNote, getNoteById, updateNote, DeleteNote };
