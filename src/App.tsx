import Form from "./components/Form";

const App = () => {
  return (
    <>
      <header className="bg-lime-600 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
            Calorie Tracker
          </h1>
          <p className="mt-2 text-white text-lg">
            Keep track of your calories and stay on top of your health!
          </p>
        </div>
      </header>
      <section className="bg-lime-500 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>
    </>
  );
}

export default App;