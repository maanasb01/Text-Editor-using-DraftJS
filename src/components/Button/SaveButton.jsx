import React, { useState } from "react";
import "./button.css";
import { useEditorContext } from "../../contexts/EditorContext";
import { convertToRaw } from "draft-js";

export default function SaveButton() {
  const { editorState} = useEditorContext();
  const [buttonText, setButtonText] = useState("Save");

  const saveEditorState = () => {
    const contentState = editorState.getCurrentContent();
    localStorage.setItem(
      "editorState",
      JSON.stringify(convertToRaw(contentState))
    );
    setButtonText("Saved!");
    setTimeout(() => {
      setButtonText("Save");
    }, 1500);
  };

  return (
    <>
      <button className="button" onClick={saveEditorState}>
        {buttonText}
      </button>
    </>
  );
}
