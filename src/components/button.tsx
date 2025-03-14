import './button.css';

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
    <div className={`button ${type}`} onClick={onclick}>
      {text}
    </div>
  );
};

export default Button;
