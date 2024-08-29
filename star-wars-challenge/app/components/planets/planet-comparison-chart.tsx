import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Planet } from '~/interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

type PlanetAttributeChartProps = {
  planets: Planet[];
  attribute: keyof Planet;
  label: string;
  backgroundColor?: string[];
  borderColor?: string[];
};

const defaultColors = [
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const defaultBorderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

const PlanetAttributeChart: React.FC<PlanetAttributeChartProps> = ({
  planets,
  attribute,
  label,
  backgroundColor = defaultColors,
  borderColor = defaultBorderColors,
}) => {
  const labels = planets.map((planet) => planet.name);

  const data = {
    labels,
    datasets: [
      {
        label,
        data: planets.map((planet) =>
          planet[attribute] === 'unknown' || planet[attribute] === 'N/A'
            ? 0
            : Number(planet[attribute]),
        ),
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: label,
      },
    },
  };

  return (
    <div className="mx-auto mb-8 w-full max-w-4xl">
      <h1 className="text-center">{label}</h1>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PlanetAttributeChart;
