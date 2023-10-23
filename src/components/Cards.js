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
    <div className=" sourav flex flex-wrap justify-between p-3 mt-4 max-w-1">
      {loading ? <div className=" pakhi w-full flex justify-center items-center h-96"><ColorRing
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
           <Link to={`detail/${e.id}`}>
            <div key={i}
              className="  font-medium card shadow-lg p-2 hover:-translate-y-3 cursor-pointer
       mt-6 transition-all duration-500
      "
            >
              <img
                className="h-72 m-1 "
                src={e.image}
              />
              <h1>
                <span className="text-gray-500">Name</span> : {e.title}
              </h1>
              <h1 className="flex items-center ml-12">
                <span className="text-gray-500">Rating  </span> :
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating/e.rated}
                  edit={false}
                />
               <p>{console.log(e.rating/e.rated)}</p>
              </h1>
              <h1>
                <span className="text-gray-500">Year:</span> :{e.year}
              </h1>
            </div>
            </Link>
          );
        })
      }
    </div>
  );
}

export default Cards;
