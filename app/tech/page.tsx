import Loading from "@/app/components/loading";
//import useSWR from "swr"; need 'use client'
async function fetchdata() {
  const data = await fetch(`https://qhjggy-5002.csb.app/table/select?all`);
  return data.json();
}
export default async function Tech() {
  //console.log("swr", typeof useSWR);
  const fetcher = (...args) =>
    fetch(...args)
      .then((res) => res.json())
      .then((res) => {
        console.log("fetch res", res);
        return res;
      });
  const url = `https://qhjggy-5002.csb.app/table/select?all`;

  /* const data = await fetchdata();
  console.log("fetchdata", data[0]);
 const { data } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) {
    return <Loading />;
  }
  if (data) {
    console.log("data", data);
  }*/
  return (
    <div className="">
      <div>
        <p className="text-4xl m-2">ISO /EU Standard compliance : ISO12944</p>
        <button>show pipe</button>
      </div>
    </div>
  );
}
