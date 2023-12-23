import { GridColDef } from "@mui/x-data-grid";
import { PromotionDef } from "../../api/promotionAPI"
import PromotionInfo from "../../components/promotioninfo/PromotionInfo"
import "./promotion.scss"
import { useEffect, useState } from "react";
import { promotionExample } from "../../data";
import { useParams } from "react-router-dom";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import UpdatePromotion from "../../components/updatePromotion/updatePromotion";
import { TextareaAutosize } from "@mui/material";

interface Props {
  promotion: PromotionDef;
}
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
    const fetchDataAndSetState = async () => {
      try {
        //const result = await fetchData();
        //setData(result);
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
      }
    };
  })
  const { id } = useParams();
  const props = promotionExample;
  console.log(id,props.Id);
  return (
    <div className="promotion">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{props.Name}</h1>
            <button onClick={() => setOpen(true)}>Update</button>
          </div>
          <div className="details">
            {Object.entries(props).map((item) => (
              <div className={` ${(item[0] === "Name" || item[0] === "Id"
               || item[0] === "StartDate" || item[0] === "EndDate") ? "item2row" : "item"}`} key={item[0]}>
                <span className="itemTitle">{item[0]}:</span>
                {item[0] === "Content" ? (
                  <TextareaAutosize  
                    className="itemValue"
                    value={item[1]}
                    disabled
                    minRows={2} // Adjust the number of rows as needed
                    maxRows={4}
                    // Thêm các thuộc tính khác tùy thuộc vào nhu cầu
                  />
                ) : (
                  <span className="itemValue">{item[1]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
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
                {props.chart.dataKeys.map((dataKey) => (
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