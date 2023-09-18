import React, { useState, useEffect } from 'react';
import { BsPlusSquare, BsFolder } from 'react-icons/bs';
import axios from 'axios';

function Media() {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [uploadImagesClicked, setUploadImagesClicked] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState('');

  
  const handleDeleteItem = (itemId) => {
    // Check if the item to delete is a folder or an image based on the ID
    if (folders.some((folder) => folder.id === itemId)) {
      const updatedFolders = folders.filter((folder) => folder.id !== itemId);
      setFolders(updatedFolders);
    } else if (images.some((image) => image.id === itemId)) {
      const updatedImages = images.filter((image) => image.id !== itemId);
      setImages(updatedImages);
    }
  };

  const [editItemId, setEditItemId] = useState(null);
  const [editableItemName, setEditableItemName] = useState('');
  const toggleEditMode = (itemId, itemName) => {
    setEditItemId(itemId);
    setEditableItemName(itemName);
  };

  const handleNewFolderClick = () => {
    setShowModal(true);
  };

  const handleUploadImagesClick = () => {
    setUploadImagesClicked(!uploadImagesClicked);
  };

  const handleCancelClick = () => {
    setShowModal(false);
    setError('');
    setSelectedImage(null);
    setSelectedImageName('');
  };

  const fetchFolderData = async () => {
    try {
      const response = await axios.get('http://103.76.139.14/ads/');
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchFolderData().then((data) => {
      if (data) {
        setFolders(data.folders);
        setImages(data.images);
      }
    });
  }, []);

  const handleOKClick = () => {
    if (folderName.trim() !== '') {
      if (folders.some((folder) => folder.name === folderName)) {
        setError('A folder with this name already exists.');
      } else {
        setFolders([{ name: folderName, id: Date.now() }, ...folders]);
        setFolderName('');
        setShowModal(false);
        setError('');
      }
    } else if (selectedImage) {
      setImages([{ image: selectedImage, id: Date.now(), name: selectedImageName }, ...images]);
      setSelectedImage(null);
      setSelectedImageName('');
      setUploadImagesClicked(false);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setSelectedImageName(selectedImage.name);
  };
  
  const saveEditedItemName = () => {
    if (editableItemName.trim() !== '') {
      if (folders.some((folder) => folder.name === editableItemName) || images.some((image) => image.name === editableItemName)) {
        setError('An item with this name already exists.');
      } else {
        const updatedFolders = folders.map((folder) => {
          if (folder.id === editItemId) {
            return { ...folder, name: editableItemName };
          }
          return folder;
        });
        const updatedImages = images.map((image) => {
          if (image.id === editItemId) {
            return { ...image, name: editableItemName };
          }
          return image;
        });

        setFolders(updatedFolders);
        setImages(updatedImages);
        setEditItemId(null);
        setError('');
      }
    }
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>MEDIA</h3>
      </div>

      <div className='main-cards'>
        <div className='card card-hover' onClick={handleUploadImagesClick}>
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
        <div className='modal-overlay' style={{ zIndex: 9999 }}>
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
              {error && <p className='error-message black-text'>{error}</p>}
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

      {uploadImagesClicked && (
        <div className='folder-naming-form'>
          <input type='file' accept='image/*' onChange={handleImageUpload} />
          <div className="selected-image-name">{selectedImageName}</div>
          <button className='modal-ok' onClick={handleOKClick}>
            Add Image
          </button>

          {selectedImage && (
            <div className='image-preview'>
              <img src={URL.createObjectURL(selectedImage)} alt='Image Preview' />
            </div>
          )}
        </div>
      )}

      <div className='folders'>
        {folders.map((folder) => (
          <div className='material-col' key={folder.id} style={{ width: '200px' }}>
            <div className='material-col-top'>
              <div className='material-col-img' title={folder.name} style={{ width: '143px', height: '106px' }}>
                <img
                  draggable='false'
                  src='src/Images/folderimg.png'
                  alt=''
                  title={folder.name}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <div className='material-checkbox material-checkbox-default'>
                {editItemId === folder.id ? (
                  <input
                    type='text'
                    value={editableItemName}
                    onChange={(e) => setEditableItemName(e.target.value)}
                  />
                ) : (
                  <label className='ant-checkbox-wrapper'>
                    <span className="item-name">{folder.name}</span>
                  </label>
                )}
              </div>

              <div className='material-div-tool-disable'>
                <ul>
                  <li
                    title='Edit Folder'
                    className='white-text'
                    onClick={() => toggleEditMode(folder.id, folder.name)}
                  >
                    <i className='iconfont icon-edit-o edit-icon'></i>
                    <span style={{ marginTop: '5px' }}>Edit</span>
                  </li>
                  <li title='Delete' className='white-text' onClick={() => handleDeleteItem(folder.id)}>
                    <i className='iconfont icon-delete-o delete-icon'></i>
                    <span style={{ marginTop: '5px' }}>Delete</span>
                  </li>
                  {editItemId === folder.id && (
                    <li
                      className='white-text'
                      onClick={saveEditedItemName}
                    >
                      <span style={{ marginTop: '5px' }}>Save</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {images.map((image) => (
          <div className='material-col' key={image.id} style={{ width: '200px' }}>
            <div className='material-col-top'>
              <div className='material-col-img' title={image.name} style={{ width: '143px', height: '106px' }}>
                <img
                  draggable='false'
                  src={URL.createObjectURL(image.image)}
                  alt=''
                  title={image.name}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <div className='material-checkbox material-checkbox-default'>
                {editItemId === image.id ? (
                  <input
                    type='text'
                    value={editableItemName}
                    onChange={(e) => setEditableItemName(e.target.value)}
                  />
                ) : (
                  <label className='ant-checkbox-wrapper'>
                    <span className="item-name">{image.name}</span>
                  </label>
                )}
              </div>

              <div className='material-div-tool-disable'>
                <ul>
                  <li
                    title='Edit Image'
                    className='white-text'
                    onClick={() => toggleEditMode(image.id, image.name)}
                  >
                    <i className='iconfont icon-edit-o edit-icon'></i>
                    <span style={{ marginTop: '5px' }}>Edit</span>
                  </li>
                  <li title='Delete' className='white-text' onClick={() => handleDeleteItem(image.id)}>
                    <i className='iconfont icon-delete-o delete-icon'></i>
                    <span style={{ marginTop: '5px' }}>Delete</span>
                  </li>
                  {editItemId === image.id && (
                    <li
                      className='white-text'
                      onClick={saveEditedItemName}
                    >
                      <span style={{ marginTop: '5px' }}>Save</span>
                    </li>
                  )}
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
