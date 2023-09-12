import Header from './components/Header/Header.jsx';
import PostList from './components/PostList/PostList.jsx';
import FeedList from './components/FeedList/FeedList.jsx';
import Postcontent from './components/PostPreview/PostPreview.jsx';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className='main-flex'>
        <FeedList />
        <PostList />
        <Postcontent />
      </main>
    </>
  );
}

export default App;
