import React, { useRef, useEffect, useState } from 'react';

const useOutsideClick = (callback) => {
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('mouseup', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
            document.removeEventListener('touchend', handleClickOutside);
        };
    }, [callback]);
    return ref;
};

const remove_button_outline = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-5 inline ml-1 text-gray-400 hover:text-red-400" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }));
const remove_button_fill = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "size-5 text-gray-400 " },
    React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z", clipRule: "evenodd" }));
const arrow_icon = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4 float-right mt-2 mr-2 text-gray-400" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }));
const search_icon = React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-6 text-gray-400" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" }));
const MyComponent = ({ text }) => {
    const [searchActive, setSearchActive] = useState(false);
    const [selectedOpt, setselectedOpt] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [selectedSingleOpt, setSelectedSingleOpt] = useState('');
    const [options, setOptions] = useState(['option one', 'option two', 'option three', 'option four', 'option five']);
    const onClickDropdown = () => {
        setSearchActive(true);
    };
    const onClickOption = (val) => {
        // checking option is selected
        if (!selectedOpt.includes(val)) {
            setselectedOpt([val, ...selectedOpt]);
        }
    };
    const ref = useOutsideClick(() => {
        setSearchActive(false);
        setSearchKey('');
    });
    const onSearchInputChange = (event) => {
        setSearchKey(event.target.value);
    };
    const clearSearch = () => {
        setSearchKey('');
    };
    const removeSelectedOption = (value) => {
        // remove the selected option from selected option list
        const newArray = selectedOpt.filter(item => item !== value);
        setselectedOpt(newArray);
    };
    const highlightMatch = (text, searchTerm) => {
        if (!searchTerm)
            return text;
        // Create a regular expression to match the search term (case-insensitive)
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        // Split the text by the search term and wrap matches in a span with a highlight class
        return text.split(regex).map((part, index) => regex.test(part) ? (React.createElement("span", { key: index, className: "bg-teal-100" }, part)) : (part));
    };
    return (React.createElement("div", { className: "relative", ref: ref },
        React.createElement("div", { className: `${"outline outline-[1] outline-gray-300" } rounded-md  h-auto w-[500] cursor-pointer pt-2 px-1 min-h-[45]`, onClick: onClickDropdown },
            selectedOpt.map(item => React.createElement("span", { key: item, className: `rounded-full px-3 py-1 text-sm mx-1 mb-2 inline-block  ${'bg-gray-100' }` },
                    item,
                    " ",
                    React.createElement("span", { onClick: () => removeSelectedOption(item) }, remove_button_outline)))
                ,
            arrow_icon),
        React.createElement("div", { className: `rounded-md outline outline-[1] outline-gray-300 absolute w-full bg-white ${searchActive ? '' : "hidden"}` },
            React.createElement("div", { className: "border-b flex p-2" },
                React.createElement("div", null, search_icon),
                " ",
                React.createElement("input", { value: searchKey, onChange: onSearchInputChange, className: "flex-1 focus:outline-0 px-2" }),
                searchKey.length === 0 || React.createElement("div", { className: "cursor-pointer", onClick: clearSearch }, remove_button_fill)),
            React.createElement("div", { className: "text-sm" }, options.map(item => React.createElement("div", { key: item, className: "py-1 px-2 cursor-pointer hover:bg-teal-50 ", onClick: () => onClickOption(item)  }, highlightMatch(item, searchKey)))))));
};

export { MyComponent };
