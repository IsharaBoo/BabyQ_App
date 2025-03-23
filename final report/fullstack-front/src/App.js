// // // // // // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // // // // // import Reports from "./PDFViewer"; // Import the Reports page

// // // // // // function App() {
// // // // // //   return (
// // // // // //     <Router>
// // // // // //       <Routes>
// // // // // //         {/* When visiting '/', redirect to '/reports' */}
// // // // // //         <Route path="/" element={<Navigate replace to="/reports" />} />
// // // // // //         <Route path="/reports" element={<Reports />} />
// // // // // //       </Routes>
// // // // // //     </Router>
// // // // // //   );
// // // // // // }

// // // // // // export default App;



















// // // // // import React, { useState } from 'react';
// // // // // import { Document, Page, pdfjs } from 'react-pdf';
// // // // // import fileDownload from 'js-file-download';
// // // // // import './App.css'; // Optional: For basic styling

// // // // // // Set the workerSrc for react-pdf
// // // // // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // // // // function App() {
// // // // //   // State for PDF Viewer
// // // // //   const [numPages, setNumPages] = useState(null);
// // // // //   const [pageNumber, setPageNumber] = useState(1);
// // // // //   const [pdfFile, setPdfFile] = useState(null); // For uploaded PDF viewing

// // // // //   // State for PDF Uploader
// // // // //   const [uploadedFile, setUploadedFile] = useState(null);

// // // // //   // PDF Viewer: Handle document load
// // // // //   const onDocumentLoadSuccess = ({ numPages }) => {
// // // // //     setNumPages(numPages);
// // // // //   };

// // // // //   // PDF Downloader: Handle download
// // // // //   const handleDownload = async () => {
// // // // //     const pdfUrl = pdfFile || '/sample.pdf'; // Replace with your default PDF or uploaded file
// // // // //     try {
// // // // //       const response = await fetch(pdfUrl);
// // // // //       const blob = await response.blob();
// // // // //       fileDownload(blob, 'downloaded-file.pdf');
// // // // //     } catch (error) {
// // // // //       console.error('Download failed:', error);
// // // // //     }
// // // // //   };

// // // // //   // PDF Uploader: Handle file selection
// // // // //   const handleFileChange = (event) => {
// // // // //     const selectedFile = event.target.files[0];
// // // // //     if (selectedFile && selectedFile.type === 'application/pdf') {
// // // // //       setUploadedFile(selectedFile);
// // // // //       setPdfFile(URL.createObjectURL(selectedFile)); // Create a URL for viewing the uploaded file
// // // // //       setPageNumber(1); // Reset page number
// // // // //     } else {
// // // // //       alert('Please select a PDF file');
// // // // //     }
// // // // //   };

// // // // //   // PDF Uploader: Handle file upload (mocked here)
// // // // //   const handleUpload = async () => {
// // // // //     if (!uploadedFile) return;

// // // // //     const formData = new FormData();
// // // // //     formData.append('pdf', uploadedFile);

// // // // //     // Mock server response (replace with actual endpoint)
// // // // //     try {
// // // // //       console.log('Uploading file:', uploadedFile.name);
// // // // //       // const response = await fetch('/upload-endpoint', {
// // // // //       //   method: 'POST',
// // // // //       //   body: formData,
// // // // //       // });
// // // // //       // if (response.ok) {
// // // // //       alert('File uploaded successfully (mocked)');
// // // // //       // }
// // // // //     } catch (error) {
// // // // //       console.error('Upload failed:', error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="App">
// // // // //       <h1>PDF Manager</h1>

// // // // //       {/* PDF Viewer */}
// // // // //       <section>
// // // // //         <h2>View PDF</h2>
// // // // //         {pdfFile ? (
// // // // //           <div>
// // // // //             <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
// // // // //               <Page pageNumber={pageNumber} />
// // // // //             </Document>
// // // // //             <p>
// // // // //               Page {pageNumber} of {numPages || '?'}
// // // // //             </p>
// // // // //             <button
// // // // //               onClick={() => setPageNumber(pageNumber - 1)}
// // // // //               disabled={pageNumber <= 1}
// // // // //             >
// // // // //               Previous
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => setPageNumber(pageNumber + 1)}
// // // // //               disabled={pageNumber >= numPages}
// // // // //             >
// // // // //               Next
// // // // //             </button>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <p>Upload a PDF to view it here</p>
// // // // //         )}
// // // // //       </section>

