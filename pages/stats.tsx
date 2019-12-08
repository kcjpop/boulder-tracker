import Head from 'next/head'
import Chart from 'react-chartist'
import { Heading, Paragraph } from 'evergreen-ui'

import Layout from '@/Layout'
import { getAll } from '@/storage'

import '../chart.css'

function prepareData(sessions) {
  const [last, before] = Object.values(sessions)

  const lt = last.problems.map(p => p.count)

  return before != null ? [lt, before.problems.map(p => p.count)] : [lt]
}

export default function Stats() {
  const allSess = getAll()
  if (!allSess)
    return (
      <Layout>
        <Paragraph>No data to show. Start training!</Paragraph>
      </Layout>
    )

  const data = {
    labels: [
      '1',
      '2',
      '3',
      '4',
      '4+',
      '5',
      '5+',
      '6A',
      '6A+',
      '6B',
      '6B+',
      '6C',
      '6C+',
      '7A',
      '7A+',
      '7B',
      '7B+',
      '7C',
      '7C+',
      '8A',
      '8A+',
      '8B',
      '8B+',
      '8C',
      '8C+',
      '9A',
    ],
    series: prepareData(allSess),
  }

  const options = {
    reverseData: true,
    horizontalBars: true,
    axisX: {
      onlyInteger: true,
    },
    height: 600,
  }

  return (
    <Layout>
      <Head>
        <title>Stats</title>
      </Head>
      <Heading>Last Sesh</Heading>
      <div className="ct-chart ct-minor-second">
        <Chart type="Bar" data={data} options={options} />
      </div>
      <Heading>This Week</Heading>
    </Layout>
  )
}
