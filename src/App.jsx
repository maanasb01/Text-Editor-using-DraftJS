import Layout from "./Layout";
import { EditorProvider } from "./contexts/EditorContext";

function App() {
  return (
    <EditorProvider>
      <Layout />
    </EditorProvider>
  );
}

export default App;
