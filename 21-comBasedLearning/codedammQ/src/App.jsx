import Counter from "./components/Counter"
import RandomNoGenerator from "./components/RandomNoGenerator"
import Toggle from "./components/toggle"

function App() {

  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <Toggle />
      </section>

      <section className="h-screen flex items-center justify-center">
        <Counter />
      </section>

      <section className="flex items-center justify-center">
        <RandomNoGenerator />
      </section>
    </>
  )
}

export default App
