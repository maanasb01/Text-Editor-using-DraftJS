import React, { useRef, useState } from "react";
import "./editorTitle.css";

const DEFAULTEDITORTITLE = "Draft-JS Editor (Click here to Change the Title)";

export default function EditorTitle() {
  const [title, setTitle] = useState(() => {
    const storedTitle = localStorage.getItem("editorTitle");
    if (storedTitle) {
      return storedTitle;
    } else {
      return DEFAULTEDITORTITLE;
    }
  });
  const titleRef = useRef(null);

  function handleExitTitleEditing(e) {
    if (e.key === "Escape" || e.key === "Enter") {
      titleRef.current.blur();
    }
  }

  function handleSaveTitleChange() {
    if (title.trim() === "") {
      setTitle(DEFAULTEDITORTITLE);
    }
    localStorage.setItem("editorTitle", title);
  }
  return (
    <>
      <input
        ref={titleRef}
        className="title-text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => handleExitTitleEditing(e)}
        onBlur={handleSaveTitleChange}
      ></input>
    </>
  );
}

// <span className="title-text">Draft JS Edito Edito </span>
