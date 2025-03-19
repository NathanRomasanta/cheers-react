'use client';

import { useEffect, useState } from 'react';

function TotalSales({ tableData, RTDTableData }) {
  const [cashReceived, setCashReceived] = useState(0.0);
  const [cashOut, setCashOut] = useState(0.0);

  // Calculate total sales
  const StockTotal = (tableData, RTDTableData) => {
    let LiquorTotal = tableData.reduce((acc, row) => {
      let sales = Number(row[14].replace('$', '')); // Extract sales from the correct column
      if (isNaN(sales)) {
        sales = 0;
      }
      return acc + sales; // Handle NaN values
    }, 0);

    let RTDTotal = Array.isArray(RTDTableData)
      ? RTDTableData.reduce((acc, row) => {
          let sales = Number(row[4]) * Number(row[5]); // Extract sales from the correct column
          if (isNaN(sales)) {
            sales = 0;
          }
          return acc + sales; // Handle NaN values
        }, 0)
      : 0;

    let total = LiquorTotal + RTDTotal; // Add the two totals together
    return ` $${total.toFixed(2)}`;
  };

  const StockOverLoss = (tableData, RTDTableData) => {
    let LiquorTotal = tableData.reduce((acc, row) => {
      let productValue = parseFloat(row[row.length - 2].replace('$', '')); // Extract stock used from the second last column
      let salesTotal = parseFloat(row[row.length - 1].replace('$', '')); // Extract stock sold from the last column
      let stockLoss = salesTotal - productValue; // Calculate the total stock

      return acc + (isNaN(stockLoss) ? 0 : parseFloat(stockLoss));
    }, 0);

    let RTDTotal = Array.isArray(RTDTableData)
      ? RTDTableData.reduce((acc, row) => {
          let productValue = parseFloat(row[row.length - 2]); // Extract stock used from the second last column
          let salesTotal = parseFloat(row[row.length - 1]); // Extract stock sold from the last column
          let stockLoss = salesTotal - productValue; // Calculate the total stock

          return acc + (isNaN(stockLoss) ? 0 : stockLoss); // Handle NaN values
        }, 0)
      : 0;

    let total = LiquorTotal - RTDTotal; // Subtract the two totals
    return ` $${total.toFixed(2)}`;
  };

  const calculateCashOut = () => {
    setCashOut(() => {
      let lossOver = StockOverLoss(tableData, RTDTableData);
      let cash = parseFloat(lossOver.replace('$', '')) + cashReceived;
      return isNaN(cash) ? 0 : cash; // Ensure cashOut is always a number
    });
  };
  useEffect(() => {
    calculateCashOut();
  }, [cashReceived, tableData, RTDTableData]);

  return (
    <div className=' border-2 w-3/4'>
      <h1 className='text-lg font-semibold'>Total Stock Value</h1>
      <p>{StockTotal(tableData, RTDTableData)}</p>
      <h1 className='text-lg font-semibold'>Total Stock Over/Loss</h1>
      <p>{StockOverLoss(tableData, RTDTableData)}</p>

      <>
        <h1 className='text-lg font-semibold'>Tip:</h1>
        {cashReceived ===
        parseFloat(StockTotal(tableData, RTDTableData).replace('$', '')) ? (
          <p>{`$${(cashReceived * 0.035).toFixed(2)}`}</p>
        ) : (
          <p>0</p>
        )}
      </>

      <div>
        <h1 className='text-lg font-semibold'>Cash Received</h1>

        <input
          type='number'
          className='input input-bordered'
          value={cashReceived || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setCashReceived(0); // Set to 0 if the input is empty
            } else if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
              setCashReceived(parseFloat(value));
            } else {
              alert('Please enter a valid number greater than or equal to 0');
            }
          }}
        />
        <button
          className='btn btn-sm hidden'
          onClick={calculateCashOut}>
          Calculate
        </button>
      </div>
    </div>
  );
}

export default TotalSales;
