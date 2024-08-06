import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      data: [4, 5, 6, 7, 8, 9, 10],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [1, 2, 3, 4, 5, 6, 7],
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const BusinessAnalytics = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Analysis</Text>
        <Text style={styles.subTitle}>Sales Dashboard</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total order items</Text>
        <Text style={styles.cardValue}>7</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Units ordered</Text>
        <Text style={styles.cardValue}>7</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ordered product sales</Text>
        <Text style={styles.cardValue}>$4,950</Text>
      </View>

      <Text style={styles.compareTitle}>Compare Sales</Text>

      <Text style={styles.chartTitle}>Unit Ordered</Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Ordered Product Sales</Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    color: 'gray',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: 'gray',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  compareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default BusinessAnalytics;
