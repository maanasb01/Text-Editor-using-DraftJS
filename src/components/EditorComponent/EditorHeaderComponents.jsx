import React, { useRef } from "react";
import "draft-js/dist/Draft.css";
import "./EditorComponent.css";
import { BLOCK_TYPES, INLINE_STYLES } from "./constants";
import { useEditorContext } from "../../contexts/EditorContext";

function StyleButton(props) {
    const onToggle = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
  
    let className = "editorHeader-styleButton";
    if (props.active) {
      className += " editorHeader-activeButton";
    }
  
    return (
      <span className={className} onMouseDown={onToggle}>
        {props.label}
      </span>
    );
  }
  
  export function BlockStyleControls(props) {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  
    return (
      <div className="editorHeader-controls">
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  }
  
  export function InlineStyleControls(props) {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    const colorInputRef = useRef(null);
    const { selectedColor} = useEditorContext();
  
    function onColorChange(e) {
      e.preventDefault();
      props.changeColor(colorInputRef.current.value);
    }
  
    return (
      <div className="editorHeader-controls">
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
        <input
          ref={colorInputRef}
          value={selectedColor}
          onChange={(e) => onColorChange(e)}
          type="color"
          name=""
          id=""
          className="color-selector editorHeader-styleButton"
        />
      </div>
    );
  }