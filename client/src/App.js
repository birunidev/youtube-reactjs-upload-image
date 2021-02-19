import "./App.css";
import { useState } from "react";

function App() {
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);

  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  function handleSave() {
    // save image to backend
    let formData = new FormData();
    formData.append("photo", saveImage);

    fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.image;
      });
  }

  return (
    <div className="App">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="w-25 mt-5 mx-auto">
          <div>
            <img src={image} className="img-thumbnail" alt="..." />
          </div>
          <div className="my-3">
            <label htmlFor="formFile" className="form-label">
              Upload image here
            </label>
            <input
              onChange={handleUploadChange}
              className="form-control"
              type="file"
              id="formFile"
            />
            <button onClick={handleSave} className="btn btn-primary mt-2 w-100">
              Save my photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
