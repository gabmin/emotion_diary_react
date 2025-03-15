import './Button.css';

const Button = ({
  text,
  type,
  onclick,
}: {
  text: string;
  type?: string;
  onclick: () => void;
}) => {
  return (
    <button className={`button ${type}`} onClick={onclick}>
      {text}
    </button>
  );
};

export default Button;
