import { useState } from "react";

type DropDownProps = {
    values:string[];
    value:string;
    onChange:(selected:string)=>void;
}

const BigDropDown = (props:DropDownProps) => {
    const values = props.values;
    const selected = props.value;
    const onChange = props.onChange;
    const [active, setActive] = useState(false);

    return (
        <>
        <div className = " relative">
            <button onFocus={()=>setActive(true)} onBlur={()=>setActive(false)} type="button" className = "select-none text-right inline-flex items-center relative px-3 py-1 ml-2 text-xl font-semibold bg-gray-750 cursor-pointer lg:text-2xl rounded-md shadow-sm hover:bg-gray-700 focus:ring-1 focus:ring-offset-1 focus:ring-gray-700" >
                {selected}
                <svg className="mt-1 -mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>

            </button>
            {active && 
                <div className = "text-right right-0 absolute bg-gray-750 mt-3 transform origin-top-right rounded-md py-2">
                    {values.map((value) =>
                    <div className = "cursor-pointer select-none hover:bg-gray-700  pr-7 pl-10 px-2 py-2 text-xl lg:text-2xl font-semibold" onMouseDown ={()=>onChange(value)}>
                        {value}
                    </div>)}
            </div>}
        </div>
        </>
    )
}

export default BigDropDown;