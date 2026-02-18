import { generateYAxis } from '@/app/lib/utils';
import { fetchRevenue } from '@/app/lib/data';
import RevenueChartUI from './revenue-chart-ui';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '../skeletons';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return (
      <p style={{ marginTop: 16, color: '#9ca3af' }}>No data available.</p>
    );
  }

  return (
    <RevenueChartUI
      revenue={revenue}
      chartHeight={chartHeight}
      yAxisLabels={yAxisLabels}
      topLabel={topLabel}
    />
  );
}