// // // // //       {/* PDF Downloader */}
// // // // //       <section>
// // // // //         <h2>Download PDF</h2>
// // // // //         <button onClick={handleDownload} disabled={!pdfFile}>
// // // // //           Download PDF
// // // // //         </button>
// // // // //       </section>

// // // // //       {/* PDF Uploader */}
// // // // //       <section>
// // // // //         <h2>Upload PDF</h2>
// // // // //         <input type="file" accept="application/pdf" onChange={handleFileChange} />
// // // // //         <button onClick={handleUpload} disabled={!uploadedFile}>
// // // // //           Upload PDF
// // // // //         </button>
// // // // //         {uploadedFile && <p>Selected file: {uploadedFile.name}</p>}
// // // // //       </section>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;














// // // // import React, { useState } from 'react';
// // // // import { Document, Page, pdfjs } from 'react-pdf';
// // // // import './App.css'; // Optional: For basic styling

// // // // // Set the workerSrc explicitly to match the installed pdfjs version
// // // // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // // // function App() {
// // // //   const [numPages, setNumPages] = useState(null);
// // // //   const [pageNumber, setPageNumber] = useState(1);
// // // //   const [pdfFile, setPdfFile] = useState(null); // URL or file object for the PDF
// // // //   const [error, setError] = useState(null); // To capture rendering errors

// // // //   // Handle successful PDF load
// // // //   const onDocumentLoadSuccess = ({ numPages }) => {
// // // //     setNumPages(numPages);
// // // //     setError(null); // Clear any previous errors
// // // //   };

// // // //   // Handle PDF load failure
// // // //   const onDocumentLoadError = (error) => {
// // // //     console.error('PDF loading failed:', error);
// // // //     setError('Failed to load PDF. Please check the file or try another.');
// // // //   };

// // // //   // Handle file upload
// // // //   const handleFileChange = (event) => {
// // // //     const selectedFile = event.target.files[0];
// // // //     if (selectedFile && selectedFile.type === 'application/pdf') {
// // // //       const fileURL = URL.createObjectURL(selectedFile);
// // // //       setPdfFile(fileURL);
// // // //       setPageNumber(1); // Reset to first page
// // // //       setNumPages(null); // Reset page count until loaded
// // // //       setError(null); // Clear any previous errors
// // // //     } else {
// // // //       setError('Please select a valid PDF file.');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="App">
// // // //       <h1>PDF Viewer</h1>

// // // //       {/* File Input */}
// // // //       <section>
// // // //         <input type="file" accept="application/pdf" onChange={handleFileChange} />
// // // //         {pdfFile && <p>Loaded file: {pdfFile}</p>}
// // // //       </section>

// // // //       {/* PDF Viewer */}
// // // //       <section>
// // // //         {error ? (
// // // //           <p style={{ color: 'red' }}>{error}</p>
// // // //         ) : pdfFile ? (
// // // //           <div>
// // // //             <Document
// // // //               file={pdfFile}
// // // //               onLoadSuccess={onDocumentLoadSuccess}
// // // //               onLoadError={onDocumentLoadError}
// // // //             >
// // // //               <Page pageNumber={pageNumber} />
// // // //             </Document>
// // // //             {numPages ? (
// // // //               <div>
// // // //                 <p>
// // // //                   Page {pageNumber} of {numPages}
// // // //                 </p>
// // // //                 <button
// // // //                   onClick={() => setPageNumber(pageNumber - 1)}
// // // //                   disabled={pageNumber <= 1}
// // // //                 >
// // // //                   Previous
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => setPageNumber(pageNumber + 1)}
// // // //                   disabled={pageNumber >= numPages}
// // // //                 >
// // // //                   Next
// // // //                 </button>
// // // //               </div>
// // // //             ) : (
// // // //               <p>Loading PDF...</p>
// // // //             )}
// // // //           </div>
// // // //         ) : (
// // // //           <p>Please upload a PDF to view it.</p>
// // // //         )}
// // // //       </section>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;











































// // // import React, { useState } from "react";
// // // import { Document, Page } from "react-pdf";
// // // import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // // import "react-pdf/dist/esm/Page/TextLayer.css";

// // // const App = () => {
// // //   const [pdfs, setPdfs] = useState([]);
// // //   const [selectedPdf, setSelectedPdf] = useState(null);
// // //   const [numPages, setNumPages] = useState(null);

