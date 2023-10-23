import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import ReactStars from 'react-stars';
import { moviesRef } from "../Firebase/Firebase";
import {Link} from 'react-router-dom'
function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data=await getDocs(moviesRef);
      _data.forEach((doc)=>{
            setData((prv)=>[...prv,{...(doc.data()),id:doc.id}])
      })
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-between mt-2">
    {loading ? <div className="w-full flex justify-center items-center h-96"><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      /></div> : 
      data.map((e, i) => {
        return (
          <Link to={`/detail/${e.id}`}><div key={i} className="card font-medium shadow-lg  hover:-translate-y-3 cursor-pointer mt-7 p-0.5 transition-all duration-500">
            <img className="h-60 md:h-55" src={e.image} />
            <h1>
              {e.title}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-500 mr-1">Rating:</span>
              <ReactStars
                size={20}
                half={true}
                value={e.rating/e.rated}
                edit={false}
              />
            </h1>
            <h1>
              <span className="text-gray-500">Year:</span> {e.year}
            </h1>
          </div></Link>
        );
      })
    }
    </div>
  );
};

export default Cards;

