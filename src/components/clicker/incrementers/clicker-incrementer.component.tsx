import * as React from 'react';

interface IProps {
  increment: (value: number) => void;
  value: number;
  name: string;
}
export const ClickerIncrementer: React.StatelessComponent<IProps> = (props) => {
  const {value, name, increment} = props;
  return (
    <button 
          className="btn rev-btn"
          onClick={() => {increment(value)}}
          >{name}</button>
  )

}
