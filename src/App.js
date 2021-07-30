import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import WelcomePage from "./components/WelcomePage";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Route path="/" exact component={WelcomePage} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
