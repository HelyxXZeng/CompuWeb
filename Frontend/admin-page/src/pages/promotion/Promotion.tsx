import { GridColDef } from "@mui/x-data-grid";
import { PromotionDef } from "../../api/promotionAPI"
import "./promotion.scss"
import { useEffect, useState } from "react";
import { promotionExample } from "../../data";
import { useParams } from "react-router-dom";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import UpdatePromotion from "../../components/updatePromotion/UpdatePromotion";
import { TextareaAutosize } from "@mui/material";

interface Props {
  promotion: PromotionDef;
}
export interface PromotionChart {
  dataKeys: { name: string; color: string }[];
  data: Array<{ [key: string]: string | number } & { name: string }>;
}

const promotionChartExample: PromotionChart = {
  dataKeys: [
    { name: "sells", color: "#82ca9d" },
    { name: "checks", color: "#8884d8" },
  ],
  data: [
    { name: "Sun", sells: 4000, checks: 2400 },
    { name: "Mon", sells: 3000, checks: 1398 },
    { name: "Tue", sells: 2000, checks: 3800 },
    { name: "Wed", sells: 2780, checks: 3908 },
    { name: "Thu", sells: 1890, checks: 4800 },
    { name: "Fri", sells: 2390, checks: 3800 },
    { name: "Sat", sells: 3490, checks: 4300 },
  ],
};
const columns: GridColDef[] = [
  { field: "Id", headerName: "ID", width: 7, },
  {
    field: "Name",
    type: "string",
    headerName: "Name",
    flex: 5,
  },
  {
    field: "StartDate",
    type: "string",
    headerName: "Start Date",
    flex: 4,
  },
  {
    field: "EndDate",
    type: "string",
    headerName: "End Date",
    flex: 4,
  },
  {
    field: "ProductVariantPurchaseName",
    type: "string",
    headerName: "Product Variant Purchase",
    flex: 5,
  },
  {
    field: "ProductVariantPromotionName",
    type: "string",
    headerName: "Product Variant Promotion",
    flex: 5,
  },
  {
    field: "Value",
    headerName: "Value",
    flex: 3,
    type: "string",
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 2,
    type: "string",
  },
  {
    field: "Content",
    type: "string",
    headerName: "Content",
    flex: 3,
  },
];


const Promotion = () => {
  const [open,setOpen] = useState(false);
  const [data,setData] = useState([]);
  useEffect (() => {
    const fetchData = async () => {
      try {
        //const result = await ;
        //setData(result);
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
      }
    };
  })
  const { id } = useParams();
  const props = promotionExample;
  const chart = promotionChartExample;
  return (
    
    <div className="promotion">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{props.name}</h1>
            <button onClick={() => setOpen(true)}>Update</button>
          </div>
          <div className="details">
            {Object.entries(props).map((item) => (
              <div className={` ${(item[0] === "startDate" || item[0] === "endDate") ? "item2row" : "item"}`} key={item[0]}>
                <span className="itemTitle">{item[0]}:</span>
                {item[0] === "Content" && (
                  <TextareaAutosize  
                    className="itemValue"
                    value={item[1]}
                    disabled
                    minRows={2} // Adjust the number of rows as needed
                    maxRows={4}
                    // Thêm các thuộc tính khác tùy thuộc vào nhu cầu
                  />
                )} 
                { (item[0] !== "Content")
                 && (
                  <span className="itemValue">{item[1]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {open && <UpdatePromotion slug='promotions' columns={columns} setOpen={setOpen} promotionData={props} />}
    </div>
  )
}

export default Promotion