import React, { useState, useEffect } from 'react';
import './Reports.css';
import axios from "axios";
import { LoaderIcon, toast } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = ({ url }) => {
  const [selectedReport, setSelectedReport] = useState("");
  const [reportData, setReportData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchAllOrders = async () => {
    setLoader(true)
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data && response.data.success) {
        setOrders(response.data.data);
        console.log(orders);
        
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
    setLoader(false)
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const reports = [
    { id: "top_category", name: "Top Selling Category" },
    { id: "top_item", name: "Top Selling Item" },
    { id: "revenue", name: "Total Revenue" },
    { id: "top_customer", name: "Top Customer" },
    { id: "order_trend", name: "Order Trends" },
  ];

  const generateReport = (reportType) => {
    if (!orders.length) {
      setReportData([]);
      return;
    }

    let data = [];
    switch (reportType) {
      case "top_category":
        const categoryCount = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            categoryCount[item.category] = (categoryCount[item.category] || 0) + item.quantity;
          });
        });
        data = Object.entries(categoryCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, value]) => ({ name, value }));
        break;

      case "top_item":
        const itemCount = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
          });
        });
        data = Object.entries(itemCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, value]) => ({ name, value }));
        break;

      case "revenue":
        const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
        data = [{ name: "Total Revenue ₹", value: Math.round(totalRevenue) }];
        break;

      case "top_customer":
        const customerCount = {};
        orders.forEach(order => {
          const customerName = order.userData.name;
          customerCount[customerName] = (customerCount[customerName] || 0) + 1;
        });
        data = Object.entries(customerCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, value]) => ({ name, value }));
        break;

      case "order_trend":
        const monthlyOrders = {};
        orders.forEach(order => {
          const month = new Date(order.date).toLocaleString('default', { month: 'long', year: 'numeric' });
          monthlyOrders[month] = (monthlyOrders[month] || 0) + 1;
        });
        data = Object.entries(monthlyOrders)
          .sort((a, b) => new Date(a[0]) - new Date(b[0]))
          .map(([name, value]) => ({ name, value }));
        break;

      default:
        data = [];
    }
    setReportData(data);
  };

  const handleReportChange = (e) => {
    const reportType = e.target.value;
    setSelectedReport(reportType);
    generateReport(reportType);
  };

  
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("All Orders Report", 14, 10);

    const tableColumn = ["User Name", "Email", "Food Name", "Order Date", "Price"];
    const tableRows = [];

    orders.forEach(order => {
      order.items.forEach(item => {
        const rowData = [
          order.userData.name,
          order.userData.email,
          item.name,
          new Date(order.date).toLocaleDateString(),
          `₹${item.price}`
        ];
        tableRows.push(rowData);
      });
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save("Orders_Report.pdf");
  };

  return (
    <div className="report-container">
      {loader==true?<LoaderIcon />:null}
      <h2>Generate Reports</h2>
      <select onChange={handleReportChange} value={selectedReport} className="report-dropdown">
        <option value="">Select Report Type</option>
        {reports.map((report) => (
          <option key={report.id} value={report.id}>{report.name}</option>
        ))}
      </select>

      {reportData.length > 0 && (
        <div className="chart-container">
          <h3>Report Result:</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="tomato" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <button onClick={downloadPDF} className="download-btn">Download All Orders Report</button>
      </div>
  );
};

export default Reports;
