# This is a Text Editor developed using Draft-JS.

*   **Styling:**
    *   At the start of a line (whether the line is empty or has some text), inserting "#" then pressing SPACE would make that line a heading.
    *   Similarly, inserting "\*" then pressing SPACE would make the text of that line bold.
    *   Similarly, inserting "\*\*" then pressing SPACE would make the text of that line red.
    *   Similarly, inserting "\*\*\*" then pressing SPACE would underline the text of that line.
*   **Remove Styling:**
    *   Pressing Enter would continue the style of the previous line.
    *   To change the format from heading to normal, put the cursor at the start of the line (with text or new line) and press BACKSPACE.
    *   To remove the styles (bold, red color, and underline) of any line (with text or new line), put the cursor at the start of the line and press SPACE.
*   **To Save:**
    *   To SAVE the Editor's content, press Save button and the content would be saved in the browser's local-storage.
    *   Title can be edited by clicking on it. To save the title to browser's local-storage, while typing, either press ENTER or ESC, or simply unfocus from typing.
 
## Table of Contents

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
