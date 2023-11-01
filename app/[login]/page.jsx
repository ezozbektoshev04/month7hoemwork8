import Link from "next/link";
import React from "react";
async function fetchDetail(login) {
  const res = await fetch(`https://api.github.com/users/${login}`);
  const data = await res.json();
  return data;
}
async function fetchRepo(login) {
  const res = await fetch(`https://api.github.com/users/${login}/repos`);
  const data = await res.json();
  return data;
}

const DetailsPage = async ({ params: { login } }) => {
  const userDetail = await fetchDetail(login);
  const repo = await fetchRepo(login);
  return (
    <div className="mx-auto container mb-5">
      <div className="flex gap-3 p-5 items-center">
        <button type="reset" className={" bg-gray-100 p-3 px-5 block"}>
          Back to search
        </button>
        <p className="text-xl font-medium">
          Hirable: {userDetail.hireable === true ? "✅" : "❌"}
        </p>
      </div>
      <div className="border-slate-300 mb-5 flex items-center gap-60 flex-wrap justify-center p-7 border w-full">
        <img
          src={userDetail.avatar_url}
          alt=""
          className="rounded-full w-44 h-44"
        />
        <div>
          <Link href={userDetail.html_url}>
            <button
              type="submit"
              className="border-gray-700 bg-zinc-700 hover:bg-zinc-600 p-2 mb-6 text-xl px-3 text-white border"
            >
              Visit Github Profile
            </button>
          </Link>
          <p className="text-lg">
            <span className="font-semibold">Username: </span>
            {userDetail.login}
          </p>
        </div>
      </div>
      <div className="border-slate-300 flex items-center gap-4 flex-wrap justify-center p-7 border w-full">
        <div className="rounded-lg bg-green-500 p-1 px-2 text-white">
          Followers: {userDetail.followers}
        </div>
        <div className="rounded-lg bg-red-500 p-1 px-2 text-white">
          Following: {userDetail.following}
        </div>
        <div className="rounded-lg bg-gray-100 border border-slate-300 p-1 px-2 text-black">
          Public Repos: {userDetail.public_repos}
        </div>
        <div className="rounded-lg bg-zinc-900   p-1 px-2 text-white">
          Public Gists: {userDetail.public_gists}
        </div>
      </div>
      {repo.map((el) => (
        <div
          key={el.id}
          className="border-slate-300 px-7 py-4 mt-5 border w-full"
        >
          <Link
            href={el.html_url}
            className=" font-semibold text-red-600 hover:text-gray-500 duration-500"
          >
            {" "}
            {el.name}
          </Link>
        </div>
      ))}
    </div>
  );
  i;
};

export default DetailsPage;
