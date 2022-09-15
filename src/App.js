import React from 'react'
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import MakeRequest from './components/MakeRequest'
import LeftPanel from './components/LeftPanel'
import GetResponse from './components/GetResponse';
import MakeRequest2 from './components/MakeRequest2';
import MakeRequest3 from './components/MakeRequest3';
import './css_styles/style.css'


// function App() {
//   const [data, setData] = React.useState();

//   React.useEffect(() => {
//     fetch("/home")
//       .then((res) => {return res.json()})
//       .then((serverM) => setData(serverM));
//   }, []);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => {return res.json()})
  //     .then((serverM) => setData(serverM.message));
  // }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

// export default App;



function App() {
  
  return (
    <div className="App">
      <NavBar />
      <LeftPanel />
      <MakeRequest />
    </div>
  );
}

export  default App;
