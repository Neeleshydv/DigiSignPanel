// Folder.js
import React from 'react';

function Folder({ folder }) {
  return (
    <div className='folder'>
      <i className='iconfont icon-folder'></i>
      <span>{folder.name}</span>
    </div>
  );
}

export default Folder;
