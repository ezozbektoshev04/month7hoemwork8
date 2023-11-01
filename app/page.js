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

  const submitData = (e) => {
    e.preventDefault();
    setInput(str);
  };
  const resetInput = () => {
    setInput("");
  };
  // console.log(input);
  const fetchRepos = async (input) => {
    if (input !== "") {
      const res = await fetch(`https://api.github.com/search/users?q=${input}`);
      const data = await res.json();
      setUsers(data.items);
    }
  };
  // console.log(users);
  useEffect(() => {
    fetchRepos(input);
    // console.log(input);
  }, [input]);

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
    </div>
  );
};

export default HomePage;
