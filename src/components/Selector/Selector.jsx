import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import "./selector.scss";
const Selector = () => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);
  return (
    <div className="box">
      <div
        onClick={() => setOpen(!open)}
        className="select"
        // className={`bg-white w-full p-2 flex items-center justify-between rounded ${
        //   !selected && "text-gray-700"
        // }`}
        style={{
          color: !selected && "#4a5568",
          // backgroundColor:"white",
          // width: "100%",
          // padding: "0.5rem",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "space-between",
          // borderRadius: "0.25rem",
        }}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select Country"}
        <BiChevronDown
          size={20}
          // className={`${open && "rotate-180"}`}
          style={{ transform: open && "rotate(180deg)" }}
        />
      </div>
      <ul
        className="dropdown"
        // className={`bg-white mt-2 overflow-y-auto
        // ${open ? "max-h-60" : "max-h-0"}
        // `}
        style={open ? { maxHeight: "15rem" } : { maxHeight: "0rem" }}

        // style={{ max-height: 15rem : open ? "" : "0px" }}
      >
        <div className="input">
          <AiOutlineSearch
            size={18}
            className="icons"
            // className="text-gray-700"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter country name"
            className="list"
          />
        </div>
        {countries?.map((country) => (
          <li
            key={country?.name}
            className={`
        p-2
        text-sm
        hover:bg-sky-600
        hover:text-white
        ${
          country?.name?.toLowerCase() === selected?.toLowerCase() &&
          "bg-sky-600 text-white"
        }
        ${
          country?.name?.toLowerCase().startsWith(inputValue)
            ? "block"
            : "hidden"
        }
      `}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
