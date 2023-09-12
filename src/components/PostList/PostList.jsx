import { useSelector } from 'react-redux';
import PostItem from '../PostItem/PostItem.jsx';

import './PostList.css';

const PostList = () => {
  const { posts } = useSelector((state) => state.input);
  if (posts.length !== 0) {
    return (
      <div className='posts'>
        <h4 className='list-title'>Posts:</h4>
        <ul className='feedlist'>
          {posts.map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        </ul>
      </div>
    );
  }
};
export default PostList;
