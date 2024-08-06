import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [100, 110, 125, 150, 140, 160],
      color: (opacity = 1) => `rgba(0, 204, 204, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [160, 170, 180, 190, 200, 230, 270],
      color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
      strokeWidth: 2,
      strokeDashArray: [10, 10], // Dashed line
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const DashedLineChart = () => {
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={256}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  chart: {
    borderRadius: 16,
  },
});

export default DashedLineChart;
