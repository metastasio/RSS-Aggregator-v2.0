import { useSelector } from 'react-redux';
import Post from './Post.jsx';

import './Posts.css';

const Posts = () => {
  const posts = useSelector((state) => state.input.posts);
  if (posts.length !== 0) {
    return (
      <div className='posts'>
        <p className='list-title'>Posts:</p>
        <ul className='feedlist'>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </ul>
      </div>
    );
  }
};
export default Posts;
