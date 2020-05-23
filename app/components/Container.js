import React from 'react';
import PropTypes from 'prop-types';

export default function Container(props) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">{props.title}</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

Container.propTypes = {
  title: PropTypes.object,
  children: PropTypes.object,
};
