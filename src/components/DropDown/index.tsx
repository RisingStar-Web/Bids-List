import { useState } from 'react'

interface Props {
    sortBy: string,
    setSortBy: ( type : string) => void,
    types: Array<{ value: string, label: string}>
}

function DropDown({ sortBy, setSortBy, types }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setType = (type: string) => {
        setSortBy(type);
        setIsOpen(false);
    }
    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={()=>setIsOpen(!isOpen)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                Sort By {types.find((type) => type.value === sortBy)?.label}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </button>
            </div>

            {isOpen && <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    {
                        types.map((type, index) => 
                            <p key={index} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0" onClick={()=>setType(type.value)}>{type.label}</p>
                        )
                    }
                </div>
            </div>}
        </div>
    )
}

export default DropDown
