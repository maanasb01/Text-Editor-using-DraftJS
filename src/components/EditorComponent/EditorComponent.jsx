import React, { useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  SelectionState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./EditorComponent.css";
import { setSelection } from "./utils";
import { useEditorContext } from "../../contexts/EditorContext";
import {
  BlockStyleControls,
  InlineStyleControls,
} from "./EditorHeaderComponents";

export default function EditorComponent() {
  const { editorState, setEditorState, selectedColor, setSelectedColor } =
    useEditorContext();

  const editorRef = useRef(null);

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }

  const styleMap = {
    BOLD: {
      fontWeight: "bold",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
    COLOR: {
      color: selectedColor,
    },
  };

  function handleBlockTypeChange(
    currentBlock,
    contentState,
    selection,
    newText,
    blockType
  ) {
    // Explicitly set the block type to "header-one"
    const updatedBlock = currentBlock.set("type", blockType);

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

    // setEditorState(newEditorState);

    const newSelection = selection.merge({
      anchorOffset: newText.length,
      focusOffset: newText.length,
    });
    const finalEditorState = EditorState.forceSelection(
      newEditorState,
      newSelection
    );

    setEditorState(finalEditorState);
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

    // ****Check if the input is a space and the # is the first character in the string for H1****
    else if (
      chars === " " &&
      text.startsWith("#") &&
      selection.getStartOffset() === 1
    ) {
      // Remove the '#' from the beginning of the text
      const newText = text.substring(1);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "header-one"
      );
      return "handled";
    }
    // ****For H2****
    else if (
      chars === " " &&
      text.startsWith("##") &&
      selection.getStartOffset() === 2
    ) {
      const newText = text.substring(2);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "header-two"
      );
      return "handled";
    }
    // ****For H3****
    else if (
      chars === " " &&
      text.startsWith("###") &&
      selection.getStartOffset() === 3
    ) {
      const newText = text.substring(3);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "header-three"
      );
      return "handled";
    }
    // ****For H4****
    else if (
      chars === " " &&
      text.startsWith("####") &&
      selection.getStartOffset() === 4
    ) {
      const newText = text.substring(4);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "header-four"
      );
      return "handled";
    }
    // ****For H5****
    else if (
      chars === " " &&
      text.startsWith("#####") &&
      selection.getStartOffset() === 5
    ) {
      const newText = text.substring(5);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "header-five"
      );
      return "handled";
    }
    // ****CFor H6****
    else if (
      chars === " " &&
      text.startsWith("######") &&
      selection.getStartOffset() === 6
    ) {
      const newText = text.substring(6);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "header-six"
      );
      return "handled";
    }
    // ****For Unordered List****
    else if (
      chars === " " &&
      text.startsWith("-") &&
      selection.getStartOffset() === 1
    ) {
      const newText = text.substring(1);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "unordered-list-item"
      );
      return "handled";
    }
    // ****For Ordered List****
    else if (
      chars === " " &&
      text.startsWith("1") &&
      selection.getStartOffset() === 1
    ) {
      const newText = text.substring(1);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "ordered-list-item"
      );
      return "handled";
    }
    // ****For Code-Block****
    else if (
      chars === " " &&
      text.startsWith("``") &&
      selection.getStartOffset() === 2
    ) {
      const newText = text.substring(2);
      handleBlockTypeChange(
        currentBlock,
        contentState,
        selection,
        newText,
        "code-block"
      );
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

    // ****To make the contents of the contentBlock underlined if **+SPACE is pressed in the beginning****
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

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  function changeColor(colorToSet) {
    // editorRef.current.focus();
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();

    const nextContentState = Modifier.removeInlineStyle(
      currentContent,
      selection,
      "COLOR"
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    setSelectedColor(colorToSet);

    const currentStyle = editorState.getCurrentInlineStyle();

    if (selection.isCollapsed()) {
      // const newSelection = selection.merge({
      //   anchorOffset: selection.getStartOffset(),
      //   focusOffset: selection.getStartOffset(),
      // });

      // nextEditorState = EditorState.forceSelection(nextEditorState,newSelection);

      nextEditorState = currentStyle.reduce((state, style) => {
        return RichUtils.toggleInlineStyle(state, style);
      }, nextEditorState);
    }

    if (!currentStyle.has({ color: colorToSet })) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, "COLOR");
    }

    setEditorState(nextEditorState);
    editorRef.current.focus();
  }

  return (
    <>
      <div className={"editor-header"}>
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
          changeColor={changeColor}
        />
      </div>
      <div
        className={"editor-container"}
        onClick={() => editorRef.current.focus()}
      >
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
    </>
  );
}
