import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setVisited, openPopup } from '../../store/inputSlice';

import './Post.css';

const Post = ({ id, title, link, description }) => {
  const dispatch = useDispatch();
  const visitedLinks = useSelector((state) => state.input.visitedLinks);

  const classNames = cn({
    post: true,
    'post-title': true,
    visited: visitedLinks.includes(id),
  });

  return (
    <li className='posts-list'>
      <a
        href={link}
        className={classNames}
        rel='noreferrer'
        target='_blank'
        onClick={() => dispatch(setVisited(id))}
      >
        {title}
      </a>
      <button
        className='preview'
        onClick={() => dispatch(openPopup(description))}
      >
        Preview
      </button>
    </li>
  );
};
export default Post;
