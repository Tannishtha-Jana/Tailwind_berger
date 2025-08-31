import { useState } from "react";

function Cust() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh

    try {
      const response = await fetch("http://localhost:5000/cust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
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
      setError("❌ Could not fetch customer details");
      setResult(null);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">
        <div className="w-auto rounded-l bg-white border-[1.5px] border-[#7b7878b6] p-8 shadow-lg/30">
          {/* Title */}
          <div className="mb-9 mt-1 flex justify-center">
            <div className="py-3 text-2xl font-bold tracking-wide">
              CUSTOMER QUERY
            </div>
          </div>

          {/* Customer Code Input */}
          <form onSubmit={handleSubmit} className="mb-5">
            <label
              htmlFor="code"
              className="block text-md font-normal text-black mb-1"
            >
              Customer Code
            </label>
            <div className="flex items-center gap-2 ">
              <input
                type="text"
                id="code"
                name="code"
                placeholder="Enter Customer Code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
                className="flex-1 rounded-md bg-[#dbdbdb3c] px-3 py-2 text-black border border-[#7b7878b8] shadow-md placeholder-[#534a4aaf] outline-none hover:bg-[#dbdbdb99] focus:ring-2 focus:ring-[#7b7878b0]"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-[#5690f6] text-white font-semibold hover:bg-[#0748b9]"
              >
                UPDATE
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
                  <th className="px-4 py-2 border">NAME</th>
                  <th className="px-4 py-2 border">DEPO</th>
                  <th className="px-4 py-2 border">UNKNOWN</th>
                  <th className="px-4 py-2 border">LIMITS</th>
                </tr>
              </thead>
              <tbody>
                {result ? (
                  result.map((item, index) => (
                    <tr key={index} className="hover:bg-[#dbdbdb4f]">
                      <td className="px-4 py-2 border">{item.name}</td>
                      <td className="px-4 py-2 border">{item.depo}</td>
                      <td className="px-4 py-2 border">{item.unknown}</td>
                      <td className="px-4 py-2 border">{item.limits}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="px-8 py-2 block text-gray-500"> No Result Found
                    {/* <td className="px-4 py-2 border text-gray-500">ABC</td>
                    <td className="px-4 py-2 border text-gray-500">DEP1</td>
                    <td className="px-4 py-2 border text-gray-500">---</td>
                    <td className="px-4 py-2 border text-gray-500">1000</td> */}
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

export default Cust;
