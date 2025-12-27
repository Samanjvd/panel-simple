import {
  LineChart,
  Line,
  XAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Chart = ({ title, data, lineInfo, grid }) => {
  return (
    <div className="w-full">
      <div className="shadow-custom px-4 m-5">
        <span className="font-semibold">{title}</span>
        <div className="w-full h-64 mt-2">
          <ResponsiveContainer width="100%">
            <LineChart data={data}>
              {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="10" />}
              {lineInfo.map((item) => (
                <Line
                  type="monotone"
                  dataKey={item.dataKey}
                  stroke={item.stroke}
                  name={item.name}
                />
              ))}
              <XAxis strokeDasharray={6} dataKey="name" stroke="#5550bd" />
              <Tooltip />
              <Legend content={<CustomLegend lineInfo={lineInfo} />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;

const CustomLegend = ({ payload, lineInfo }) => (
  <ul className="flex gap-6 mt-3 justify-center ">
    {payload.map((entry, index) => {
      const Icon = lineInfo.find(
        (item) => item.dataKey === entry.dataKey
      )?.icon;
      return (
        <li key={index} className="flex items-center gap-2">
          {Icon && <Icon style={{ color: entry.color }} fontSize="small" />}
          <span>{entry.value}</span>
        </li>
      );
    })}
  </ul>
);
