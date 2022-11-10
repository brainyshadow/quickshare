import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";

function TextEditor(props) {
  const { editorState, setEditorState } = props;

  return (
    <>
      <div className="w-auto">
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
