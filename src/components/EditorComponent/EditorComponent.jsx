import React, { useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  SelectionState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./EditorComponent.css"
import { styleMap } from "./constants";
import { setSelection } from "./utils";
import { useEditorContext } from "../../contexts/editorContext";

export default function EditorComponent() {
  // const [editorState, setEditorState] = useState(previousEditorState?previousEditorState:() =>
  //   EditorState.createEmpty()
  // );
  const {editorState,setEditorState} = useEditorContext();
  
  const editorRef = useRef(null);

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }

  //To check for the specific patterns at specific states in order to implement changes. Ex- #+SPACE should turn the blockType to header-one.
  function handleBeforeInput(chars, editorState) {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const text = currentBlock.getText();

    if (!currentBlock) {
      return "not-handled";
    }

    // To undo any styles from the given line (contentBlock). Can be implemented on a line with text or an empty line.
    else if (chars === " " && selection.getStartOffset() === 0) {
      const blockSelection = SelectionState.createEmpty(
        currentBlock.getKey()
      ).merge({
        anchorOffset: 0,
        focusOffset: text.length,
      });

      // Remove all styles from the block
      let newContentState = contentState;
      Object.keys(styleMap).forEach((style) => {
        newContentState = Modifier.removeInlineStyle(
          newContentState,
          blockSelection,
          style
        );
      });

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(newEditorState);
      setSelection(newEditorState, setEditorState);
      return "handled";
    }

    // ****Check if the input is a space and the # is the first character in the string****
    else if (
      chars === " " &&
      text.startsWith("#") &&
      selection.getStartOffset() === 1
    ) {
      // Remove the '#' from the beginning of the text
      const newText = text.substring(1);

      // Explicitly set the block type to "header-one"
      const updatedBlock = currentBlock.set("type", "header-one");

      // Create a new ContentState with the modified block text and type
      const updatedContentState = contentState.merge({
        blockMap: contentState
          .getBlockMap()
          .set(selection.getStartKey(), updatedBlock.merge({ text: newText })),
      });

      // Update the EditorState with the new ContentState
      const newEditorState = EditorState.push(
        editorState,
        updatedContentState,
        "change-block-data"
      );

      setEditorState(newEditorState);

      return "handled";
    }

    // ****To make the contents of the contentBlock bold if *+SPACE is pressed in the beginning****
    else if (
      chars === " " &&
      text.startsWith("*") &&
      selection.getStartOffset() === 1
    ) {
      // Remove the asterisk from the block's text
      const newText = text.substring(1) + " ";

      // Create a new ContentState with the modified block text
      const updatedContentState = contentState.merge({
        blockMap: contentState
          .getBlockMap()
          .set(selection.getStartKey(), currentBlock.merge({ text: newText })),
      });

      // Apply the inline style to the selected text
      const newSelection = selection.merge({
        anchorOffset: 0,
        focusOffset: newText.length !== 0 ? newText.length : 1,
      });
      const newContentState = Modifier.applyInlineStyle(
        updatedContentState,
        newSelection,
        "BOLD"
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(newEditorState);
      setSelection(newEditorState, setEditorState);

      return "handled";
    }

    // ****To make the contents of the contentBlock red if **+SPACE is pressed in the beginning****
    else if (
      chars === " " &&
      text.startsWith("**") &&
      selection.getStartOffset() === 2
    ) {
      // Remove the asterisk from the block's text
      const newText =
        text.length > 2 ? text.substring(2) : text.substring(2) + " ";

      // Create a new ContentState with the modified block text
      const updatedContentState = contentState.merge({
        blockMap: contentState
          .getBlockMap()
          .set(selection.getStartKey(), currentBlock.merge({ text: newText })),
      });

      // Apply the inline style to the selected text
      const newSelection = selection.merge({
        anchorOffset: 0,
        focusOffset: newText.length !== 0 ? newText.length : 1,
      });
      const newContentState = Modifier.applyInlineStyle(
        updatedContentState,
        newSelection,
        "COLOR_RED"
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(newEditorState);
      setSelection(newEditorState, setEditorState);

      return "handled";
    }

    // ****To make the contents of the contentBlock underlined if ***+SPACE is pressed in the beginning****
    else if (
      chars === " " &&
      text.startsWith("***") &&
      selection.getStartOffset() === 3
    ) {
      // Remove the asterisk from the block's text
      const newText =
        text.length > 3 ? text.substring(3) : text.substring(3) + " ";

      // Create a new ContentState with the modified block text
      const updatedContentState = contentState.merge({
        blockMap: contentState
          .getBlockMap()
          .set(selection.getStartKey(), currentBlock.merge({ text: newText })),
      });

      // Apply the inline style to the selected text
      const newSelection = selection.merge({
        anchorOffset: 0,
        focusOffset: newText.length !== 0 ? newText.length : 0,
      });
      const newContentState = Modifier.applyInlineStyle(
        updatedContentState,
        newSelection,
        "UNDERLINE"
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(newEditorState);
      setSelection(newEditorState, setEditorState);

      return "handled";
    } else {
      return "not-handled";
    }
  }

  return (
      <div className={"editor-container"} onClick={()=>editorRef.current.focus()}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Enter Something..."
          handleBeforeInput={handleBeforeInput}
          customStyleMap={styleMap}
        />
      </div>
    
  );
}
