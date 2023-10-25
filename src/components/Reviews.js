import React from 'react'
import ReactStars from 'react-stars';
import { useState, useEffect } from 'react'
import { reviewsRef, db } from '../Firebase/Firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
function Reviews({ id, prevRating, userRated }) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rloading, setRLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newstate,setNewstate]=useState(0);
  const sendReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewsRef, {
        movieId:  id ,
        name: "",
        rating: rating,
        thoughts: form,
        timestamp: new Date().getTime()
      })
      const _doc = doc(db, "movies", id);
      await updateDoc(_doc, {
        rating: Number(prevRating + rating),
        rated: userRated + 1
      })
      setRating(0);
      setForm("");
      setNewstate(newstate+1);
      swal({
        title: "successfullyAdded Review",
        icon: "success",
        buttons: false,
        timer: 3000
      })
    } catch (error) {
      swal({
        title: error,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  useEffect(() => {
    async function getData() {
      setRLoading(true);
      let quer = query(reviewsRef, where('movieId', '==', id))
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()])
      })
      setRLoading(false);
    }
    getData();
  }, [newstate])

  return (
    <div className='mt-2 py-2 border-t-2 border-gray-700 w-full'>
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder='Enter your thoughts...'
        className='w-full p-2 outline-none bg-gray-800'
      />
      <button onClick={sendReview} className='bg-green-600 w-full p-2 flex justify-center'>
        {loading ? <TailSpin height={20} color="white" /> : 'share'}
      </button>
      
      {

        rloading ? <div className='mt-6 flex justify-center'><ThreeDots height={10} color='white' />
        </div> :
            <div className='mt-4'>
            {data.map((e, i) => {
                return(
                    <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                        <div className='flex items-center'>
                            <p className='text-blue-500'>{e.name}</p>
                            <p className='ml-3 text-xs text-pink-200'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars
                            size={15}
                            half={true}
                            value={e.rating}
                            edit={false}
                        />

                        <p className="text-pink-300">{e.thoughts}</p>
                    </div>     
                )
            })}
        </div>
        }
    </div>
  )
}

export default Reviews