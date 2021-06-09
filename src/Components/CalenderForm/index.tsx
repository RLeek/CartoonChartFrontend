import SmallDropdown from "../SmallDropDown";
import BigDropDown from "../BigDropDown";
import { useEffect, useState } from "react";
import './style.css'
import { getSeason } from "../../Utilities/requests";
import { monthToSeason, transformAnimations, transformFormat } from "../../Utilities/transformer"
import {Calender} from "../../Utilities/types"

type Props = {
    onChange:(shows:Calender)=>void;
    data: Calender;
}


const CalenderForm = (props:Props) => {
    const [sort, setSort] = useState("Rating");
    const [order, setOrder] = useState("Descending");
    const [season, setSeason] = useState(monthToSeason(new Date().getMonth()));
    const [format, setFormat] =  useState("All");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const {onChange, data } = props; 
    const yearRange =  Array.from({length:(new Date().getFullYear()+2-2019)},(v,k)=>k+2019).map(String);

    useEffect(()=> {
        (async () => {
            await getSeason(season, year, sort, order).then(res=> onChange(transformAnimations(res, format)))
        })();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        (async () => {
            await getSeason(season, year, sort, order).then(res=> onChange(transformAnimations(res, format)))
        })();
    },[year, season]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()=> {
        onChange({"Television":data["Television"], "Movies":data["Movies"], "Included":transformFormat(format)})
    },[format, onChange]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        onChange({"Television":data["Television"].reverse(), "Movies":data["Movies"].reverse(), "Included":data["Included"]})
    },[order, onChange]) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(()=> {
        let dataCopy = data;
        if (sort === "Popularity") {
            dataCopy["Television"].sort((a,b) => (a.views - b.views));
            dataCopy["Movies"].sort((a,b) => (a.views - b.views));
        } else if (sort === "Title") {
            dataCopy["Television"].sort((a,b) => (a.title.localeCompare(b.title)));
            dataCopy["Movies"].sort((a,b) => (a.title.localeCompare(b.title)));
        } else if (sort === "Rating") {
            dataCopy["Television"].sort((a,b) => (a.average_rating - b.average_rating));
            dataCopy["Movies"].sort((a,b) => (a.average_rating - b.average_rating));
        } else { //sort by release
            dataCopy["Television"].sort((a,b) => (a.release.getDate() - b.release.getDate())); //actualy cast to date first please!!!!
            dataCopy["Movies"].sort((a,b) => (a.release.getDate() - b.release.getDate()));
        }
        if (order === "Ascending") {
            onChange({"Television":dataCopy["Television"], "Movies":dataCopy["Movies"], "Included":data["Included"]})
        } else {
            onChange({"Television":dataCopy["Television"].reverse(), "Movies":dataCopy["Movies"].reverse(), "Included":data["Included"]})
        }
    },[sort]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <div className="text-gray-300 bg-gray-900 w-full top-0 md:h-32 h-28 lg:h-40 z-10 relative md:inset-0 md:relative transform md:translate-x-0">
                <div className= "hidden md:block ">
                    <div className = " grid grid-cols-4 bottom-0 pb-5 absolute  left-2/4 -translate-x-2/4 transform font-semibold text-center text-xl w-3/4 lg:w-3/5 xl:w-5/12">
                        {['Winter', 'Spring', 'Summer', 'Autumn'].map(key => key === season 
                            ?
                            <p className = "select-none z-50 m-auto  cursor-pointer text-gray-300 lg:text-2xl text-xl" onClick={() => setSeason(key)}>{key}</p>
                            :
                            <p className = "select-none z-50 m-auto  cursor-pointer text-gray-500 lg:text-2xl text-xl" onClick={() => setSeason(key)}>{key}</p>
                        )}
                    </div>
                    <div className = "grid grid-cols-2 transform bottom-0 mb-16 lg:mb-20 justify-items-center absolute left-2/4 -translate-x-2/4 transform lg:w-2/5 xl:4/12 w-4/5">
                        {/* Fix this next please! */}
                        <div className = "flex flex-row items-center m-auto">
                            <span className = "select-none font-semibold relative text-xl lg:text-2xl text-gray-500">Year</span>
                            <BigDropDown value = {year} values={yearRange} onChange={setYear}/>
                        </div>
                        <div className = "flex flex-row items-center m-auto">
                            <span className = "select-none font-semibold relative text-xl lg:text-2xl text-gray-500">Format</span>
                            <BigDropDown value = {format} values = {["Television", "Movies", "All"]} onChange = {setFormat}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "relative right-0 z-20 mx-auto max-width-3xl md:px-16 lg:px-4 hidden md:block">
                <div className = "float-right flex flex-reverse-row items-center pt-4 right-16">
                    <span className = "select-none font-semibold relative text-xl lg:text-2xl text-gray-800">Order By</span>
                    <span className = "text-gray-300">
                        <BigDropDown value = {sort} values={["Title", "Rating", "Release", "Popularity"]} onChange={setSort}/>
                    </span>
                    <span className = "px-2  cursor-pointer" onClick={()=>setOrder(order === "Ascending"?"Descending":"Ascending")}> 
                        {order === "Descending" ?
                        <svg className = "transform rotate-180 fill-currenttext-gray-900 "
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>                       
                        :
                        <svg className = "transform rotate-180 fill-current text-gray-500"
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>
                        }

                        {order === "Ascending" ?
                    
                        <svg className = "fill-current text-gray-900 "
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>                       
                        :
                        <svg className = "fill-current text-gray-500"
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>
                        }
                    </span>
                </div>
            </div>
                        

            {/* We need 3 divs- One div that is the height of the screen, one div that is the height of the viewport and sticky and our actual form  */}
           


            <div className=" z-20 fixed bottom-8 md:hidden py-2 fixed shadow-md rounded-md flex flex-row bg-gray-900 text-gray-300 transform left-1/2 -translate-x-1/2">
                <SmallDropdown name = "Year" value = {year} onChange={setYear} values={yearRange}/>
                <SmallDropdown name = "Season" value = {season} onChange={setSeason} values={["Summer", "Autumn", "Winter", "Spring"]}/>
                <SmallDropdown name = "Format" value = {format} onChange={setFormat} values={["Television", "Movies", "All"]}/>
                <SmallDropdown name = "Order" value = {sort} onChange={setSort} values={["Title", "Rating", "Release", "Popularity"]}/>


                <span className = "w-1/9 mt-0.5 cursor-pointer pr-2 sm:pr-4" onClick={()=>setOrder(order === "Ascending"?"Descending":"Ascending")}> 
                        {order === "Descending" ?
                        <svg className = "transform rotate-180 fill-current text-gray-300 "
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>                       
                        :
                        <svg className = "transform rotate-180 fill-current text-gray-500"
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>
                        }
                    {order === "Ascending" ?
                    
                        <svg className = "fill-current text-gray-300 "
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>                       
                        :
                        <svg className = "fill-current text-gray-500"
                            viewBox="0 0 299 213"
                            version="1.1"
                            id="svg4"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <defs
                                id="defs8" />
                            <path
                                d="m 20.8,1.5 h 257.3 c 17.8,0 26.7,26.981767 14.1,42.794337 L 163.6,205.80845 c -7.8,9.78873 -20.5,9.78873 -28.3,0 L 6.7,44.294337 C -5.9,28.481767 3,1.5 20.8,1.5 Z"
                                id="path2"
                                />
                        </svg>
                        }
                    </span>
            </div>
        </>
    );
}

export default CalenderForm;
/*
{key === season
    ?
    <p className = "px-12 text-white" onClick={() => setSeason(key)}>1</p>
    :
    <p className = "px-12" onClick={() => setSeason(key)}>2</p>
    }
*/