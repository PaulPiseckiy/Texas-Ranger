//@flow
import React from 'react';
import type {ReactChildren} from 'react-flow-types';
import './index.css'

const Block = ({ 
  children, 
  onClick, 
  onDismiss, 
  isFavouriteJoke
}: {
  children: ReactChildren,
  onClick: () => mixed,
  onDismiss: () => mixed,
  isFavouriteJoke: string
}) => 
  <div className="content">
      <button 
        className={`content-tofav ${isFavouriteJoke}`}
        onClick={onClick}
      >
        <i className="fa fa-star" />
      </button>
    <div>
      {children}
    </div>
    <button 
      className="content-close"
      onClick={onDismiss}
    >
      X
    </button>
  </div>

export default Block;
