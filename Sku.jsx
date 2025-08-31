import { useState } from "react";


function Sku(){
  const [sku, setSku] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh

    try {
      const response = await fetch("http://localhost:5000/sku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku }),
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

    return(
    //   <>
    //         <div className="query-box" >
    //     <div className="title">STOCK QUERY</div>

    //     <form className="sku-form" action="/sku" method="post" aria-label="sku-form">
    //       <label htmlFor="sku">SKU</label>
    //       <div className="input-group">
    //         <input 
    //         type="text" 
    //         id="sku" 
    //         name="sku" 
    //         placeholder="Enter SKU" 
    //         value={sku}
    //         onChange={(event)=>setSku(event.target.value)}
    //         required />
    //         <button
    //         onClick={handleSubmit} 
    //         type="submit">CHECK</button>
    //       </div>
    //     </form>

    //     <div className="result-table">
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>SUBINVENTORY</th>
    //             <th>STOCKS</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td>ABC</td>
    //             <td>10</td>
    //           </tr>
    //           <tr>
    //             <td></td>
    //             <td></td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </>
  <>
      <div className="flex min-h-screen items-center justify-center bg-[#7a6d6d16]">
      <div className="w-auto rounded-l bg-white border-[1.5px] border-[#7b7878a0] p-6 shadow-lg/30">
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
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="sku"
              name="sku"
              placeholder="Enter SKU"
              value={sku}
              onChange={(event) => setSku(event.target.value)}
              required
              className="flex-1 rounded-md bg-[#dbdbdb3c] px-3 py-2 text-black border border-[#7b7878b8] shadow-md placeholder-[#534a4aaf] outline-none hover:bg-[#dbdbdb99] focus:ring-2 focus:ring-[#7b7878b0]"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#7da7f0] text-white font-semibold hover:bg-[#4078d6]"
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