# A Text Editor built with Draft-JS, offering convenient shortcuts and styling features.

## Features
*   **General:**
    *   All the general shortcuts like CTRL+I for Italics or CTRL+B for Bold, etc. are applicable.
    *   The shortcut stylings, like bold and underline, would apply to the whole block. However, if applied through the Editor's Header, they would function normally as expected.
*   **Styling and Block-Types Shortcuts:**
    *   At the start of a line (whether the line is empty or has some text), inserting "#" then pressing SPACE would make that line a Heading-One. Similarly, "##" for Heading-Two, "###" for Heading-Three, and so on up to Heading-Six.
    *   Similarly, "-" then press SPACE, to make the block-type an unordered list and, "1" then press SPACE, for ordered list.
    *   Similarly, " \`\` " then press SPACE, to make the block-type a code-block.
    *   Similarly, inserting "\*" then pressing SPACE would make the text of that line bold.
    *   Similarly, inserting "\*\*" then pressing SPACE would underline the text of that line.
*   **Remove Styling:**
    *   Pressing Enter would continue the style and block-type of the previous line.
    *   To change the format from heading to normal, put the cursor at the start of the line (with text or new line) and press BACKSPACE, or simply toggle it from the Editor's Header.
    *   To remove the shortcut-styles (bold, color, and underline) of any line (with text or new line), put the cursor at the start of the line and press SPACE.
*   **To Save:**
    *   To SAVE the Editor's content, press Save button and the content would be saved in the browser's local-storage.
    *   Title can be edited by clicking on it. To save the title to browser's local-storage, while typing, either press ENTER or ESC, or simply unfocus from typing.
 
## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [Dependencies](#dependencies)

## Getting Started

### Prerequisites

To run this project, you need to have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (recommended, though you can use npm as well)

### Installation

1. Clone this repository to your local machine.

2. Install the project dependencies using Yarn (Recommended):

    ```bash
    yarn install
    ```

    **OR**

    You can also use npm:

    ```bash
    npm install
    ```

## Usage

### Development

During development, start the development using the following command:

    yarn dev

**OR (Using npm)**
    
    npm run dev

### Production

To build the app, use the following command:

    yarn build


**OR (Using npm)**

    npm run build


## Dependencies

TaskMaster Client uses the following key dependencies:

- [React](https://www.npmjs.com/package/react): A JavaScript library for building user interfaces.
- [Vite](https://www.npmjs.com/package/vite): A fast development build tool.
- [Draft-JS](https://draftjs.org/): Rich Text Editor Framework for React.
