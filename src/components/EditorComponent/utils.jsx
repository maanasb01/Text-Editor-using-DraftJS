import { EditorState } from "draft-js";

//Function to set the selection of the contentBlock after the changes from handleBeforeInput.
//Set the Cursor after changes from handleBeforeInput
export function setSelection(editorState, setEditorState) {
  const appliedSelection = editorState.getSelection();
  const appliedContentState = editorState.getCurrentContent();
  const updatedCurrentBlock = appliedContentState.getBlockForKey(
    appliedSelection.getStartKey()
  );
  const newText = updatedCurrentBlock.getText();
  const finalSelection = appliedSelection.merge({
    anchorOffset: newText.length !== 0 ? 0 : 1,
    focusOffset: newText.length !== 0 ? 0 : 1,
  });

  const finalEditorState = EditorState.forceSelection(
    editorState,
    finalSelection
  );

  setEditorState(finalEditorState);
}
