import React from "react";

const CreatePOSItem = () => {
  const liquorData = [
    { name: "Whiskey X", type: "Whiskey", alcohol: "40%", country: "Scotland" },
    { name: "Vodka Y", type: "Vodka", alcohol: "38%", country: "Russia" },
    { name: "Rum Z", type: "Rum", alcohol: "42%", country: "Jamaica" },
    { name: "Tequila A", type: "Tequila", alcohol: "45%", country: "Mexico" },
    { name: "Gin B", type: "Gin", alcohol: "37.5%", country: "England" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liquor Table</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Alcohol %</th>
            <th className="border p-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {liquorData.map((liquor, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{liquor.name}</td>
              <td className="border p-2">{liquor.type}</td>
              <td className="border p-2">{liquor.alcohol}</td>
              <td className="border p-2">{liquor.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatePOSItem;