// // //   const onFileUpload = (event) => {
// // //     const file = event.target.files[0];
// // //     if (file && file.type === "application/pdf") {
// // //       const reader = new FileReader();
// // //       reader.onload = (e) => {
// // //         const newPdf = {
// // //           name: file.name,
// // //           data: e.target.result,
// // //         };
// // //         setPdfs((prevPdfs) => [...prevPdfs, newPdf]);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     } else {
// // //       alert("Please upload a valid PDF file.");
// // //     }
// // //   };

// // //   const onDocumentLoadSuccess = ({ numPages }) => {
// // //     setNumPages(numPages);
// // //   };

// // //   const deletePdf = (index) => {
// // //     setPdfs((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <h1>PDF Handler</h1>

// // //       {/* PDF Upload Section */}
// // //       <div style={styles.uploadSection}>
// // //         <input type="file" accept="application/pdf" onChange={onFileUpload} />
// // //       </div>

// // //       {/* List of Uploaded PDFs */}
// // //       <div style={styles.pdfList}>
// // //         <h2>Uploaded PDFs</h2>
// // //         <ul>
// // //           {pdfs.map((pdf, index) => (
// // //             <li key={index} style={styles.pdfItem}>
// // //               <button onClick={() => setSelectedPdf(pdf.data)}>{pdf.name}</button>
// // //               <button onClick={() => deletePdf(index)}>Delete</button>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </div>

// // //       {/* PDF Viewer */}
// // //       {selectedPdf && (
// // //         <div style={styles.pdfViewer}>
// // //           <h2>PDF Viewer</h2>
// // //           <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
// // //             {Array.from(new Array(numPages), (_, index) => (
// // //               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
// // //             ))}
// // //           </Document>
// // //           <a href={selectedPdf} download="downloaded.pdf">
// // //             <button>Download PDF</button>
// // //           </a>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   container: {
// // //     padding: "20px",
// // //     fontFamily: "Arial, sans-serif",
// // //   },
// // //   uploadSection: {
// // //     marginBottom: "20px",
// // //   },
// // //   pdfList: {
// // //     marginBottom: "20px",
// // //   },
// // //   pdfItem: {
// // //     marginBottom: "10px",
// // //   },
// // //   pdfViewer: {
// // //     marginTop: "20px",
// // //   },
// // // };

// // // export default App;
























// // import React, { useState } from "react";
// // import { Document, Page } from "react-pdf";
// // import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // import "react-pdf/dist/esm/Page/TextLayer.css";

// // const App = () => {
// //   const [pdfs, setPdfs] = useState([]); // Stores uploaded PDFs
// //   const [selectedPdf, setSelectedPdf] = useState(null); // Currently selected PDF
// //   const [numPages, setNumPages] = useState(null); // Number of pages in the selected PDF

// //   // Handle PDF file upload
// //   const onFileUpload = (event) => {
// //     const file = event.target.files[0];
// //     if (file && file.type === "application/pdf") {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         const newPdf = {
// //           name: file.name,
// //           data: e.target.result, // Store PDF as Data URL
// //         };
// //         setPdfs((prevPdfs) => [...prevPdfs, newPdf]);
// //       };
// //       reader.readAsDataURL(file);
// //     } else {
// //       alert("Please upload a valid PDF file.");
// //     }
// //   };

// //   // Handle PDF document load
// //   const onDocumentLoadSuccess = ({ numPages }) => {
// //     setNumPages(numPages);
// //   };

// //   // Delete a PDF from the list
// //   const deletePdf = (index) => {
// //     setPdfs((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
// //     if (pdfs[index].data === selectedPdf) {
// //       setSelectedPdf(null); // Clear the viewer if the deleted PDF is being viewed
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h1>PDF Handler</h1>

// //       {/* PDF Upload Section */}
// //       <div style={styles.uploadSection}>
// //         <input type="file" accept="application/pdf" onChange={onFileUpload} />
// //       </div>

