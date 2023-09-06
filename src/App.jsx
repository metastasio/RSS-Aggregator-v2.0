import Header from './components/Header.jsx';
import Feeds from './components/Feeds.jsx';
import Posts from './components/Posts.jsx';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className='main-flex'>
        <Feeds />
        <Posts />
      </main>
    </>
  );
}

export default App;
