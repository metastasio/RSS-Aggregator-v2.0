import './Post.css';

const Post = ({ title, link }) => {
  return (
    <li className='posts-list'>
      <a href={link} className='post post-title'>
        {title}
      </a>
    </li>
  );
};
export default Post;
