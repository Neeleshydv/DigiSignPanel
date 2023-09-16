import React, { useState } from 'react';
import { BsPlusSquare, BsFolder } from 'react-icons/bs';

function Media() {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);

  const handleNewFolderClick = () => {
    setShowModal(true);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  const handleOKClick = () => {
    if (folderName.trim() !== '') {
      setFolders([...folders, { name: folderName, id: Date.now() }]);
      setFolderName('');
      setShowModal(false);
    }
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>MEDIA</h3>
      </div>

      <div className='main-cards'>
        <div className='card card-hover'>
          <div className='card-inner'>
            <BsPlusSquare className='card_icon' />
            <h3 className='card-title'>Upload Images</h3>
          </div>
        </div>
        <div className='card card-hover'>
          <div className='card-inner'>
            <BsPlusSquare className='card_icon' />
            <h3 className='card-title'>Upload Videos</h3>
          </div>
        </div>
        <div className='card card-hover' onClick={handleNewFolderClick}>
          <div className='card-inner'>
            <BsFolder className='card_icon' />
            <h3 className='card-title'>New Folder</h3>
          </div>
        </div>
      </div>

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button className='modal-close' onClick={handleCancelClick}>
              <span className='modal-close-x'></span>
            </button>
            <div className='modal-header'>
              <div className='modal-title'>New Folder</div>
            </div>
            <div className='modal-body'>
              <div className='folder-naming-form'>
                <input
                  type='text'
                  placeholder='Please enter folder name'
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
                <textarea
                  placeholder='Add note information, the maximum number of words is limited to 200'
                  rows='4'
                ></textarea>
              </div>
            </div>
            <div className='modal-footer'>
              <button className='modal-cancel' onClick={handleCancelClick}>
                Cancel
              </button>
              <button className='modal-ok' onClick={handleOKClick}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='folders'>
        {folders.map((folder) => (
          <div className='material-col' key={folder.id}>
            <div className='material-col-top'>
              <div className='material-col-img' title={folder.name} style={{ height: '180px' }}>
                <img
                  draggable='false'
                  src='src/Images/folderimg.png'
                  alt=''
                  title={folder.name}
                  style={{ width: '143px', height: '106px' }}
                />
              </div>
              <div className='material-checkbox material-checkbox-default'>
                <label className='ant-checkbox-wrapper'>
                  <span>{folder.name}</span>
                </label>
              </div>
              <div className='material-div-tool-disable'>
                <ul>
                  <li title='Edit Folder'>
                    <i className='iconfont icon-edit-o edit-icon'></i>
                  </li>
                  <li title='Delete'>
                    <i className='iconfont icon-delete-o delete-icon'></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Media;
