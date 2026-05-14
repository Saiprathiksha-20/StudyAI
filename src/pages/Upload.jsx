import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  db,
  auth,
} from "../firebase/firebase";

function Upload() {

  const [file, setFile] =
    useState(null);

  const [uploadedFiles,
    setUploadedFiles] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);


  // LOAD USER PDFS
  useEffect(() => {

    const loadPDFs =
      async () => {

        if (!auth.currentUser)
          return;

        try {

          const querySnapshot =
            await getDocs(
              collection(
                db,
                "users",
                auth.currentUser.uid,
                "pdfs"
              )
            );

          const pdfs =
            querySnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setUploadedFiles(pdfs);

        } catch (error) {

          console.log(error);
        }
      };

    loadPDFs();

  }, []);


  // UPLOAD PDF
  const handleUpload =
    async () => {

      if (!file) {

        alert(
          "Please select a PDF"
        );

        return;
      }

      if (
        file.type !==
        "application/pdf"
      ) {

        alert(
          "Only PDF files allowed"
        );

        return;
      }

      setLoading(true);

      const data =
        new FormData();

      data.append(
        "file",
        file
      );

      data.append(
        "upload_preset",
        "studyai"
      );

      try {

        const response =
          await fetch(
            "https://api.cloudinary.com/v1_1/djdgkphz7/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

        const result =
          await response.json();

        console.log(result);

        if (
          result.secure_url
        ) {

          const newPDF = {

            name: file.name,

            url:
              result.secure_url,
          };

          // SAVE TO FIREBASE
          const docRef =
            await addDoc(
              collection(
                db,
                "users",
                auth.currentUser.uid,
                "pdfs"
              ),

              newPDF
            );

          setUploadedFiles(
            (prev) => [
              ...prev,
              {
                id: docRef.id,
                ...newPDF,
              },
            ]
          );

          alert(
            "PDF uploaded successfully ✅"
          );

          setFile(null);

        } else {

          alert(
            "Upload failed"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Error uploading PDF"
        );
      }

      setLoading(false);
    };


  // DELETE PDF
  const deletePDF =
    async (pdfId) => {

      try {

        await deleteDoc(
          doc(
            db,
            "users",
            auth.currentUser.uid,
            "pdfs",
            pdfId
          )
        );

        const updatedFiles =
          uploadedFiles.filter(
            (pdf) =>
              pdf.id !== pdfId
          );

        setUploadedFiles(
          updatedFiles
        );

      } catch (error) {

        console.log(error);

        alert(
          "Error deleting PDF"
        );
      }
    };


  return (

    <div className="upload-page">

      <h1>
        Study Material Library 📚
      </h1>

      <div className="upload-container">

        <label
          className=
          "custom-file-upload"
        >

          Choose PDF

          <input
            type="file"
            accept="application/pdf"

            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }

            hidden
          />

        </label>


        <button
          onClick={
            handleUpload
          }

          disabled={loading}
        >

          {
            loading
              ? "Uploading..."
              : "Upload PDF"
          }

        </button>


        {
          file && (

            <p
              className=
              "selected-file"
            >

              Selected:
              {" "}
              {file.name}

            </p>
          )
        }

      </div>


      <div className="files-section">

        <h2>
          Uploaded PDFs
        </h2>

        {
          uploadedFiles.length === 0 ? (

            <p>
              No PDFs uploaded yet
            </p>

          ) : (

            uploadedFiles.map(
              (pdf) => (

                <div
                  className="pdf-card"
                  key={pdf.id}
                >

                  <p>
                    📄 {pdf.name}
                  </p>

                  <div
                    className=
                    "pdf-buttons"
                  >

                    <button
                      className=
                      "open-btn"

                      onClick={() =>
                        window.open(
                          pdf.url,
                          "_blank"
                        )
                      }
                    >
                      Open PDF
                    </button>


                    <button
                      className=
                      "delete-btn"

                      onClick={() =>
                        deletePDF(
                          pdf.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>
              )
            )
          )
        }

      </div>

    </div>
  );
}

export default Upload;