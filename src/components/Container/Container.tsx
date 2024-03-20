import React from 'react';

import './Container.css';

export function Container({ children} : { children: React.ReactNode } ) {

  return (
    <div className="container">
      {children}
    </div>
  );
}