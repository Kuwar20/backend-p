import Counter from "./components/Counter"
import Toggle from "./components/toggle"

function App() {

  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <Toggle />
      </section>

      <section className="flex items-center justify-center">
        <Counter />
      </section>
    </>
  )
}

export default App
