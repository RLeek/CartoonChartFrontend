import { useState } from "react";

type Props = {
    name:string;
    value:string;
    onChange:(value:string)=>void;
    values:string[];
}

const SmallDropDown = (props:Props) => {
    const values = props.values;
    const selected = props.value;
    const onChange = props.onChange;
    const [active, setActive] = useState(false);
    const name = props.name;


    return (
        <>
        <div className = "text-center text-sm sm:px-4 px-2 cursor-pointer">
            <button onFocus={()=>setActive(true)} onBlur={()=>setActive(false)} onMouseEnter={()=>setActive(true)} onMouseLeave ={()=>setActive(false)} >
                <div className = "font-bold">{selected}</div>
                <div>{name}</div>
            </button>

            {active &&
            <div className = "text-left absolute bottom-16 my-2 rounded-md bg-gray-900 px-4 transform -translate-x-4">
                {values.map(value=>
                    <div onMouseDown = {()=>onChange(value)} onTouchEnd = {()=>onChange(value)} className = "cursor-pointer font-bold py-2">{value}</div>)
                }
            </div>
            }
        </div>

        </>
    )

}

export default SmallDropDown;