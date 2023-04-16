import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [updateNotes, setUpdateNotes] = useState(true);
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    setUpdateNotes(true);
    axios  
      .get("http://localhost:4000/notes")
      .then((res) => {
        setAllNotes(res.data);
      })
      .catch((err) => alert(err.message));
  }, [updateNotes]);

  const addNote = () => {
    if (!text) {
      return alert("Please write something to add note");
    }
    if (text.length > 300) {
      return alert("You can write maximum 300 words");
    }

    let options = {};
    let arr = text.split("\n");

    if (arr.length > 1) {
      if (arr[0].length > 25) {
        return alert("Title can contain a maximum of 25 letters.");
  }

      if (arr[0].length <= 25) {
        const [title, ...description] = arr;
        if (description.join(" ").trim().length < 1) {
          return alert("Write something to add your note body");
        }
        options.title = title;
        options.description = description.join(" ");
      }
    } else {
      let arr = text.split(" ");
      if (arr[0].length > 25) {
        return alert("Title can contain a maximum of 25 letters.");
  }

      if (arr[0].length <= 25) {
        const [title, ...description] = arr;
        if (description.join(" ").trim().length < 1) {
          return alert("Write at least two words, don't leave it empty.");
    }
        options.title = title;
        options.description = description.join(" ");
      }
    }

    let time = new Date().toISOString().split(" T ");
    let dateTime = `${time[0]} ${time[1]}`;
    options.date = dateTime;

    axios
      .post("http://localhost:4000/notes", options)
      .then(() => {
        alert("Note added successfully");
        setText("");
        setUpdateNotes(false);
      })
      .catch((err) => alert(err.message));
  };

  const deleteNote = (i) => {
    axios
      .delete(`http://localhost:400/notes/${i}`)
      .then(() => {
        alert("Note deleted successfully");
        setUpdateNotes(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="body">
      <div className="navbar">
        <span><i class="fa-solid fa-bars bar"/>Notes</span>
      </div>

      <div className="inputArea">
        <textarea
          value={text}
          placeholder="write your note...."
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="notesBox">
        {allNotes.map((note) => (
          <div className="singleBox" key={note.id}>
            <h3>{note.title}</h3>
            <div>
              <p>{note.description}</p>
            </div>
            <span>{note.date}</span>
            <i
              onClick={() => deleteNote(note.id)}
              className="fa-solid fa-trash dlt"
            ></i>
          </div>
        ))}
      </div>
    </div>
  );

}

export default App;
