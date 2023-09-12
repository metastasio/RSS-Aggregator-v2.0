import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setVisited, showPreview } from '../../store/appSlice';

import './PostItem.css';

const PostItem = ({ id, title, link, description }) => {
  const dispatch = useDispatch();
  const { visitedLinks } = useSelector((state) => state.input);

  const classNames = cn({
    post: true,
    'post-title': true,
    visited: visitedLinks.includes(id),
  });

  const onClickHandler = (id, description) => {
    dispatch(setVisited(id));
    dispatch(showPreview(description));
  };

  return (
    <li className='posts-list'>
      <a
        href={link}
        className={classNames}
        rel='noreferrer'
        target='_blank'
        onClick={() => onClickHandler(id, description)}
      >
        {title}
      </a>
      <button
        className='preview'
        onClick={() => onClickHandler(id, description)}
      >
        Preview
      </button>
    </li>
  );
};
export default PostItem;
