import React from 'react';

const ListItem = (props) => {
  return (
    <li className="list__item" onClick={() => props.makeEditItem(
      { index: props.index, value: props.text, type: props.type },
    )}>
      {props.text}
      <span className="btn" onClick={() => props.removeItem(
        { index: props.index, type: props.type },
      )}>
<i className="fa fa-trash"/>
      </span>
    </li>
  );
};

export default ListItem;
