import { useSelector } from 'react-redux';

const Feedback = () => {
  const feedback = useSelector((state) => state.input.feedback);
  return feedback ? <p>{feedback}</p> : '';
};
export default Feedback;
