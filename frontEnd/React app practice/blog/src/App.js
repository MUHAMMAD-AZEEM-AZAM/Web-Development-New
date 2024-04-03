import Navbar from './Navbar';
import Home from './Home';

function App() {
// const title="Welcome"
// const person={name:"azeem"} //not complete object or boolean
// const link="http//:www.google.com"

  return (
    <div className="App">
        <Navbar></Navbar>
      <div className="content">
        <Home></Home>
        {/* <h1>{title}</h1>
        <p>{person.name}</p>
        <p>{[1,2,3,4,5]}</p>
        <p>{Math.random()*10}</p>
        <a href={link}>Google</a> */}
      </div>
    </div>
  );
}

export default App;
