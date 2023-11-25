import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import "./bigChartBox.scss"

const data = [
    {
      name: "Sun",
      Laptop: 4000,
      Gear: 2400,
      Other: 2400,
    },
    {
      name: "Mon",
      Laptop: 3000,
      Gear: 1398,
      Other: 2210,
    },
    {
      name: "Tue",
      Laptop: 2000,
      Gear: 9800,
      Other: 2290,
    },
    {
      name: "Wed",
      Laptop: 2780,
      Gear: 3908,
      Other: 2000,
    },
    {
      name: "Thu",
      Laptop: 1890,
      Gear: 4800,
      Other: 2181,
    },
    {
      name: "Fri",
      Laptop: 2390,
      Gear: 3800,
      Other: 2500,
    },
    {
      name: "Sat",
      Laptop: 3490,
      Gear: 4300,
      Other: 2100,
    },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
        <h1>Revenue Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Other"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="Gear"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="Laptop"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BigChartBox