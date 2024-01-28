import { useState } from "react";
import SaveButton from "./components/Button/SaveButton";
import EditorComponent from "./components/EditorComponent/EditorComponent";
import EditorTitle from "./components/EditorTitle/EditorTitle";
import InfoModal from "./components/InfoModal/InfoModal";
import "./Layout.css";
import InfoButton from "./components/Button/InfoButton";

export default function Layout() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <InfoModal openModal={modal} closeModal={() => setModal(false)} />

      <div className="main-container">
        <div className="header">
          <InfoButton onClick={() => setModal(true)} />
          <EditorTitle />
          <SaveButton />
        </div>
        <EditorComponent />
        <span className="info-text">
          Developed by Maanas Bhardwaj using Draft-JS
        </span>
      </div>
    </>
  );
}
