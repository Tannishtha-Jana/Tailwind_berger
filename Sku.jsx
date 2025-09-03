import { useState } from "react";


function Sku() {
  const [sku, setSku] = useState("");
  const [org, setOrg] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh

    try {
      const response = await fetch("http://localhost:5000/sku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku , org }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log("Response:", data);
      setResult(data); // Save result
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Could not fetch stock details");
      setResult(null);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#7a6d6d16]">
        <div className="w-110 rounded-l bg-white border-[1.5px] border-[#7b7878a0] p-6 shadow-xl/30">
          {/* Title */}
          <div className="mb-7 mt-4 flex justify-center">
            <div className=" py-2 text-2xl font-bold tracking-wide">
              STOCK QUERY
            </div>
          </div>

          {/* SKU Input */}
          <form onSubmit={handleSubmit} className="mb-6">
            <label
              htmlFor="sku"
              className="block text-md font-normal text-black mb-1"
            >
              SKU
            </label>
          <div className="mb-4">
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
          </label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Enter SKU code"
            required
            className="w-full rounded-md  px-3 py-2 bg-[#dbdbdb3c] text-black border border-[#7b7878b8] shadow-xl placeholder-[#534a4aaf] outline-none hover:bg-[#dbdbdb99] focus:ring-2 focus:ring-[#7b7878b0]"
          />
        </div>

        <label
            htmlFor="org"
            className="block text-md font-normal text-black mb-1"
          > ORG
          </label>
          
            <div className="flex items-center  gap-2">
              
              <input
                type="text"
                id="org"
                name="org"
                placeholder="Enter ORG"
                value={org}
                onChange={(event) => setSku(event.target.value)}
                required
                className="flex-1 rounded-md bg-[#dbdbdb3c] px-3 py-2 text-black border border-[#7b7878b8] shadow-xl placeholder-[#534a4aaf] outline-none hover:bg-[#dbdbdb99] focus:ring-2 focus:ring-[#7b7878b0]"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-md shadow-xl bg-[#7da7f0] text-white font-semibold hover:bg-[#4078d6]"
              >
                CHECK
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm font-medium ">{error}</p>
          )}

          {/* Result Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-1 border-[#393636ac] text-md mt-5 text-left">
              <thead className="bg-[#dbdbdb7c]">
                <tr>
                  <th className="px-4 py-2 border ">SUBINVENTORY</th>
                  <th className="px-4 py-2 border">STOCKS</th>
                </tr>
              </thead>
              <tbody>
                {result ? (
                  result.map((item, index) => (
                    <tr key={index} className="hover:bg-[#dbdbdb4f]">
                      <td className="px-4 py-2 border">{item.subinventory}</td>
                      <td className="px-4 py-2 border">{item.stocks}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="px-10 py-2 block text-gray-500"> No Result Found
                    {/* <td className="px-4 py-2 border text-gray-500">ABC</td>
                  <td className="px-4 py-2 border text-gray-500">10</td> */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sku;