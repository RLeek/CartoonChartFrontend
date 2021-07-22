import CalenderNavigation from "../CalenderForm";
import Logo from "../Logo";
import ShowCard from "../ShowCard";
import './style.css'
import { Calender } from "../../Utilities/types";
import { useState } from "react";


const CalenderPage = () => {
    const [data, setData] = useState<Calender>(
        {
            'Television':[],
            'Movies':[],
            'Included':[]
        })

    //Get the current date
    //Use this relative to the release to determine how many days/months until release or after release

    return (
        <>
            <Logo/>
            <CalenderNavigation onChange={setData} data = {data}/>
            
            {data["Included"].map(value =>
                <> 
                    <div className = "relative mx-auto max-width-3xl px-2 md:px-16 lg:px-4 font-semibold pt-4 text-3xl">
                        {value}
                    </div>
                    {data[value].length === 0 &&
                        <div className = "relative mx-auto max-width-3xl px-2 md:px-16 lg:px-4 font-semibold text-3xl pt-4 text-gray-500">
                            Nothing here yet! Check back later
                        </div>
                    }

                    <div className = "relative max-width-3xl md:px-16 lg:px-4 mt-6 mx-auto grid column-handler gap-6 pb-20">
                        {data[value].map(animation =>
                            <ShowCard title= {animation.title} synopsis = {animation.synopsis} format={animation.format} release= {animation.release.date} specificity={animation.release.specificity} episodes = {animation.episodes} 
                            genres = {animation.genres} runtime = {animation.runtime} cover = {animation.cover} trailer = {animation.trailer} views= {animation.views} average_rating = {animation.average_rating}
                             />
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default CalenderPage;

