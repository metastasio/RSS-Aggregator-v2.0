import InputField from '../InputField/InputField.jsx';

import './Header.css';

const Header = () => {
  return (
    <>
      <header className='header'>
        <h1 className='main-title'>RSS Aggregator</h1>
        <h2 className='sub-title'>Start reading RSS today!</h2>
      <InputField />
      </header>
    </>
  );
};
export default Header;
