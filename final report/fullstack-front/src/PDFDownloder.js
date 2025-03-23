import React from 'react';
import fileDownload from 'js-file-download';

function PDFDownloader() {
  const handleDownload = async () => {
    // Assuming the PDF is hosted or fetched from a server
    const response = await fetch('path/to/your/file.pdf');
    const blob = await response.blob();
    fileDownload(blob, 'downloaded-file.pdf');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
}

export default PDFDownloader;