// // // // // import React, { useState } from "react";
// // // // // import { Document, Page, pdfjs } from "react-pdf";

// // // // // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // // // // const Reports = () => {
// // // // //   const [pdfFiles, setPdfFiles] = useState([]);
// // // // //   const [selectedPdf, setSelectedPdf] = useState(null);

// // // // //   const handleFileUpload = (event) => {
// // // // //     const file = event.target.files[0];
// // // // //     if (file && file.type === "application/pdf") {
// // // // //       const newPdf = { name: file.name, url: URL.createObjectURL(file) };
// // // // //       setPdfFiles([...pdfFiles, newPdf]);
// // // // //     } else {
// // // // //       alert("Please upload a valid PDF file.");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ padding: "20px", fontFamily: "Arial" }}>
// // // // //       <h1>Medical Reports</h1>

// // // // //       <input type="file" accept="application/pdf" onChange={handleFileUpload} />

// // // // //       <ul>
// // // // //         {pdfFiles.map((pdf, index) => (
// // // // //           <li key={index}>
// // // // //             {pdf.name} - 
// // // // //             <button onClick={() => setSelectedPdf(pdf.url)}>View</button>
// // // // //             <a href={pdf.url} download={pdf.name}>
// // // // //               <button>Download</button>
// // // // //             </a>
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>

// // // // //       {selectedPdf && (
// // // // //         <div>
// // // // //           <h2>PDF Preview</h2>
// // // // //           <Document file={selectedPdf}>
// // // // //             <Page pageNumber={1} />
// // // // //           </Document>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Reports;


























// // // // import React, { useState, useEffect } from "react";
// // // // import { Document, Page, pdfjs } from "react-pdf";

// // // // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // // // const Reports = () => {
// // // //   const [pdfFiles, setPdfFiles] = useState([]);
// // // //   const [selectedPdf, setSelectedPdf] = useState(null);

// // // //   // Load stored PDFs when the component mounts
// // // //   useEffect(() => {
// // // //     const savedPdfs = JSON.parse(localStorage.getItem("pdfFiles")) || [];
// // // //     setPdfFiles(savedPdfs);
// // // //   }, []);

// // // //   // Save PDFs to localStorage whenever the list changes
// // // //   useEffect(() => {
// // // //     localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));
// // // //   }, [pdfFiles]);

// // // //   const handleFileUpload = (event) => {
// // // //     const file = event.target.files[0];
// // // //     if (file && file.type === "application/pdf") {
// // // //       const newPdf = { name: file.name, url: URL.createObjectURL(file) };
// // // //       const updatedPdfs = [...pdfFiles, newPdf];
// // // //       setPdfFiles(updatedPdfs);
// // // //     } else {
// // // //       alert("Please upload a valid PDF file.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={{ padding: "20px", fontFamily: "Arial" }}>
// // // //       <h1>Medical Reports</h1>

// // // //       <input type="file" accept="application/pdf" onChange={handleFileUpload} />

// // // //       <ul>
// // // //         {pdfFiles.map((pdf, index) => (
// // // //           <li key={index}>
// // // //             {pdf.name} - 
// // // //             <button onClick={() => setSelectedPdf(pdf.url)}>View</button>
// // // //             <a href={pdf.url} download={pdf.name}>
// // // //               <button>Download</button>
// // // //             </a>
// // // //           </li>
// // // //         ))}
// // // //       </ul>

// // // //       {selectedPdf && (
// // // //         <div>
// // // //           <h2>PDF Preview</h2>
// // // //           <Document file={selectedPdf}>
// // // //             <Page pageNumber={1} />
// // // //           </Document>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Reports;


























// // // // import React, { useState, useEffect } from "react";
// // // // import { Document, Page, pdfjs } from "react-pdf";

// // // // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // // // const Reports = () => {
// // // //   const [pdfFiles, setPdfFiles] = useState([]);
// // // //   const [selectedPdf, setSelectedPdf] = useState(null);

