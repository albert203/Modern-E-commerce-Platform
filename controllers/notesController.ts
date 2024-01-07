import { Request, Response } from 'express';

/////////////////////////////////////////////////////////////////////////////////////

// GET NOTES
export const getNotes = async (req: Request, res: Response) => {
  const result = Bun.file('notes.json', { type: 'application/json' });
  const notes = await result.json();
  res.status(200).json({
    message: 'Success',
    data: { notes },
  });
};

/////////////////////////////////////////////////////////////////////////////////////

// CREATE AND APPEND OBJECTS
export const createNotes = async (req: Request, res: Response) => {
  const result = Bun.file('notes.json', { type: 'application/json' });
  const notes = await result.json();
  // all objects in notes.json (PS: its not just the first)
  // console.log(notes.employees);

  //append new object to the array
  for (let i = 0; i < req.body.employees.length; i++) {
    notes.employees.push(req.body.employees[i]);
  }

  // write the new object/s to the file
  Bun.write('notes.json', JSON.stringify(notes));
  console.log(JSON.stringify(notes));

  res.status(200).json({
    message: 'New notes are added',
  });
};

/////////////////////////////////////////////////////////////////////////////////////

// ADJUST OBJECT PROPERTIES - SALARY
export const updateNotes = async (req: Request, res: Response) => {
  const result = Bun.file('notes.json', { type: 'application/json' });
  const notes = await result.json();
  const newData = req.body;

  // for (let i = 0; i < notes.employees.length; i++) {
  const note = notes.employees.find((note: any) => {
    // console.log(note.name);
    return note.name === req.params.name;
  });
  // }

  // Finds the index of the note where the
  // :name in the URL matches the name in the notes.json
  const noteIndex = notes.employees.findIndex((note: any) => {
    // console.log(note.name);
    // console.log(req.params.name);
    return note.name === req.params.name;
  });

  // if note is not found
  if (!note) {
    return res.status(400).json({
      message: 'Note does not exist',
    });
  }

  for (const [key, value] of Object.entries(newData)) {
    // console.log(`${key}: ${value}`);
    // console.log(Object.entries(newData));
    // console.log(note[key]);
    // console.log(value);
    note[key] = value;
  }

  for (let i = 0; i < notes.employees.length; i++) {
    if (notes.employees[i].name === req.params.name) {
      notes.employees[i] = note;
      console.log(notes.employees[i]);
    }
  }

  notes[noteIndex] = note.employees;

  console.log(JSON.stringify(notes));
  Bun.write('notes.json', JSON.stringify(notes));

  res.status(200).json({
    message: 'New Salary Updated',
  });
};

/////////////////////////////////////////////////////////////////////////////////////

// DELETE OBJECT
export const deleteNotes = async (req: Request, res: Response) => {
  const result = Bun.file('notes.json', { type: 'application/json' });
  const notes = await result.json();

  const noteIndex = notes.employees.findIndex((note: any) => {
    return note.name === req.params.name;
  });

  if (!noteIndex) {
    return res.status(400).json({
      message: 'Note does not exist',
    });
  }

  notes.employees.splice(noteIndex, 1);
  await Bun.write('notes.json', JSON.stringify(notes));
  res.status(200).send({
    message: 'Note deleted',
  });
};

/////////////////////////////////////////////////////////////////////////////////////
