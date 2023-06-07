import { useState } from "react";
import Auth from "./components/Auth";
import { db ,auth,storage} from "./config/firebase";
import { useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {ref,uploadBytes} from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([]);

  // Newmovie states

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updated, setUpdated] = useState("");
  const [files, setfiles] = useState(null);
  //  End

  const movieCollectionRef = collection(db, "movies");

  async function getMovieList() {
    // Read Data
    // set movie list
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getMovieList();
  }, [movieList]);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        wonAnAward: isNewMovieOscar,
         userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  async function deleteMovie(id) {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  }

  async function updatedMovie(id) {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updated });
  }

  async function uploadFile(params) {

    if (!files) {
      return;
    }
    const filesFolderRef = ref(storage,`ProjectFiles/${files.name}`)
    try {
      await uploadBytes(filesFolderRef,files)
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <Auth />
      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>

      {movieList.map(({ id, releaseDate, wonAnAward, title }) => {
        return (
          <div key={id}>
            <h1>
              {title}
              <input
                type="checkbox"
                //  defaultChecked={}
                value={wonAnAward ? true : false}
              />
            </h1>
            <p>Date: {releaseDate}</p>

            <button onClick={() => deleteMovie(id)}>Delete movie</button>
            <input
              type="text"
              onChange={(e) => setUpdated(e.target.value)}
              // value={updated}
            />
            <button onClick={() => updatedMovie(id)}>update movie</button>
          </div>
        );
      })}

      <div>
        <input type="file" onChange={(e) => setfiles(e.target.files[0])}/>
        <button onClick={uploadFile}>Submit File</button>
      </div>
    </main>
  );
}

export default App;
