"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [str, setStr] = useState("");
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setStr(e.target.value.toLowerCase());
  };
  const [inputLength, setInputLength] = useState(12);

  const submitData = (e) => {
    e.preventDefault();
    setInput(str);
  };
  const showMore = () => {
    setInputLength(inputLength + 12);
  };
  const showLess = () => {
    setInputLength(inputLength - 12);
  };

  const resetInput = () => {
    setInput("");
  };
  // console.log(input);
  const fetchRepos = async (input, inputLength) => {
    if (input !== "") {
      const res = await fetch(
        `https://api.github.com/search/users?q=${input}&per_page=${inputLength}`
      );
      const data = await res.json();
      setUsers(data.items);
    }
  };
  // console.log(users);
  useEffect(() => {
    fetchRepos(input, inputLength);
    // console.log(input);
  }, [input, inputLength]);

  // console.log(str);
  return (
    <div className="container mx-auto mt-6 mb-3">
      <form onSubmit={submitData}>
        <div>
          <input
            onChange={handleChange}
            type="text"
            name="search"
            placeholder="Search Users..."
            id="search"
            className=" w-full p-2 border-gray-500 border"
          />
        </div>
        <div className="py-4">
          <button
            type="submit"
            className="border-gray-700 bg-zinc-700 hover:bg-zinc-600 w-full p-2 text-white border"
          >
            Search
          </button>
        </div>
        <div className="pb-4">
          <button
            type="reset"
            className={"w-full bg-gray-100 p-2 block"}
            onClick={resetInput}
          >
            Clear
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {users
          ? users.map((el) => (
              <div
                key={el.id}
                className="border-slate-300 border w-72 h-40 flex items-center flex-col justify-center gap-3 "
              >
                <img
                  src={el.avatar_url}
                  alt="images"
                  className=" rounded-full w-16 h-16"
                />
                <p className="text-xl font-semibold">{el.login}</p>
                <Link href={`/${el.login}`}>
                  <button
                    type="submit"
                    className="border-gray-700 bg-zinc-700 hover:bg-zinc-600 p-1 text-xs px-3 text-white border"
                  >
                    More
                  </button>
                </Link>
              </div>
            ))
          : null}
      </div>
      <div className="flex gap-4">
        <button
          onClick={showMore}
          className={
            users.length >= 12
              ? " my-4 px-6 py-3 border-solid border-slate-300 border flex align-middle"
              : "hidden "
          }
        >
          Show More{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
          </svg>
        </button>
        <button
          onClick={showLess}
          className={
            users.length >= 24
              ? " my-4 px-6 py-3 border-solid border-slate-300 border flex align-middle"
              : "hidden "
          }
        >
          Show Less{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
