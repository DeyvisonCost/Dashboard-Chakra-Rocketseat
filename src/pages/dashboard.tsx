import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    fillSeriesColor: false,
    theme: "dark",
  },
  xaxis: {
    type: 'datetime', 
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-02-18T00:00:00.000Z',
      '2022-02-19T00:00:00.000Z',
      '2022-02-20T00:00:00.000Z',
      '2022-02-21T00:00:00.000Z',
      '2022-02-22T00:00:00.000Z',
      '2022-02-23T00:00:00.000Z',
      '2022-02-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  { name: 'series1', data: [60, 135, 100, 38, 61, 18, 100] }
]

const opens = [
  { name: 'opens', data: [20, 19, 32, 36, 54, 70, 106] }
]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1490} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px"  alignContent={"flex-start"}>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Incritos da semana</Text>
            <Chart options={options} series={series} type="area" height={260} />
          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart options={options} series={opens} type="area" height={260} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}