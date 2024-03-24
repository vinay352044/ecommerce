import { useEffect, useState } from "react";
import { getOrders } from "../../../utils/axios-instance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import Table from "../../common/Table";

// {
//   "id": "2",
//   "user_id": "3",
//   "product_id": "5",
//   "ordered_at": "3/11/2024, 10:00:00 PM",
//   "expected_delivery": "",
//   "order_accepted": false,
//   "accepted_by": "3",
//   "product": {}
// },

const MyOrders = () => {
  const user = useSelector((state) => state.role.user);
  const [orders, setOrders] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [recordPerPage] = useState(6);

  const indexOfLastRecord = currPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  const sliceOrders = orders.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(orders.length / recordPerPage);

  useEffect(() => {
    (async () => {
      const { success, data, error } = await getOrders();

      if (error) {
        toast.error("Something went wrong. Try again later!");
      }

      const newOrders = data.filter((order) => order.user_id === user.id);
      setOrders(newOrders);
    })();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-center mb-8 pb-2 text-5xl font-bold">
          No orders found!!
        </h2>
      </div>
    );
  }
  return (
    <div className="px-24 py-10">
      <h2 className="text-center mb-8 border-b-2 pb-2 text-3xl font-bold">
        Order Summary - {user.name}
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 font-bold text-lg">Product Name</th>
            <th className="border px-4 py-2 font-bold text-lg">
              Requested Quantity
            </th>
            <th className="border px-4 py-2 font-bold text-lg">Order Date</th>
            <th className="border px-4 py-2 font-bold text-lg">Order Time</th>
            <th className="border px-4 py-2 font-bold text-lg">
              Expected Delivery
            </th>
            <th className="border px-4 py-2 font-bold text-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          {sliceOrders.map((order, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{order.product?.title}</td>
              <td className="border px-4 py-2">{order.quantity}</td>
              <td className="border px-4 py-2">
                {order.ordered_at.split(", ")[0]}
              </td>
              <td className="border px-4 py-2">
                {order.ordered_at.split(" ")[1]}
              </td>
              <td className="border px-4 py-2">
                {order.expected_delivery ||
                  `${parseInt(order.ordered_at.split("")[0]) + 3}/14/2024`}
              </td>
              <td
                className={`border px-4 py-2 ${
                  order.order_accepted === "pending"
                    ? "text-[#f29339]"
                    : order.order_accepted === "accepted"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {order.order_accepted === "pending"
                  ? "Pending"
                  : order.order_accepted
                  ? "Accepted"
                  : "Rejected"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        nPages={nPages}
        currentPage={currPage}
        setCurrentPage={setCurrPage}
      />
    </div>
  );
};

export default MyOrders;
