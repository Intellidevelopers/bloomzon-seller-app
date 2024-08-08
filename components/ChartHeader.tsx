import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ChartHeader = () => {
  return (
    <View>
      <View style={styles.chartDetails}>
                  <View style={styles.chartData}>
                    <Text style={styles.chartAmount}>$450.75</Text>
                    <Text style={styles.chartSubtitle}>Last 30 days</Text>
                  </View>
                  <View style={styles.chartData}>
                    <Text style={styles.chartAmount}>18% <Ionicons name='arrow-up' size={20} color={'green'} /></Text>
                    <Text style={styles.chartSubtitle}>Previous 30 days</Text>
                  </View>
                  <View style={styles.chartData}>
                    <Text style={styles.chartAmount}>40% <Ionicons name='arrow-down' size={20} color={'red'}/></Text>
                    <Text style={styles.chartSubtitle}>Last year</Text>
                  </View>
                </View>
    </View>
  )
}

export default ChartHeader

const styles = StyleSheet.create({
    
  chartSection: {
    marginVertical: 10,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  chartDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  chartData: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  chartContainer: {
    height: 250,
  },
})