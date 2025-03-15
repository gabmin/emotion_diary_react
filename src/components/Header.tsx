import { JSX } from 'react';
import './Header.css';
import DiartList from './DiaryList';

const Header = ({
  title,
  leftChild,
  rightChild,
}: {
  title: string;
  leftChild: JSX.Element;
  rightChild: JSX.Element;
}) => {
  return (
    <>
      <div className="header">
        <div className="header_left">{leftChild}</div>
        <div className="header_center">{title}</div>
        <div className="header_right">{rightChild}</div>
      </div>
      <DiartList />
    </>
  );
};
export default Header;