// // // //   // Load stored PDFs from localStorage when the component mounts
// // // //   useEffect(() => {
// // // //     const savedPdfs = JSON.parse(localStorage.getItem("pdfFiles")) || [];
// // // //     setPdfFiles(savedPdfs);
// // // //   }, []);

// // // //   // Save PDFs to localStorage whenever the list updates
// // // //   useEffect(() => {
// // // //     localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));
// // // //   }, [pdfFiles]);

// // // //   const handleFileUpload = (event) => {
// // // //     const file = event.target.files[0];
// // // //     if (file && file.type === "application/pdf") {
// // // //       const reader = new FileReader();
// // // //       reader.readAsDataURL(file);
// // // //       reader.onloadend = () => {
// // // //         const newPdf = { name: file.name, url: reader.result };
// // // //         setPdfFiles((prev) => [...prev, newPdf]);
// // // //       };
// // // //     } else {
// // // //       alert("Please upload a valid PDF file.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={{ padding: "20px", fontFamily: "Arial" }}>
// // // //       <h1>Medical Reports</h1>

// // // //       <input type="file" accept="application/pdf" onChange={handleFileUpload} />

// // // //       <ul>
// // // //         {pdfFiles.map((pdf, index) => (
// // // //           <li key={index}>
// // // //             {pdf.name} - 
// // // //             <button onClick={() => setSelectedPdf(pdf.url)}>View</button>
// // // //             <a href={pdf.url} download={pdf.name}>
// // // //               <button>Download</button>
// // // //             </a>
// // // //           </li>
// // // //         ))}
// // // //       </ul>

// // // //       {selectedPdf && (
// // // //         <div style={{ marginTop: "20px" }}>
// // // //           <h2>PDF Preview</h2>
// // // //           <Document file={selectedPdf}>
// // // //             <Page pageNumber={1} />
// // // //           </Document>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Reports;























// // // import React, { useState, useEffect } from "react";
// // // import { Document, Page, pdfjs } from "react-pdf";

// // // // ✅ Use a LOCAL WORKER instead of the CDN
// // // import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

// // // pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// // // const Reports = () => {
// // //   const [pdfFiles, setPdfFiles] = useState([]);
// // //   const [selectedPdf, setSelectedPdf] = useState(null);

// // //   useEffect(() => {
// // //     const savedPdfs = JSON.parse(localStorage.getItem("pdfFiles")) || [];
// // //     setPdfFiles(savedPdfs);
// // //   }, []);

// // //   useEffect(() => {
// // //     localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));
// // //   }, [pdfFiles]);

// // //   const handleFileUpload = (event) => {
// // //     const file = event.target.files[0];
// // //     if (file && file.type === "application/pdf") {
// // //       const reader = new FileReader();
// // //       reader.readAsDataURL(file);
// // //       reader.onloadend = () => {
// // //         const newPdf = { name: file.name, url: reader.result };
// // //         setPdfFiles((prev) => [...prev, newPdf]);
// // //       };
// // //     } else {
// // //       alert("Please upload a valid PDF file.");
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px", fontFamily: "Arial" }}>
// // //       <h1>Medical Reports</h1>

// // //       <input type="file" accept="application/pdf" onChange={handleFileUpload} />

// // //       <ul>
// // //         {pdfFiles.map((pdf, index) => (
// // //           <li key={index}>
// // //             {pdf.name} - 
// // //             <button onClick={() => setSelectedPdf(pdf.url)}>View</button>
// // //             <a href={pdf.url} download={pdf.name}>
// // //               <button>Download</button>
// // //             </a>
// // //           </li>
// // //         ))}
// // //       </ul>

// // //       {selectedPdf && (
// // //         <div style={{ marginTop: "20px" }}>
// // //           <h2>PDF Preview</h2>
// // //           <Document file={selectedPdf}>
// // //             <Page pageNumber={1} />
// // //           </Document>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Reports;

















