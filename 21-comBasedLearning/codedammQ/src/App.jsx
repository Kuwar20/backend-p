import Checkboxes from "./components/Checkboxes"
import Counter from "./components/Counter"
import RandomNoGenerator from "./components/RandomNoGenerator"
import SIcalc from "./components/SIcalc"
import Toggle from "./components/toggle"
import Timer from "./components/Timer"

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

      <section className="flex items-center justify-center">
        <SIcalc />
      </section>

      <section className="flex items-center justify-center">
        <Checkboxes />
      </section>

      <section className="h-screen flex items-center justify-center">
        <Timer />
      </section>
    </>
  )
}

export default App
