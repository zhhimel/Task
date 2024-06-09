"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'rc-table';
import './TradeTable.css';

const TradeTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/data/stock_market_data.json'); 
      setData(result.data);
    };
    fetchData();
  }, []);

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Trade Code', dataIndex: 'trade_code', key: 'trade_code' },
    { title: 'High', dataIndex: 'high', key: 'high' },
    { title: 'Low', dataIndex: 'low', key: 'low' },
    { title: 'Open', dataIndex: 'open', key: 'open' },
    { title: 'Close', dataIndex: 'close', key: 'close' },
    { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage)));
  };
  const handlePageChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="container">
      <h1>Trade Data Visualization</h1>
      <Table columns={columns} data={currentItems} rowKey="date"  />
      <div>
        <button className="buttons" onClick={handlePrevPage} disabled={currentPage === 1}>↑</button>
        <input
          type="number"
          value={currentPage}
          onChange={handlePageChange}
          min="1"
          max={Math.ceil(data.length / itemsPerPage)}
        />
        <button className="buttons" onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>↓</button>
      </div>
    </div>
  );
};
export default TradeTable;
