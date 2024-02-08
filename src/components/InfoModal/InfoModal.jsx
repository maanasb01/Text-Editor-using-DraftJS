import React, { useEffect, useRef} from "react";
import "./infoModal.css";

export default function InfoModal({ openModal, closeModal }) {
  const modalRef = useRef();

  useEffect(() => {
    if (openModal) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [openModal]);

  return (

    <dialog className="dialog" ref={modalRef} onCancel={closeModal}>
    <p>This is an editor developed using Draft-JS.</p>
    <ul>
      <li>
        <b>General:</b>
        <ul>
          <li>All the general shortcuts like CTRL+I for Italics or CTRL+B for Bold, etc. are applicable.</li>
          <li>The shortcut stylings, like bold and underline, would apply to the whole block. However, if applied through the Editor's Header, they would function normally as expected.</li>
        </ul>
      </li>
      <li>
        <b>Styling and Block-Types Shortcuts:</b>
        <ul>
          <li>
          At the start of a line (whether the line is empty or has some text), inserting "#" then pressing SPACE would make that line a Heading-One. Similarly, "##" for Heading-Two, "###" for Heading-Three, and so on up to Heading-Six.
          </li>
          <li>Similarly, "-" then press SPACE, to make the block-type an unordered list and, "1" then press SPACE, for ordered list.</li>
          <li>Similarly, " `` " then press SPACE, to make the block-type a code-block.</li>
          <li>
            Similarly, inserting "*" then pressing SPACE would make the text
            of that line bold.
          </li>
          <li>
            Similarly, inserting "**" then pressing SPACE would underline the
            text of that line.
          </li>
        </ul>
      </li>

      <li>
        <b>Remove Styling:</b>
        <ul>
          <li>
            Pressing Enter would continue the style and block-type of the previous line.
          </li>
          <li>
            To change the format from heading to normal, put the cursor at the
            start of the line (with text or new line) and press BACKSPACE, or simply toggle it from the Editor's Header.
          </li>
          <li>
            To remove the shortcut-styles (bold, color, and underline) of any line
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
