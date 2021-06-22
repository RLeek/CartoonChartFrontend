import { useState } from 'react';
import './style.css';



type props = {
  title: string,
  synopsis:string,
  format:string,
  release: Date,
  episodes: number,
  runtime: number,
  cover: string,
  trailer: string,
  average_rating:number,
  views:number,
  genres:string[],
}


const ShowCard = (Prop:props) => {
  const {title, runtime, cover, trailer, average_rating, genres, synopsis, format, episodes } = Prop; 
  const release = Prop.release;
  const [hovered, setHovered] = useState(false);
  const [video, setVideo] = useState(false);
  const curr_date = new Date();

  function truncate (string:string) {
    if (hovered) {
      return string;
    } 
    if (string.length <= 240) {
      return string;
    }
    for (let i = 240; i > 0; i--) {
      if (string[i] === " ") {
        return string.substring(0, i) + " ...";
      }
    }
    return string;
  }

  function dateDifference():string {
    const oneDay = 24 * 60 * 60 * 1000; 
    const days = Math.ceil(Math.abs(release.getTime()-curr_date.getTime())/oneDay);
    if (days < 30) {
      return days + " days";
    }

    return release.toLocaleString('default', {month:'long'}) + " " + release.getDate()+", " + release.getFullYear()

  }

  return (
    <>
          <div className = "bg-white rounded-md shadow-md h-56 md:h-80 flex flex-row">
              <div onClick={()=> setVideo(true)} className = "rounded-l-md h-56 w-9-1 md:h-80 md:w-52 bg-black absolute opacity-0 hover:opacity-80 flex flex-col justify-center">

                <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-12 mx-auto w-12" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>                  
                <div className = "pb-4 text-white text-xl text-center font-semibold ">
                  Play Preview
                </div>
                  
                
              </div>
              <img  className = "rounded-l-md h-56 w-9-1 md:h-80 md:w-52 object-cover" src={"https://api.cartooncalender.com/"+cover} alt={title + " cover"}></img>
              <div className = "pl-2 md:pl-4 pt-1 md:pt-2 flex flex-col h-56 md:h-80 relative">
                <div className = " opacity-0 md:opacity-100 absolute right-4 flex flex-row pt-2 items-center "> 
                  {average_rating !== 0 &&
                    <>
                      {average_rating > 7.5 &&
                        <div className="text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="h-6 pt-0.5 float-left fill-current">
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z"/>
                          </svg>
                        </div>
                      }

                      {(average_rating<= 7.5) && (average_rating >= 6) &&
                        <div className="w-full text-centre text-yellow-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="h-6 float-left pt-0.5 fill-current">
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 13h6a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"/>
                          </svg>
                        </div>
                      }
                      {average_rating < 6 &&
                        <div className="w-full text-centre text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="h-6 float-left pt-0.5 fill-current">
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 6H4.34a6 6 0 0 1 11.32 0z"/>
                          </svg>
                        </div>
                      }

                      <div className=" pl-1 text-lg font-semibold font-mono"> {(average_rating*10).toString()+"%"}</div>
                    </>
                  }
                </div>
                <div className = "text-sm md:text-xl flex-none font-semibold md:mr-36 custom-height hover:h-auto overflow-hidden">{title}</div>
                { runtime > 0 ?
                <div className = " py-1 text-xxs md:text-xs">{format} - {runtime} mins</div>
                    :
                <div className = " py-1 text-xxs md:text-xs">{format}</div>
                }
                <div className = "md:hidden flex-grow flex-shrink md:mr-6 mr-2 text-xs md:text-sm overflow-y-auto">{synopsis}</div>
                <div onMouseEnter={()=> setHovered(true)} onMouseLeave = {()=> setHovered(false)}   className = "hidden md:block flex-grow flex-shrink md:mr-6 mr-2 text-xs md:text-sm overflow-y-auto">{truncate(synopsis)}</div>
                <div className = "pb-2 md:pb-4 pt-1">
                  <div className = "flex flex-row flex-wrap overflow-hidden h-3 md:h-4">
                    {genres.map((genre)=> <div className = "text-center text-xxs md:text-xs bg-gray-400 px-2 mr-1 rounded-full font-semibold"> {genre}</div>)
                    }
                  </div>
                  {curr_date.toISOString().slice(0, 10) > release.toISOString().slice(0, 10) &&
                    <>
                      <div className = "text-xxs md:text-xs"> {episodes} episodes - Premiered on </div>
                      <div className = "text-sm md:text-xl font-semibold">{release.toLocaleString('default', {month:'long'}) + " " + release.getDate()+", " + release.getFullYear()}</div>
                    </>
                  }

                  {curr_date.toISOString().slice(0, 10) < release.toISOString().slice(0, 10) &&
                    <>
                      <div className = "text-xxs md:text-xs"> {episodes} episodes - Premiering in </div>
                      <div className = "text-sm md:text-xl font-semibold">{dateDifference()}</div>
                    </>
                  }

                  {curr_date.toISOString().slice(0, 10) === release.toISOString().slice(0, 10) &&
                    <>
                      <div className = "text-xxs md:text-xs"> {episodes} episodes - Premiering</div>
                      <div className = "text-sm md:text-xl font-semibold">Today</div>
                    </>
                  }
                </div>
              </div>
          </div>
          {video &&
          <>
            <div className = "z-40 fixed top-0 left-0 float items-center w-full h-full" onClick = {()=>setVideo(false)}>              
              <iframe title= {title} className = "relative top-1/2 -translate-y-1/2 transform mx-auto w-5/6 h-5/6 rounded-lg" src={"https://www.youtube.com/embed/"+trailer.slice(32, trailer.length)} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className = "fixed top-0 left-0 z-20 w-full h-full bg-black opacity-50" >
          </div>
          </>}
      </>
    );
 
}

export default ShowCard;
