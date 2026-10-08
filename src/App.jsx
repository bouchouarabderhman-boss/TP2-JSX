import Header from './header.jsx'
import Sidebar from './sidebar.jsx'
import Content from './content.jsx'

function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Content />
      </div>
    </>
  )
} 

export default App