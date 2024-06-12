import { useState } from 'react';
import './App.css';
import axios from "axios"
function App() {
  const [loading, setLoading] = useState(false);

  const postDetails = (pics) => {
    if (pics === undefined) {
      alert("image not uploaded");
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-App");
      data.append("cloud_name", "dxicxq5tr");

      setLoading(true);

      fetch("https://api.cloudinary.com/v1_1/dxicxq5tr/image/upload", {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      alert("upload an image ");
      setLoading(false);
      return;
    }
  };

  const getQuote = () => {
    axios.get('https://api.quotable.io/random').then(res => {
      console.log(res)

    }).catch(err => {
      console.log(err)
    })
  }


return (
  <div className="App">
    <form action="">
      <input type="file" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
    </form>
    <button disabled={loading} onClick={getQuote}>
      {loading ? 'Uploading...' : 'Submit'}
    </button>
  </div>
);
}

export default App;