// //       {/* List of Uploaded PDFs */}
// //       <div style={styles.pdfList}>
// //         <h2>Uploaded PDFs</h2>
// //         <ul>
// //           {pdfs.map((pdf, index) => (
// //             <li key={index} style={styles.pdfItem}>
// //               <button onClick={() => setSelectedPdf(pdf.data)}>{pdf.name}</button>
// //               <button onClick={() => deletePdf(index)}>Delete</button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* PDF Viewer and Download Section */}
// //       {selectedPdf && (
// //         <div style={styles.pdfViewer}>
// //           <h2>PDF Viewer</h2>
// //           <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
// //             {Array.from(new Array(numPages), (_, index) => (
// //               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
// //             ))}
// //           </Document>
// //           <a href={selectedPdf} download="downloaded.pdf">
// //             <button>Download PDF</button>
// //           </a>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // Styles
// // const styles = {
// //   container: {
// //     padding: "20px",
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   uploadSection: {
// //     marginBottom: "20px",
// //   },
// //   pdfList: {
// //     marginBottom: "20px",
// //   },
// //   pdfItem: {
// //     marginBottom: "10px",
// //   },
// //   pdfViewer: {
// //     marginTop: "20px",
// //   },
// // };

// // export default App;




























// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// const App = () => {
//   const [pdfs, setPdfs] = useState([]); // Stores uploaded PDFs
//   const [selectedPdf, setSelectedPdf] = useState(null); // Currently selected PDF
//   const [numPages, setNumPages] = useState(null); // Number of pages in the selected PDF

//   // Handle PDF file upload
//   const onFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const newPdf = {
//           name: file.name,
//           data: e.target.result, // Store PDF as Data URL
//         };
//         setPdfs((prevPdfs) => [...prevPdfs, newPdf]);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//   };

//   // Handle PDF document load
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   // Delete a PDF from the list
//   const deletePdf = (index) => {
//     setPdfs((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
//     if (pdfs[index].data === selectedPdf) {
//       setSelectedPdf(null); // Clear the viewer if the deleted PDF is being viewed
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>PDF Handler</h1>

//       {/* PDF Upload Section */}
//       <div style={styles.uploadSection}>
//         <input type="file" accept="application/pdf" onChange={onFileUpload} />
//       </div>

//       {/* List of Uploaded PDFs */}
//       <div style={styles.pdfList}>
//         <h2>Uploaded PDFs</h2>
//         <ul>
//           {pdfs.map((pdf, index) => (
//             <li key={index} style={styles.pdfItem}>
//               <button onClick={() => setSelectedPdf(pdf.data)}>{pdf.name}</button>
//               <button onClick={() => deletePdf(index)}>Delete</button>
//               <a href={pdf.data} download={pdf.name}>
//                 <button>Download</button>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* PDF Viewer */}
//       {selectedPdf && (
//         <div style={styles.pdfViewer}>
//           <h2>PDF Viewer</h2>
//           <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
//             {Array.from(new Array(numPages), (_, index) => (
//               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//             ))}
//           </Document>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   uploadSection: {
//     marginBottom: "20px",
//   },
//   pdfList: {
//     marginBottom: "20px",
//   },
//   pdfItem: {
//     marginBottom: "10px",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
//   pdfViewer: {
//     marginTop: "20px",
//   },
// };

// export default App;





































import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./App.css"; // Import CSS file for styling

const App = () => {
  const [pdfs, setPdfs] = useState([]); // Stores uploaded PDFs
  const [selectedPdf, setSelectedPdf] = useState(null); // Currently selected PDF
  const [numPages, setNumPages] = useState(null); // Number of pages in the selected PDF

  // Handle PDF file upload
  const onFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPdf = {
          name: file.name,
          data: e.target.result, // Store PDF as Data URL
        };
        setPdfs((prevPdfs) => [...prevPdfs, newPdf]);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Handle PDF document load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Delete a PDF from the list
  const deletePdf = (index) => {
    setPdfs((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
    if (pdfs[index].data === selectedPdf) {
      setSelectedPdf(null); // Clear the viewer if the deleted PDF is being viewed
    }
  };

  return (
    <div className="container">
      <h1 className="title">Medical Report Manager</h1>

      {/* PDF Upload Section */}
      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-label">
          Upload Medical Report (PDF)
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={onFileUpload}
          className="upload-input"
        />
      </div>

      {/* List of Uploaded PDFs */}
      <div className="pdf-list">
        <h2>Uploaded Reports</h2>
        <ul>
          {pdfs.map((pdf, index) => (
            <li key={index} className="pdf-item">
              <button
                onClick={() => setSelectedPdf(pdf.data)}
                className="pdf-button"
              >
                {pdf.name}
              </button>
              <button
                onClick={() => deletePdf(index)}
                className="delete-button"
              >
                Delete
              </button>
              <a href={pdf.data} download={pdf.name} className="download-button">
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* PDF Viewer */}
      {/* {selectedPdf && (
        <div className="pdf-viewer">
          <h2>Report Viewer</h2>
          <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )} */}
    </div>
  );
};

export default App;