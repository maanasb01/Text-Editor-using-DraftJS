import Layout from './Layout'
import { EditorProvider } from './contexts/editorContext'


function App() {


  return (
    <EditorProvider>
      <Layout />
    </EditorProvider>
  )
}

export default App
