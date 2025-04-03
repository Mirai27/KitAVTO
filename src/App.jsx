import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { cards_info } from "./data";
import DisplayCard from "./components/DisplayCard";

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <ul>
            {cards_info.map((card_info) => (
              <DisplayCard key={card_info.title} {...card_info} />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
