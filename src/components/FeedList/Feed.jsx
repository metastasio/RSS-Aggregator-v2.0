import { useDispatch } from 'react-redux';
import { removeFeed } from '../../store/inputSlice';

import './Feed.css';

const Feed = ({ id, title, description }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <p className='feed feed-title'>{title}</p>
      <p className='feed feed-description'>{description}</p>
      <span className='close' onClick={() => dispatch(removeFeed(id))}>
        &times;
      </span>
    </li>
  );
};
export default Feed;
