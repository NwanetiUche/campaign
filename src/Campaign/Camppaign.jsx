import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Camppaign.css";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10; // Number of rows per page

const Camppaign = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get("https://infinion-test-int-test.azurewebsites.net/api/Campaign")
      .then((res) => {
        setData(res.data);
        setTotalPages(Math.ceil(res.data.length / PAGE_SIZE));
      })
      .catch((err) => console.log(err));
  }, []);

  // Get the current page data
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentPageData = data.slice(startIndex, startIndex + PAGE_SIZE);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine the range of pages to display
  const range = 3; // Number of pages to display before and after current page
  const startPage = Math.max(currentPage - range, 1);
  const endPage = Math.min(currentPage + range, totalPages);

  return (
    <div>
      <table>
        <thead>
          <tr className="heading">
            <td>S/N</td>
            <td>Campaign Name</td>
            <td>Start Date</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((d, index) => (
            <tr key={index}>
              <td>{d.id}</td>
              <td>{d.campaignName}</td>
              <td>{d.startDate}</td>
              <td>{d.campaignStatus}</td>
              <td>
                <div className="actions">
                  <Link to={`/details/${d.id}`}>
                    <IoEyeOutline />
                  </Link>
                  <Link to="/edit">
                    {" "}
                    <FaRegEdit />
                  </Link>
                  <RiDeleteBin6Line />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; {/* Previous button */}
        </button>
        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <button onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &raquo; {/* Next button */}
        </button>
      </div>
    </div>
  );
};

export default Camppaign;
