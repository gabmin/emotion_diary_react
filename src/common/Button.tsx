import { css } from '@emotion/react';

const Button = ({
  text,
  type,
  onclick,
}: {
  text: string;
  type?: string;
  onclick: () => void | Promise<void>;
}) => {
  return (
    <button
      className={`${type}`}
      css={css`
        background-color: rgb(236, 236, 236);
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        white-space: nowrap;
        &.POSITIVE {
          background-color: rgb(100, 201, 100);
          color: white;
        }
        &.NEGATIVE {
          background-color: rgb(253, 86, 95);
          color: white;
        }
      `}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
