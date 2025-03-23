import React, { useState } from 'react';

function PDFUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    // Example: Sending to a server
    try {
      const response = await fetch('/upload-endpoint', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('File uploaded successfully');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload PDF
      </button>
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
}

export default PDFUploader;