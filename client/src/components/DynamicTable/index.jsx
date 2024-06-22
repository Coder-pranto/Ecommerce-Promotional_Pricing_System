/* eslint-disable react/prop-types */
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
// import { fetchRestaurantData } from '../../utils/fetchRestaurantData';
import testImage1 from "../../../src/assets/test-image/t1.jpg";
import Cookies from "js-cookie";

const DynamicTable = ({
  columns,
  data,
  showMore,
  changeSellingProductQuantity,
  deleteDiscount,
  editDiscount,
  selectedIds,
  setSelectedIds,
}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] = useState();

  // useEffect(() => {
  //     const pageCount = data[0]?.totalPage;
  //     if (pageCount) {
  //         setTotalPage(pageCount);
  //     }
  // }, [data, currentPage]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const initialData = await fetchRestaurantData(1, 6);
  //         setRestaurantData(initialData);
  //     };

  //     fetchData();
  // }, [data]);

  // const handlePageChange = async (newPage) => {
  //     setCurrentPage(newPage);
  //     const newData = await fetchRestaurantData(newPage, 6);
  //     setRestaurantData(newData);
  // };

  // const sellerId = "65b0e4bb6b93ad4b0bee8734"; // this seller id will come from cookie
  const sellerId = Cookies.get("sellerID");
  const discountTypes = ["20%", "30%", "40%", "50%", "60%", "70%", "80%"];

  const handleCheckboxForDelete = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      const ids = [...selectedIds, value];
      setSelectedIds(ids);
    } else {
      const ids = selectedIds.filter((id) => id !== value);
      setSelectedIds(ids);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="">
        <table className="w-[96%] ml-6 mt-6 rounded-md bg-white">
          <thead>
            <tr className="border-b-[1px] border-blue-200 h-[50px]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`py-2 px-4 ${
                    column.key === "product"
                      ? "w-[250px] text-left"
                      : "text-center"
                  }`}
                >
                  {column.label}
                </th>
              ))}
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="text-center p-4 h-[50px] xs:border-b-[1px] md:border-none"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`py-2 px-4 text-sm ${
                      column.key === "status"
                        ? item[column.key] === "approved" ||
                          item[column.key] === "active"
                          ? "text-green-500 font-semibold"
                          : item[column.key] === "pending" ||
                            item[column.key] === !"inactive"
                          ? "text-yellow-600 font-semibold"
                          : "text-red-500 font-semibold"
                        : ""
                    }`}
                  >
                    {column.key === "productName" && item.participatingSellers
                      ? item?.participatingSellers?.map((product) =>
                          product?.sellerId === sellerId ? (
                            <div
                              key={product.sellerId}
                              className="flex items-center"
                            >
                              <div className="w-[80px]">
                                <img
                                  src={product?.productDetails?.image}
                                  className="xs:w-[100px] md:w-[100%] h-[70px] object-cover rounded-lg mr-2 p-[5px]"
                                />
                              </div>
                              <span className="w-full text-left">
                                {product?.productDetails?.productName}{" "}
                              </span>
                            </div>
                          ) : (
                            ""
                          )
                        )
                      : ""}
                    {column.key === "productQuantity" &&
                    item.participatingSellers
                      ? item?.participatingSellers?.map((product) =>
                          product?.sellerId === sellerId
                            ? product?.productDetails?.productQuantity
                            : ""
                        )
                      : ""}
                    {column.key === "product" || column.key === "image" ? (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          value={item._id}
                          onChange={handleCheckboxForDelete}
                        />
                        <div className="w-[40%] h-[70px]">
                          <img
                            src={item.image}
                            //   alt={item.product_name}
                            className="xs:w-[90px] md:w-[100%] md:h-[100%] h-[70px] object-cover rounded-lg mr-2 p-[5px]"
                          />
                        </div>
                        <span className="w-full text-left">
                          {item.product_name}
                        </span>
                      </div>
                    ) : column.key === "start_datetime" ||
                      column.key === "end_datetime" ? (
                      <div>
                        {new Date(
                          item[column.key].split("T")[0]
                        ).toLocaleDateString("en-US")}
                        <br />
                        {new Date(
                          "1970-01-01T" + item[column.key].split("T")[1]
                        ).toLocaleTimeString("en-US", {
                          minute: "numeric",
                          hour: "numeric",
                        })}
                      </div>
                    ) : column.key === "discount" ? (
                      item["discount_type"].name === "fixed" ? (
                        <div>{item["discount"]} Tk</div>
                      ) : item["discount_type"].name === "percenatge" ||
                        discountTypes.includes(item["discount_type"].name) ? (
                        <div>{item["discount"]} %</div>
                      ) : (
                        <div>{item["discount_type"].name}</div>
                      )
                    ) : (
                      <div>{item[column.key]}</div>
                    )}
                  </td>
                ))}
                <td>
                  <div className="text-2xl flex mb-4 items-center gap-2 justify-center pt-5">
                    <div title="show more">
                      {!item.participatingSellers && (
                        <Icon
                          icon="mdi:card-account-details-outline"
                          className="text-gray-500 cursor-pointer"
                          onClick={() => showMore(item)}
                        />
                      )}
                    </div>
                    <div title="change">
                      {item.participatingSellers && (
                        <Icon
                          icon="iconamoon:edit-fill"
                          className="text-green-500 cursor-pointer"
                          title="show more"
                          onClick={() => changeSellingProductQuantity(item._id)}
                        />
                      )}
                    </div>
                    <div title="edit">
                      <Icon
                        icon="lucide:edit"
                        className="text-slate-500 cursor-pointer"
                        title="show more"
                        onClick={() => editDiscount(item._id)}
                      />
                    </div>
                    <div title="delete">
                      {!item.participatingSellers && (
                        <Icon
                          icon="material-symbols:delete"
                          className="text-red-500 cursor-pointer"
                          title="show more"
                          onClick={() => deleteDiscount(item._id)}
                        />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className='w-[200px] mx-auto mt-2'>
                {totalPage &&
                    Array.from({ length: totalPage }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={ ` py-[4px] px-[8px] ${currentPage === pageNumber ? 'bg-yellow-500' : ''}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
            </div> */}
    </div>
  );
};

export default DynamicTable;
