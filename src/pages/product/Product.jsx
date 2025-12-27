import { useEffect, useState } from "react";
import Chart from "../../components/charts/chart";
import { useParams } from "react-router-dom";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

function Product() {
  const { productID: id } = useParams();
  const [product, setProduct] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(product);
  useEffect(() => {
    if (!id) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [productRes, salesRes] = await Promise.all([
          axios.get(
            `https://wgbubvtagllosaelppld.supabase.co/rest/v1/product?id=eq.${id}&select=*`,
            {
              headers: {
                apikey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnYnVidnRhZ2xsb3NhZWxwcGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTk1MzYsImV4cCI6MjA3MTQzNTUzNn0.pn-yLO_lqamjF5rzKUbVKzfB_Y9aOSCDX9laoBnYHn0",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnYnVidnRhZ2xsb3NhZWxwcGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTk1MzYsImV4cCI6MjA3MTQzNTUzNn0.pn-yLO_lqamjF5rzKUbVKzfB_Y9aOSCDX9laoBnYHn0",
              },
            }
          ),
          axios.get(
            `https://wgbubvtagllosaelppld.supabase.co/rest/v1/product-sales?product_id=eq.${id}&select=month,sales&order=month.asc`,
            {
              headers: {
                apikey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnYnVidnRhZ2xsb3NhZWxwcGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTk1MzYsImV4cCI6MjA3MTQzNTUzNn0.pn-yLO_lqamjF5rzKUbVKzfB_Y9aOSCDX9laoBnYHn0",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnYnVidnRhZ2xsb3NhZWxwcGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTk1MzYsImV4cCI6MjA3MTQzNTUzNn0.pn-yLO_lqamjF5rzKUbVKzfB_Y9aOSCDX9laoBnYHn0",
              },
            }
          ),
        ]);

        setProduct(productRes.data[0] || null);

        const chartReadyData = salesRes.data.map((item) => ({
          name: item.month,
          sales: item.sales,
        }));

        setChartData(chartReadyData);
      } catch (err) {
        console.error("خطا در دریافت داده:", err);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  const lineInfo = [
    {
      dataKey: "name",
      stroke: "#1976D2",
      name: "month",
      icon: CalendarMonthIcon,
    },
    {
      dataKey: "sales",
      stroke: "#558B2F",
      name: "sales",
      icon: MonetizationOnIcon,
    },
  ];

  return (
    <div className="flex-[4] p-5 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">product</h1>
        <button className="w-20 bg-cyan-700 text-white rounded py-1 cursor-pointer">
          create
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="size-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex">
          <div className="flex-[2]">
            <Chart
              title="sales in month"
              data={chartData}
              lineInfo={lineInfo}
            />
          </div>
          <div className="flex-[1] shadow-custom my-4">
            <div className="flex items-center gap-3">
              <img
                src={product.avatar}
                alt="img"
                className="rounded-full object-cover size-10"
              />
              <span>{product.title}</span>
            </div>
            <div className="">
              <div className="flex justify-between">
                <span>Price:</span>
                <span>{product.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales:</span>
                <span>{product.sales}</span>
              </div>
              <div className="flex justify-between">
                <span>Active:</span>
                <span>{product.active ? "yes" : "no"}</span>
              </div>
              <div className="flex justify-between">
                <span>In-Stock:</span>
                <span>{product.in_stock ? "yes" : "no"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
