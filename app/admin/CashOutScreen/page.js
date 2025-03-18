'use client';

import { useState, useEffect } from 'react';
// components

import LoadingPg from './LoadingPg';
import Table from './Table';
import HSpliter from './HSpliter';
import EditCount from './editCount';

import EditRTDCounts from './editRTDCounts';

import Spliter from './Spliter';
import TotalSales from './TotalSales';
import fetchCashOut from './fetch-cashout';
import fetchReqData from './fetch-Reqs';
import fetchRTDData from './fetch-RTD';
import fetchTransactions from './fetch-Transactions';
import TopBar from './TopBar';

// username to be replaced with user object from auth

let baristaID = 'jdoe@gmail.com';
let userDate = '2025-07-04';
function CashOutPg() {
  // States
  const [baristaID, setBaristaID] = useState('');
  const [userDate, setUserDate] = useState('');
  const [switchSearch, setSwitchSearch] = useState(false);
  // state for the Transactions table
  const [transTableData, setTransTableData] = useState([]);
  //state for the RTD cashout table
  const [RTDTableData, setRTDTableData] = useState([]);
  //state for the inventory request table
  const [invReqTableData, setInvReqTableData] = useState([]);

  //state for cashout table
  const [CashOutItems, setCashOutItems] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedLiquor, setSelectedLiquor] = useState(''); // Selected liquor type
  //state for the RTD cashout table
  const [RTDItems, setRTDItems] = useState([]);
  //state for the requests table
  const [reqData, setReqData] = useState([]);
  //state for the main cashout table
  const [tableData, setTableData] = useState([]);
  const [modData, setModData] = useState([]);
  //state for Edit Count component
  const [editCount, setEditCount] = useState(false);
  const [selectedReqRow, setSelectedReqRow] = useState(null);
  const [selectedRTDRow, setSelectedRTDRow] = useState(null);
  // state for the selected row of the requests table
  const [selectData, setSelectData] = useState(null);

  const [selectedTransRow, setSelectedTransRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row

  // Lifted States for search bar

  // cash out table needs the following columns
  let InventoryColumnTitles = [
    '',
    'Row',
    'Name',
    'Open Count',
    'Open Lbs',
    'Open Oz',
    'Close Count',
    'Close Lbs',
    'Close Oz',
    'Price',
    'Bottle Size',
    'ID',
    'open Oz',
    'close Oz',
    'stock Used',
    'Product Value',
    'Sales Total',
  ];
  let rtdTitles = [
    '',
    'Row',
    'Name',
    'Open Count',
    'Close Count',
    'Price',
    'Stock Used',
    'Product Value',
    'Sales Total',
  ];
  let transTableTitles = [
    'Row',
    'Order',

    'Name',

    'Total oz per order',
    'Total Sales',

    'Total Sales',
    'Total Items',
    'Time',
  ];

  const emptyBottleWeights = {
    bacardiSpicedGlass40: 20.8,
    bacardiSpicedPlastic40: 2.8,
    bacardiWhiteGlass40: 28.8,
    bacardiWhitePlastic40: 2.25,
    flourishGin26: 28.8,
  };

  // Update selected liquor type
  const handleLiquorSelection = (liquor) => {
    setSelectedLiquor(liquor);
    console.log('Selected liquor is: ', liquor);
  };

  //Function to switch the value of baristaID and userDate

  // Fetch data from Main Cashout table Firestore
  //TO DO : Make this into the Orders Table  not the Item table
  //useEffect functions for different tables
  /* Main Cashout Table*/
  useEffect(() => {
    if (switchSearch) {
      const fetchCashOutData = async () => {
        setLoading(true);
        const fetchedItems = await fetchCashOut(baristaID, userDate);
        setLoading(false);
        setCashOutItems(fetchedItems); // Fetched items set to state
      };
      fetchCashOutData();
    }

    // Trigger data fetch when component mounts
  }, [switchSearch, baristaID, userDate]);

  // Map firestore data to match format of table for Main Cashout Table
  // uses the openOZ closeOZ stockUsed StockValueRow AddTransTableToCashOut AddReqTableToCashOut functions

  useEffect(() => {
    const mappedData = CashOutItems.map((item, index) => [
      index + 1, // Row #
      item.name, // database name field
      item.open_count, // database id field
      item.open_lbs, // database quantity field
      item.open_oz, // database quantity field
      item.close_count, // database quantity field
      item.close_lbs, // database quantity field
      item.close_oz, // database quantity field
      item.price, // database price field
      item.bottle_size, // database ID field
      item.ID, // database ID field
    ]);

    setTableData(
      mappedData.map((row) =>
        AddTransTableToCashOut(
          StockValueRow(AddReqTableToCashOut(stockUsed(closeOZ(openOZ(row)))))
        )
      )
    );
  }, [CashOutItems, invReqTableData]);

  // Fetch data from Requests table Firestore
  //Requests Table

  useEffect(() => {
    const fetchReqs = async () => {
      setLoading(true);
      const fetchedItems = await fetchReqData(baristaID, userDate);
      setLoading(false);
      setReqData(fetchedItems); // Fetched items set to state
    };

    // Trigger data fetch when component mounts
    fetchReqs();
  }, [CashOutItems]);
  // map firestore data to match format of table for Requests Table
  useEffect(() => {
    const mappedData = reqData.map((item, index) => [
      index + 1, // Row #
      item.name, // database name field
      item.quantity, // database id field
    ]);
    setInvReqTableData(mappedData);
  }, [reqData]);

  /** */
  //RTD Table
  useEffect(() => {
    const fetchRTDs = async () => {
      setLoading(true);
      const fetchedItems = await fetchRTDData(baristaID, userDate);
      setLoading(false);
      setRTDItems(fetchedItems); // Fetched items set to state
    };

    // Trigger data fetch when component mounts
    fetchRTDs();
  }, [reqData]);
  // Map firestore data to match format of table for RTD Table
  // uses the RTDPopulateFoodStock AddReqTableToRTD RTDStockValueRow functions
  useEffect(() => {
    const mappedData = RTDItems.map((item, index) => [
      index + 1, // Row #
      item.name, // database name field
      item.open_count, // database id field
      item.close_count, // database quantity field
      item.price, // database price field
    ]);

    setRTDTableData(
      RTDPopulateFoodStock(mappedData).map((row) =>
        AddTransTableToCashOut(RTDStockValueRow(AddReqTableToRTD(row)))
      )
    );
  }, [RTDItems]);

  // Transactions Table
  //No extra mapping needed for the transactions table
  useEffect(() => {
    const fetchTrans = async () => {
      setLoading(true);
      const fetchedItems = await fetchTransactions(baristaID, userDate);
      setLoading(false);
      const mappedData = (fetchedItems || []).flatMap((item, index) => {
        // Ensure item and item.order exist before proceeding
        if (!item || !Array.isArray(item.order)) return [];
        return item.order
          .filter((orderItem) => orderItem?.isLiquor) // Filter to only include items with isLiquor === true
          .map((orderItem, orderIndex, array) => [
            index + 1, // Row #
            `${index + 1}.${orderIndex + 1}`, // Sub-row #
            orderItem?.name || 'Unknown', // Item name
            orderItem?.ounces ? Number(orderItem.ounces) : 0, // Ounces
            `$${((orderItem?.price || 0) * (orderItem?.ounces || 0)).toFixed(
              2
            )}`, // Price
            orderIndex === array.length - 1 ? item?.total || '' : '', // Total sales for the order (only on last item)
            orderIndex === array.length - 1 ? item?.totalItems || '' : '', // Total items in the order (only on last item)
            orderIndex === array.length - 1
              ? item?.time
                ? new Date(item.time).toLocaleString()
                : ''
              : '', // Safely convert to Date object and then to string (only on last item)
          ]);
      });
      setTransTableData(mappedData); // Fetched items set to state
    };
    fetchTrans();

    // Trigger data fetch when component mounts
  }, [CashOutItems]);

  //ROW FUNCTIONS FOR THE MAIN CASHOUT TABLE//
  // used in the mapped data useEffect to add rows to the table
  // row to calculate sales

  const stockUsed = (row) => {
    //TO DO:
    //This functions conditional can be removed when added to the main app due to the added data to make it work as intended
    if (row[10] === 'Gin') {
      let openTotalOz = parseFloat(row[11]);

      let stockCloseFull = parseFloat(row[12]); // Correct index for Quantity

      // ADD REQ OZ  subtract the spills
      let spills = 2;

      let OzUsed = openTotalOz - stockCloseFull - spills;
      if (OzUsed < 0) {
        let positiveOzUsed = OzUsed * -1;
        OzUsed = positiveOzUsed;
      }

      if (isNaN(OzUsed)) {
        OzUsed = 0;
      }
      let newRow = [...row, OzUsed.toFixed(2)];
      if (newRow.length > InventoryColumnTitles.length) {
        newRow.pop();
      }

      return newRow;
    }
    //KEEP THE FUNCTION MINUS THE IF STATEMENT
    if (row[10] === 'Rum') {
      let openTotalOz = Number(row[11]) || 0;
      let stockCloseFull = Number(row[12]) || 0; // Correct index for Quantity
      // ADD REQ OZ  subtract the spills
      let OzUsed = openTotalOz - stockCloseFull;

      if (isNaN(OzUsed)) {
        OzUsed = 0;
      }
      let newRow = [...row, OzUsed.toFixed(2)];
      if (newRow.length > InventoryColumnTitles.length) {
        newRow.pop();
      }

      return newRow;
    }
  };
  /**
   * Calculates the stock value for a given row and appends it to the row.
   *
   * @param {Array} row - The row of data containing stock information.
   * @returns {Array} The new row with the calculated stock value appended.
   */
  const StockValueRow = (row) => {
    let totalStockUsed = Number(row[13]);
    let stockPrice = Number(row[8]);
    let stockValue = totalStockUsed * stockPrice;
    let newRow = [...row, `$${stockValue.toFixed(2)}`];
    if (newRow.length > InventoryColumnTitles.length) {
      newRow = newRow.slice(0, InventoryColumnTitles.length);
    }
    return newRow;
  };

  /**
   * Calculates the total ounces of stock and appends it to the row.
   *
   * @param {Array} row - The row of stock data. Expected to have numeric values at specific indices:
   *                      - row[2]: Full stock quantity
   *                      - row[3]: Stock in pounds
   *                      - row[4]: Stock in ounces
   *                      - row[9]: Conversion factor from full stock to ounces
   * @returns {Array} - A new row array with the total ounces appended. If the new row exceeds the length of InventoryColumnTitles, the last element is removed.
   */
  const openOZ = (row) => {
    let stockFull = Number(row[2]); // Correct index for Quantity
    let stockLbs = Number(row[3]); // Correct index for Quantity
    let stockOz = Number(row[4]); // Correct index for Quantity
    let TotalOz = stockOz + stockLbs * 16 + stockFull * Number(row[9]);
    let newRow = [...row, TotalOz.toFixed(2)]; // Add TotalOz to the row
    if (newRow.length > InventoryColumnTitles.length) {
      newRow.pop();
    }
    return newRow;
  };

  /**
   * Calculates the total ounces of remaining stock for a given row of inventory data.
   *
   * @param {Array} row - The inventory row data. Expected to be an array with specific indices:
   *   - row[5]: Quantity of full bottles (number)
   *   - row[6]: Quantity in pounds (number)
   *   - row[7]: Quantity in ounces (number)
   *   - row[9]: Conversion factor for full bottles to ounces (number)
   *   - row[10]: Type of liquor (string, e.g., 'Gin' or 'Rum')
   * @returns {Array} - A new row array with the calculated total ounces appended. If the new row exceeds the length of `InventoryColumnTitles`, the last element is removed.
   */
  const closeOZ = (row) => {
    if (row[10] === 'Gin') {
      let stockCloseFull = Number(row[5]); // Correct index for Quantity
      let stockCloseLbs = Number(row[6]); // Correct index for Quantity
      let stockCloseOz = Number(row[7]); // Correct index for Quantity
      let TotalCloseOz =
        stockCloseOz -
        emptyBottleWeights.flourishGin26 +
        stockCloseLbs * 16 +
        stockCloseFull * Number(row[9]);
      let newRow = [...row, TotalCloseOz.toFixed(2)]; // Add TotalOz to the row
      if (newRow.length > InventoryColumnTitles.length) {
        newRow.pop();
      }
      return newRow;
    }
    if (row[10] === 'Rum') {
      let stockCloseFull = Number(row[5]); // Correct index for Quantity
      let stockCloseLbs = Number(row[6]); // Correct index for Quantity
      let stockCloseOz = Number(row[7]); // Correct index for Quantity
      let TotalCloseOz =
        stockCloseOz -
        emptyBottleWeights.bacardiWhitePlastic40 +
        stockCloseLbs * 16 +
        stockCloseFull * Number(row[9]);
      let newRow = [...row, TotalCloseOz.toFixed(2)]; // Add TotalOz to the row
      if (newRow.length > InventoryColumnTitles.length) {
        newRow.pop();
      }
      return newRow;
    }
  };

  const RTDPopulateFoodStock = (rows) => {
    return rows.map((row) => {
      let stockOpen = Number(row[2]); // Correct index for Quantity
      let stockClose = Number(row[3]); // Correct index for Quantity
      let totalStockUsed = stockOpen - stockClose;

      let newRow = [...row, totalStockUsed.toFixed(2)]; // Add TotalOz to the row
      if (newRow.length > rtdTitles.length) {
        newRow.pop();
      }
      return newRow;
    });
  };

  const RTDStockValueRow = (row) => {
    let totalStockUsed = Number(row[5]);
    let stockPrice = Number(row[4]);

    // Log the values to debug

    // Check if the values are valid numbers
    if (isNaN(totalStockUsed) || isNaN(stockPrice)) {
      console.error('Invalid values in row:', row);
      return row; // Return the original row if any value is invalid
    }

    let stockValue = totalStockUsed * stockPrice;
    let newRow = [...row, `$${stockValue.toFixed(2)}`];

    if (newRow.length > rtdTitles.length + 1) {
      newRow = newRow.slice(0, rtdTitles.length + 1);
    }

    return newRow;
  };

  /**
   * Adds the required table data to the cash out row.
   *
   * This function processes a given row and updates its stock used value
   * based on matching entries in the `invReqTableData` array. It calculates
   * the new stock used by adding the product of the inner row's second element
   * and the ninth element of the given row to the thirteenth element of the given row.
   *
   * @param {Array} row - The row to be processed and updated.
   * @returns {Array} The updated row with the new stock used value.
   */
  const AddReqTableToCashOut = (row) => {
    let newRow = [...row];

    invReqTableData.forEach((innerRow) => {
      if (innerRow[1] === row[1]) {
        let newStockUsed =
          Number(newRow[13]) + Number(innerRow[2]) * Number(newRow[9]);

        newRow[13] = newStockUsed.toFixed(2);
      }
    });

    return newRow;
  };
  /**
   * Updates a row by adding the stock used from the invReqTableData if a match is found.
   *
   * @param {Array} row - The row to be updated. It is an array where the second element is used for matching.
   * @returns {Array} - The updated row with the new stock used value.
   */
  const AddReqTableToRTD = (row) => {
    let newRow = [...row];

    invReqTableData.forEach((innerRow) => {
      if (innerRow[1] === row[1]) {
        let newStockUsed = Number(newRow[5]) + Number(innerRow[2]);

        newRow[5] = newStockUsed.toFixed(2);
      }
    });

    return newRow;
  };

  /**
   * Adds the total sales amount to the given row based on matching transaction data.
   *
   * @param {Array} row - The row to which the total sales amount will be added.
   * @returns {Array} The new row with the total sales amount appended.
   */
  const AddTransTableToCashOut = (row) => {
    let newRow = [...row];
    let totalSales = 0;

    transTableData.forEach((innerRow) => {
      if (innerRow[2] === row[1]) {
        let sales = parseFloat(innerRow[4].replace('$', '')) || 0;
        totalSales += sales;
      }
    });

    newRow.push(`$${totalSales.toFixed(2)}`);
    return newRow;
  };

  const AddTransTableToRTD = (row) => {
    let newRow = [...row];
    let totalSales = 0;

    transTableData.forEach((innerRow) => {
      if (innerRow[2] === row[1]) {
        let sales = parseFloat(innerRow[4].replace('$', '')) || 0;
        totalSales += sales;
      }
    });

    newRow.push(`$${totalSales.toFixed(2)}`);
    return newRow;
  };

  /**
   * Calculates the total ounces sold for each liquor type and adds it as a new column.
   *
   * @param {Array} row - The row of data containing inventory information.
   * @returns {Array} - The updated row data with the calculated ounces sold appended.
   */

  // Edit Count Functions
  //moved to editCount.js

  // Loading screen while data loads
  if (loading) {
    return <LoadingPg />;
  }

  return (
    <div className='overflow-scroll h-screen'>
      <TopBar
        setSelectedBarista={setBaristaID}
        setSelectedDate={setUserDate}
        selectedDate={userDate}
        selectedBarista={baristaID}
        setSwitchSearch={setSwitchSearch}
        switchSearch={switchSearch}
      />
      {/* Dropdowns to be added  */}
      <HSpliter>
        <HSpliter>
          {/*Main Cashout Table */}

          <Spliter
            title='Liquor'
            title2='Cashout'>
            <Table
              type={1}
              tableTitles={InventoryColumnTitles}
              tableData={tableData}
              setModData={(data) => {
                setModData(data);
                setSelectedRow(data);
              }}
              modData={modData}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />

            <div className='flex flex-col h-11/12 w-11/12'>
              <TotalSales
                tableData={tableData}
                RTDTableData={RTDTableData}
              />
              <EditCount
                setEditCount={setEditCount}
                editCount={editCount}
                modData={modData}
                setModData={setModData}
                setTableData={setTableData}
                baristaID={baristaID}
                userDate={userDate}
              />
            </div>
          </Spliter>

          {/* RTD Table */}
          <Spliter title='Single Sale Items'>
            <div className='flex w-full'>
              <Table
                type={1}
                tableData={RTDTableData}
                tableTitles={rtdTitles}
                setModData={(data) => {
                  setModData(data);
                  setSelectedRTDRow(data);
                }}
                modData={modData}
                selectedRow={selectedRTDRow}
                setSelectedRow={setSelectedRTDRow}
              />
            </div>
            <EditRTDCounts
              baristaID={baristaID}
              userDate={userDate}
              setTableData={setTableData}
              modData={modData}
            />
          </Spliter>
        </HSpliter>
        {/* Req Table*/}
        <Spliter
          title2='Requests'
          title='Transactions'>
          <div className='flex w-full h-3/4'>
            <Table
              key={'Transactions'}
              tableData={transTableData}
              tableTitles={transTableTitles}
              setModData={(data) => {
                setModData(data);
                setSelectedTransRow(data);
              }}
              modData={modData}
              selectedRow={selectedTransRow}
              setSelectedRow={setSelectedTransRow}
            />
          </div>
          <Table
            key='invReqTable'
            tableData={invReqTableData}
            tableTitles={['Row', 'Name', 'Quantity']}
            setModData={(data) => {
              setModData(data);
              setSelectData(data);
            }}
            modData={modData}
            selectedRow={selectedReqRow}
            setSelectedRow={setSelectedReqRow}
          />
        </Spliter>
      </HSpliter>
    </div>
  );
}

export default CashOutPg;
