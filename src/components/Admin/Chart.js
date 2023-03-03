import React from 'react'
import { useTheme } from '@mui/material/styles'
import { BarChart, Bar, Cell, XAxis, YAxis,  Tooltip, ResponsiveContainer, Label } from 'recharts'
import Title from './Title'

export default function Chart(props) {

  const theme = useTheme();

  return (
    <>
      <Title>{props.chartTitle}</Title>
      <ResponsiveContainer>
        <BarChart
          data={props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey={props.x}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {props.xlabel}
            </Label>
          </YAxis>
          <Tooltip />
          <Bar dataKey={props.y} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}