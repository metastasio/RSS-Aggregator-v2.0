import Header from './components/Header.jsx';
import Posts from './components/PostList/Posts.jsx';
import Feeds from './components/FeedList/Feeds.jsx';
import Popup from './components/Popup.jsx';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className='main-flex'>
        <Feeds />
        <Posts />
        <Popup />
      </main>
    </>
  );
}

export default App;