// // import React, { useState, useEffect } from "react";
// // import { Document, Page, pdfjs } from "react-pdf";

// // // ✅ Use Local Worker instead of CDN
// // import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

// // pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// // const Reports = () => {
// //   const [pdfFiles, setPdfFiles] = useState([]);
// //   const [selectedPdf, setSelectedPdf] = useState(null);

// //   // 🛑 Load PDFs from localStorage when component mounts
// //   useEffect(() => {
// //     const savedPdfs = JSON.parse(localStorage.getItem("pdfFiles")) || [];
// //     setPdfFiles(savedPdfs);
// //   }, []);

// //   // 🛑 Save PDFs to localStorage whenever they change
// //   useEffect(() => {
// //     localStorage.setItem("pdfFiles", JSON.stringify(pdfFiles));
// //   }, [pdfFiles]);

// //   // 🔥 Convert PDF to Base64 and store it
// //   const handleFileUpload = async (event) => {
// //     const file = event.target.files[0];
// //     if (file && file.type === "application/pdf") {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file);
// //       reader.onloadend = () => {
// //         const newPdf = { name: file.name, url: reader.result };
// //         setPdfFiles((prev) => [...prev, newPdf]);
// //       };
// //     } else {
// //       alert("Please upload a valid PDF file.");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px", fontFamily: "Arial" }}>
// //       <h1>Medical Reports</h1>

// //       {/* 📂 File Upload */}
// //       <input type="file" accept="application/pdf" onChange={handleFileUpload} />

// //       {/* 📋 List of Stored PDFs */}
// //       <ul>
// //         {pdfFiles.map((pdf, index) => (
// //           <li key={index}>
// //             {pdf.name} - 
// //             <button onClick={() => setSelectedPdf(pdf.url)}>View</button>
// //             <a href={pdf.url} download={pdf.name}>
// //               <button>Download</button>
// //             </a>
// //           </li>
// //         ))}
// //       </ul>

// //       {/* 🔍 PDF Viewer */}
// //       {selectedPdf && (
// //         <div style={{ marginTop: "20px" }}>
// //           <h2>PDF Preview</h2>
// //           <Document file={selectedPdf}>
// //             <Page pageNumber={1} />
// //           </Document>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Reports;















// // import React, { useState } from 'react';
// // import { Document, Page, pdfjs } from 'react-pdf';

// // // Set the workerSrc to handle PDF rendering
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // function PDFViewer() {
// //   const [numPages, setNumPages] = useState(null);
// //   const [pageNumber, setPageNumber] = useState(1);

// //   const onDocumentLoadSuccess = ({ numPages }) => {
// //     setNumPages(numPages);
// //   };

// //   return (
// //     <div>
// //       <Document
// //         file="path/to/your/file.pdf" // Replace with your PDF file path or URL
// //         onLoadSuccess={onDocumentLoadSuccess}
// //       >
// //         <Page pageNumber={pageNumber} />
// //       </Document>
// //       <p>
// //         Page {pageNumber} of {numPages}
// //       </p>
// //       <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
// //         Previous
// //       </button>
// //       <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
// //         Next
// //       </button>
// //     </div>
// //   );
// // }

// // export default PDFViewer;




















// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// // Set the workerSrc to handle PDF rendering
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const PDFViewer = ({ selectedPdf }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     setPageNumber(1); // Reset to the first page when a new PDF is loaded
//   };

//   return (
//     <div className="pdf-viewer">
//       <h2>Report Viewer</h2>
//       <Document
//         file={selectedPdf} // Use the selectedPdf prop (Data URL)
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div className="pdf-navigation">
//         <p>
//           Page {pageNumber} of {numPages}
//         </p>
//         <button
//           onClick={() => setPageNumber(pageNumber - 1)}
//           disabled={pageNumber <= 1}
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => setPageNumber(pageNumber + 1)}
//           disabled={pageNumber >= numPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PDFViewer;