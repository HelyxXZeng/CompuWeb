import { Link } from "react-router-dom"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import "./chartBox.scss"

type Props = {
    color: string;
    icon: string;
    title: string;
    dataKey: string;
    data: {
        count: number;
        percent: number;
        lists: {
          number: number;
          month: string;
        }[];
      };
};

const chartBox = (props:Props) => {
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <img src={props.icon} alt="" />
                    <span>{props.title}</span>
                </div>
                <h1>{props.data.count}</h1>
                <Link to="/" style={{ color: props.color }}>View all</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={props.data.lists}>
                            <Tooltip
                                contentStyle={{ background: "transparent", border: "none" }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 10, y: 70 }}
                            />
                            <Line
                                type={"monotone"}
                                dataKey={props.dataKey}
                                stroke={props.color}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <span className="percentage" style={{ color: props.data.percent < 0 ? "tomato" : "lightgreen" }}>{props.data.percent}%</span>
                    <span className="duration">this month</span>
                </div>
            </div>
        </div>
    )
}

export default chartBox