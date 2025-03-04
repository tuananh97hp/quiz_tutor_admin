import React, { ReactNode } from 'react';
import './style.css';

interface ButtonPropsType {
  className: string;
  width: number;
  buttonName: string | ReactNode | JSX.Element;
}

const Button = (props: ButtonPropsType) => {
  return <button {...props}>{props.buttonName}</button>;
};

export default Button;
