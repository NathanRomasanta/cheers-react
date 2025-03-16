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
    let LiquorTotal = tableData
      .map((row) => {
        let stockUsed = Number(row[13].replace('$', '')); // Extract stock used from the correct column
        let stockPrice = Number(row[8]); // Extract stock price from the correct column
        let stockTotal = stockUsed * stockPrice;

        return isNaN(stockTotal) ? 0 : Number(stockTotal.toFixed(2));
      })
      .reduce((acc, stockTotal) => acc + stockTotal, 0);
    let RTDTotal = Array.isArray(RTDTableData)
      ? RTDTableData.reduce((acc, row) => {
          let sales = Number(row[4]) * Number(row[5]); // Extract sales from the correct column
          if (isNaN(sales)) {
            sales = 0;
          }
          return acc + sales; // Handle NaN values
        }, 0)
      : 0;

    let total = Number(LiquorTotal) + Number(RTDTotal); // Add the two totals together
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

  const overUnder = parseFloat(
    StockOverLoss(tableData, RTDTableData).replace('$', '')
  );

  return (
    <div>
      <h1>Total Stock Value</h1>
      <p>{StockTotal(tableData, RTDTableData)}</p>
      <h1>Total Stock over/loss</h1>
      <p>{StockOverLoss(tableData, RTDTableData)}</p>

      <>
        <h1>Tip:</h1>
        {cashReceived !==
        parseFloat(StockTotal(tableData, RTDTableData).replace('$', '')) ? (
          <p>0</p>
        ) : (
          <p>{`$${(cashReceived * 0.035).toFixed(2)}`}</p>
        )}
      </>

      <div>
        <h1>Cash Received</h1>

        <input
          type='number'
          placeholder='enter cash received'
          className='input input-bordered'
          value={cashReceived}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || !isNaN(parseFloat(value))) {
              setCashReceived(parseFloat(value) || 0); // Set to 0 if the input is empty
            } else {
              alert('Please enter a valid number');
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
