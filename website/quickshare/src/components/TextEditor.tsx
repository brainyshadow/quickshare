import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

function TextEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <>
      <div className="bg-white">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </>
  );
}

export default TextEditor;
