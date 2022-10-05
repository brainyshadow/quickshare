import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <>
      <div className="bg-white w-auto">
        <Editor
          placeholder="Start typing and then click share or scan the qr code"
          editorState={editorState}
          onChange={setEditorState}
        />
      </div>
    </>
  );
}

export default TextEditor;
