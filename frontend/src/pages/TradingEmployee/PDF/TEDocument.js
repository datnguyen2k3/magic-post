import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Tạo styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#C0C0C0'
    },
    logo: {
        margin: 10,
        padding: 10,
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold'
    },
    table: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        flexDirection: 'row'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    hotline: {
        margin: 10,
        padding: 10,
        textAlign: 'center',
        fontSize: 12
    }
});

// Tạo Component PDF
const TEDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.logo}>MagicPost</Text>
            <View style={styles.table}>
                <View style={styles.section}>
                    <Text>1. Thông tin người gửi</Text>
                    <Text>2. Thông tin người nhận</Text>
                    <Text>3. Loại hàng</Text>
                    <Text>4. Nội dung trị giá</Text>
                    <Text>5. Cam kết</Text>
                    <Text>6. Ngày gửi</Text>
                    <Text>7. Chữ ký người gửi</Text>
                </View>
                <View style={styles.section}>
                    <Text>8. Cước</Text>
                    <Text>9. Bưu cục chấp nhận</Text>
                </View>
                <View style={styles.section}>
                    <Text>10. Khối lượng</Text>
                    <Text>11. Ngày giờ nhận</Text>
                </View>
            </View>
            <Text style={styles.hotline}>Hotline: 123-456-7890</Text>
        </Page>
    </Document>
);

export default TEDocument