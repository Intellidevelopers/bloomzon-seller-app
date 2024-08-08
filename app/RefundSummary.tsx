import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const RefundSummary = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { amountToRefund, taxOnAmountToRefund, reason } = params;
    const refundAmount = parseFloat(amountToRefund as string) || 0;
    const tax = parseFloat(taxOnAmountToRefund as string) || 0;
    const grandTotal = refundAmount + tax;

    const handleRefund = () => {
      router.push('/refundSuccess')
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 65, marginBottom: 10, marginTop: -10}}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name='arrowleft' size={22} />
                </TouchableOpacity>
                <Text style={{fontSize: 18, fontFamily: "Semibold", top: 25}}>Refund Summary</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.refundSummaryContainer}>
                    <Text style={styles.sectionTitle}>Refund Summary</Text>
                    <Text style={styles.sectionSubtitle}>
                        Review the complete refund details here. This summary includes the total amount to be refunded to the buyer, with all applicable taxes. Make sure all information is accurate before finalizing the refund.
                    </Text>
                    <View style={styles.returnItem}>
                        <View style={styles.returnHeader}>
                            <Text style={styles.orderId}>Order ID: #566767788</Text>
                            <Text style={styles.date}>30/07/2024</Text>
                        </View>
                        <View style={styles.returnContent}>
                            <Image source={require('../assets/products/img4.jpg')} style={styles.returnImage} />
                            <View style={styles.returnDetails}>
                                <Text style={styles.title}>Essential Casual Orange Basic Shot Sleeve Tee</Text>
                                <Text style={styles.sku}>SKU: <Text style={{color: "#666", fontWeight: "400"}}>ORANGE-SHIRT-WOMEN</Text></Text>
                                <Text style={styles.reason}>Reason: <Text style={{color: "#666", fontWeight: "400"}}>{reason}</Text></Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Amount to Refund:</Text>
                        <Text style={styles.amountValue}>${refundAmount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Tax on Amount to Refund:</Text>
                        <Text style={styles.amountValue}>${tax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Grand Total:</Text>
                        <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={handleRefund}>
                        <Text style={styles.submitButtonText}>Submit Refund</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: SCREEN_WIDTH
    },
    backButton: {
        marginBottom: 10,
        marginTop: 60,
        backgroundColor: "#eee",
        padding: 16,
        width: 55,
        alignItems: "center",
        borderRadius: 100,
        left: 10
    },
    scrollViewContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    refundSummaryContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Semibold",
        marginBottom: 10,
    },
    sectionSubtitle: {
        fontSize: 14,
        fontFamily: "Regular",
        color: "#666",
        marginBottom: 20,
    },
    orderContainer: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "#ccc"
    },
    orderId: {
        fontSize: 16,
        fontFamily: "Bold",
    },
    orderDate: {
        fontSize: 14,
        fontFamily: "Regular",
        color: "#666",
    },
    orderDetails: {
        flexDirection: "row",
        alignItems: "center",
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontFamily: "Medium",
        marginBottom: 4,
    },
    productSKU: {
        fontSize: 14,
        fontFamily: "Regular",
        color: "#666",
        marginBottom: 4,
    },
    productReason: {
        fontSize: 14,
        fontFamily: "Regular",
        color: "#666",
    },
    amountContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    amountLabel: {
        fontSize: 16,
        fontFamily: "Regular",
    },
    amountValue: {
        fontSize: 16,
        fontFamily: "Regular",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontFamily: "Semibold",
    },
    totalValue: {
        fontSize: 18,
        fontFamily: "Semibold",
    },
    submitButton: {
        backgroundColor: "#FF8C00",
        paddingVertical: 13,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Regular",
    },
    returnsContainer: {
        flex: 1,
        padding: 16,
    },
    returnItem: {
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 8,
        marginBottom: '30%',
        backgroundColor: '#fff',
    },
    returnHeader: {
        padding: 10,
        backgroundColor: '#eee',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    returnContent: {
        flexDirection: 'row',
        padding: 16,
    },
    returnImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 10
    },
    returnDetails: {
        flex: 1,
    },
    date: {
        color: '#555',
    },
    title: {
        marginTop: 4,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    sku: {
        color: '#000',
        fontWeight: "700"
    },
    reason: {
        color: '#000',
        marginTop: 4,
        fontWeight: "700"
    },
});

export default RefundSummary;
