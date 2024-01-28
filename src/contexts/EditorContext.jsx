import { EditorState, convertFromRaw } from "draft-js";
import { createContext, useContext, useState } from "react";

const EditorContext = createContext(null);

export const useEditorContext = () => {
  return useContext(EditorContext);
};

export const EditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState(() => {
    const savedState = localStorage.getItem("editorState");
    if (savedState) {
      const convertedState = convertFromRaw(JSON.parse(savedState));
      const editorValue = EditorState.createWithContent(convertedState);
      return editorValue;
    } else {
      return EditorState.createEmpty();
    }
  });

  return (
    <EditorContext.Provider value={{ editorState, setEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};
