import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

interface Bar {
  label: string;
  value: number;
}

interface CustomBarChartProps {
  data: Bar[];
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(bar => bar.value));

  return (
    <SafeAreaView style={styles.chartContainer}>
      {data.map((bar, index) => (
        <View key={index} style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              { height: `${(bar.value / maxValue) * 100}%` },
            ]}
          />
          <Text style={styles.label}>{bar.label}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    padding: 10,
    gap: 15
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: 35,
    backgroundColor: '#00D1A3',
    borderRadius: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  label: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default CustomBarChart;
