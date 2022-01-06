import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {Pie,Chart ,Doughnut} from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import { Chart as ChartJS,CategoryScale, LineController, LineElement, PointElement,ArcElement, LinearScale, Title ,Tooltip,Legend} from 'chart.js';

ChartJS.register(LineController,CategoryScale, LineElement, PointElement, LinearScale,ArcElement,Tooltip,Legend, Title);
ChartJS.register(Tooltip, Legend);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const Dashboard = () => {
  const dispatch = useDispatch();

  const { products ,productCount} = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);


  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, productCount - outOfStock],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
         
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && productCount}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Chart type="line" data={lineState} />
        </div>

        <div className="doughnutChart">
          {/* <Chart type="pie" data={doughnutState} />
          <Chart type="doughnut" data={doughnutState} />
          <Pie data={doughnutState}/> */}
          <Doughnut data={doughnutState}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;