import React, { useState, useEffect, useRef } from 'react';
import { useForm, setDeep } from '../FormContext.jsx';

export default function SignatureInput({ name, label, required }) {
  const { handleChange, getDeep, setData } = useForm();
  const value = getDeep(name) || '';
  const isImage = typeof value === 'string' && value.startsWith('data:image/');
  
  // Determine initial mode based on whether value is a base64 image
  const [mode, setMode] = useState(isImage ? 'image' : 'text');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // If the value starts with data:image/ but mode is 'text', force 'image' mode (e.g. when loading draft)
  useEffect(() => {
    if (isImage && mode !== 'image') {
      setMode('image');
    }
  }, [isImage, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // Clear value if switching modes to avoid mixing text and base64
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      setDeep(next, name, '');
      return next;
    });
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setData(prev => {
          const next = JSON.parse(JSON.stringify(prev || {}));
          setDeep(next, name, e.target.result);
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation(); // Prevent trigger click on parent container if any
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      setDeep(next, name, '');
      return next;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="signature-input-container">
      <label className={required ? 'required' : ''}>{label}</label>
      
      <div className="sig-toggle">
        <button 
          type="button" 
          className={`sig-toggle-btn ${mode === 'text' ? 'active' : ''}`}
          onClick={() => handleModeChange('text')}
        >
          Type Signature
        </button>
        <button 
          type="button" 
          className={`sig-toggle-btn ${mode === 'image' ? 'active' : ''}`}
          onClick={() => handleModeChange('image')}
        >
          Upload Image
        </button>
      </div>

      <div className="sig-input-body">
        {mode === 'text' ? (
          <input 
            type="text" 
            name={name}
            value={value} 
            onChange={handleChange}
            placeholder="Type your full legal name as signature"
            className="sig-text-input"
          />
        ) : (
          <div className="sig-image-upload-wrapper">
            {isImage ? (
              <div className="sig-preview-card">
                <div className="sig-preview-wrapper">
                  <img src={value} alt="Signature Preview" className="sig-preview-img" />
                </div>
                <button 
                  type="button" 
                  className="sig-clear-btn" 
                  onClick={handleClear}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div 
                className={`sig-dropzone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div className="sig-dropzone-icon">↑</div>
                <p className="sig-dropzone-text">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="sig-dropzone-subtext">PNG, JPG, or SVG of signature</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
