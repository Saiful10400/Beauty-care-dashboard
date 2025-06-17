import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PrimaryButton from "./PrimaryButton";
import TableEditCell from "./TableEditCell";
import formateDate from "../utils/formateData";

import type { TtableData } from "../types";
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetProductQuery,
} from "../redux/api";

const DashboardTable = ({ data }: { data: TtableData }) => {
  const headers = Object.keys(data.keyValue);
  const keys = Object.values(data.keyValue);

  const defaultPagination = { offset: 0, limit: 10 };
  const [pagination, setPagination] = useState(defaultPagination);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPagination({ offset: (currentPage - 1) * 10, limit: 10 });
  }, [currentPage]);

  let fetcherFunction;

  if (data.name === "brand") {
    fetcherFunction = useGetBrandsQuery;
  } else if (data.name === "category") {
    fetcherFunction = useGetCategoriesQuery;
  } else if (data.name === "product") {
    fetcherFunction = useGetProductQuery;
  } else {
    return (
      <div className="text-center py-10 text-white">
        <h1 className="text-2xl font-semibold">
          No data available for {data.name}
        </h1>
      </div>
    );
  }

  const fetchedData = fetcherFunction(pagination);
  const totalPage = Math.ceil(fetchedData?.data?.data?.total / 10);

  const typeFormate = (key: string, item: any) => {
    if (key === "logoUrl" || key === "imageUrl") {
      return (
        <td className="border-none lg:py-5 pl-4" key={key}>
          <img
            className="w-[60px] h-[40px] rounded-md object-contain"
            src={item[key] || "demoAvatar"}
            alt="logo"
          />
        </td>
      );
    }
    if (key === "imagesArr") {
      return (
        <td className="border-none lg:py-5 pl-4" key={key}>
          <img
            className="w-[60px] h-[40px] rounded-md object-contain"
            src={item.images[0] || "demoAvatar"}
            alt="logo"
          />
        </td>
      );
    } else if (key === "isFeatured") {
      return (
        <td className="border-none lg:py-5 pl-4" key={key}>
          {item[key] ? (
            <span className="bg-green-600 rounded-md px-2 py-1 font-medium text-white text-sm">
              On live
            </span>
          ) : (
            <span className="bg-red-500 rounded-md px-2 py-1 font-medium text-white text-sm">
              Hidden
            </span>
          )}
        </td>
      );
    } else if (key === "edit") {
      return (
        <td className="border-none lg:py-5 pl-4" key={key}>
          <TableEditCell />
        </td>
      );
    } else if (key === "updated" || key === "created") {
      return (
        <td className="border-none lg:py-5 pl-4" key={key}>
          {formateDate(item[key])}
        </td>
      );
    } else {
      return (
        <td className="border-none lg:py-5 pl-4" key={key}>
          {item[key]}
        </td>
      );
    }
  };

  return (
    <div className="border border-gray-700 bg-[#1e293b] rounded-lg pb-6 text-white shadow-md">
      {/* Header */}
      <div className="flex justify-between border-b border-gray-700 py-4 lg:px-5">
        <h1 className="text-base font-bold">{data.tittle}</h1>
        {data.mode !== "admin" && (
          <PrimaryButton
            className="text-[14px] font-semibold rounded-md px-4 py-2"
            route
            path={data.createRoute}
            text={`Create ${data.name}`}
          />
        )}
      </div>

      {/* Table */}
      <div className="lg:px-5 overflow-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="border border-gray-700 bg-[#334155] text-gray-200">
              {headers.map((item) => (
                <th
                  key={item}
                  className="h-12 px-4 border-none text-left font-semibold"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-200">
            {fetchedData?.data?.data?.result?.map((item: any) => (
              <tr
                key={item.brandId || item.categoryId}
                className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-150"
              >
                {keys.map((key) => typeFormate(key, item))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="lg:px-5 text-sm flex justify-between items-center mt-6">
        <h1 className="font-semibold">
          {(currentPage - 1) * 10 +
            (fetchedData?.data?.data?.result?.length || 0)}{" "}
          of {fetchedData?.data?.data?.total} row(s)
        </h1>

        <div className="flex items-center gap-10">
          <h1 className="font-bold">
            Page {currentPage} of {totalPage}
          </h1>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`border border-gray-600 text-white p-1 rounded-md hover:bg-gray-600 ${currentPage === 1 && "opacity-40 cursor-not-allowed"
                }`}
            >
              <ChevronLeft height={20} width={20} />
            </button>

            <button
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`border border-gray-600 text-white p-1 rounded-md hover:bg-gray-600 ${currentPage === totalPage && "opacity-40 cursor-not-allowed"
                }`}
            >
              <ChevronRight height={20} width={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
