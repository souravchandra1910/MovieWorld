import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { moviesRef } from "../Firebase/Firebase";
import { db } from "../Firebase/Firebase";
import { Bars } from 'react-loader-spinner';
import Reviews from './Reviews';

function Details() {

  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating:0,
    rated:0
  }
  );
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, [])
  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center '>
      {loading ? <div className='h-96 flex w-full justify-center items-center'><Bars height={40} color='white' /></div> :
        <>
          <img className="h-96 block md:sticky top-24" src={data.image} alt="#" />
          <div className="md:ml-4 ml-0 w-full md:w-1/2">
            <h1 className="text-left text-3xl font-bold text-gray-400">{data.title} <span className='text-xl text-red-500'>{`(${data.year})`}</span></h1>
            <ReactStars
              size={20}
              half={true}
              value={data.rating/data.rated}
              edit={false}
            />
            <p className='mt-3 text-left'>
              {data.description}</p
            >
            <div className='text-left'>
              <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Details
