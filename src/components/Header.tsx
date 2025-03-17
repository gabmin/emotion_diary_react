import { css } from '@emotion/react';
import { JSX } from 'react';

const Header = ({
  title,
  leftChild,
  rightChild,
}: {
  title: string;
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
}) => {
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
          padding: 20px 0px;
          border-bottom: 1px solid rgb(226, 226, 226);
          div {
            display: flex;
          }
        `}
      >
        <div
          css={css`
            width: 25%;
            justify-content: flex-start;
          `}
        >
          {leftChild}
        </div>
        <div
          css={css`
            width: 50%;
            font-size: 25px;
            justify-content: center;
          `}
        >
          {title}
        </div>
        <div
          css={css`
            width: 25%;
            justify-content: flex-end;
          `}
        >
          {rightChild}
        </div>
      </div>
    </>
  );
};
export default Header;
