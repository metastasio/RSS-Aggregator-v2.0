import './Feeds.css';

const Feeds = () => {
  return (
    <>
      <form className='form-style'>
        <div className='input'>
          <label className='label' htmlFor='add_feed'>
            Add new link to the feed list:
          </label>
          <input type='url' id='add_feed' placeholder='RSS link' />
          <button className='form-button'>Add</button>
        </div>
      </form>
    </>
  );
};
export default Feeds;
