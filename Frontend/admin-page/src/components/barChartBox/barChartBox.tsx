import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts"
import "./barChartBox.scss"

type Props = {
    title: string;
    color: string;
    dataKey: string;
        lists: {
          number: number;
          month: string;
        }[];
}

const barChartBox = (props:Props) => {
  return (
    <div className="barChartBox">
        <h1>{props.title}</h1>
        <div className="chart">
            <ResponsiveContainer width="99%" height={150}>
                <BarChart data={props.lists}>
                    <Tooltip
                        contentStyle={{background:"#2a3447", borderRadius:"5px"}}
                        labelStyle={{display:"none"}}
                        cursor={{fill:"none"}}
                    />
                    <Bar dataKey={props.dataKey} fill={props.color}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default barChartBox