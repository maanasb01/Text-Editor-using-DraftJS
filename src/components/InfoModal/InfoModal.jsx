import React, { useEffect, useRef, useState } from "react";
import "./infoModal.css";

export default function InfoModal({ openModal, closeModal }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog className="dialog" ref={ref} onCancel={closeModal}>
      <p>This is an editor developed using Draft-JS.</p>
      <ul>
        <li>
          <b>Styling:</b>
          <ul>
            <li>
              At the start of a line (whether the line is empty or has some
              text), inserting "#" then pressing SPACE would make that line a
              heading.
            </li>
            <li>
              Similarly, inserting "*" then pressing SPACE would make the text
              of that line bold.
            </li>
            <li>
              Similarly, inserting "**" then pressing SPACE would make the text
              of that line red.
            </li>
            <li>
              Similarly, inserting "***" then pressing SPACE would underline the
              text of that line.
            </li>
          </ul>
        </li>

        <li>
          <b>Remove Styling:</b>
          <ul>
            <li>
              Pressing Enter would continue the style of the previous line.
            </li>
            <li>
              To change the format from heading to normal, put the cursor at the
              start of the line (with text or new line) and press BACKSPACE.
            </li>
            <li>
              To remove the styles (bold, red color, and underline) of any line
              (with text or new line), put the cursor at the start of the line
              and press SPACE.
            </li>
          </ul>
        </li>
        
        <li>
          <b>To Save:</b>
          <ul>
            <li>
              To SAVE the Editor's content, press Save button and the content
              would be saved in the browser's local-storage.
            </li>
            <li>
              Title can be edited by clicking on it. To save the title to
              browser's local-storage, while typing, either press ENTER or ESC,
              or simply unfocus from typing.{" "}
            </li>
          </ul>
        </li>

      </ul>

      <button onClick={closeModal}>Close</button>
    </dialog>
  );
}
