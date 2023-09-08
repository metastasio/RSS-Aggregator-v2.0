import './Feed.css';

const Feed = ({ id, title, description }) => {
  return (
    <li>
      <p className='feed feed-title'>{title}</p>
      <p className='feed feed-description'>{description}</p>
      <span className='close'>&times;</span>
    </li>
  );
};
export default Feed;
