import { kMaxLength } from "buffer";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { StatisticsResponse } from "../../services/common.service";

interface Props {
  data: StatisticsResponse[];
}

const Chart: React.FC<Props> = ({ data }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const updateMinMax = () => {
    data.forEach((item) => {
      if (item.count < min) {
        setMin(item.count);
      }
      if (item.count > max) {
        setMax(item.count);
      }
    });
  };

  useEffect(() => {
    updateMinMax();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateTime" padding={{ left: 30, right: 30 }} />
        <YAxis
          domain={[min, `dataMax + ${max}`]}
          tickCount={7}
          strokeWidth={3}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="green"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
