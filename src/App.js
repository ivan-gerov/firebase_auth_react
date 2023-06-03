import "./App.css";

import { BasicSignIn, GoogleSignIn } from "./SignIn";

function App() {
  return (
    <div className="App">
      <BasicSignIn />
      <GoogleSignIn />
    </div>
  );
}

export default App;
