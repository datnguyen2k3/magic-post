import './TEPrint.scss'
import TEDocument from './PDF/TEDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf'
import { base64_encoded_font_copied_from_website } from './font';

const TEPrint = () => {

    const doc = new jsPDF();

    // Thêm logo và tiêu đề
    doc.setFontSize(22);
    doc.text("MagicPost", 10, 20);

    // Thêm bảng thông tin
    doc.setFontSize(12);
    doc.text("1. Thông tin người gửi", 10, 30);
    doc.text("2. Thông tin người nhận", 60, 30);

    doc.text("3. Loại hàng", 10, 40);
    doc.text("4. Nội dung trị giá", 10, 50);
    doc.text("5. Cam kết", 10, 60);
    doc.text("6. Ngày gửi", 10, 70);
    doc.text("7. Chữ ký người gửi", 10, 80);

    doc.text("8. Cước", 60, 40);
    doc.text("9. Bưu cục chấp nhận", 60, 50);

    doc.text("10. Khối lượng", 110, 30);
    doc.text("11. Ngày giờ nhận", 110, 40);

    // Thêm hotline
    doc.setFontSize(10);
    doc.text("Hotline: 123-456-7890", 10, 100);

    doc.addFileToVFS("Arial.ttf", `${base64_encoded_font_copied_from_website}`);
    doc.addFont("Arial.ttf", "Arial", "normal");

    // Thiết lập font
    doc.setFont("Arial");

    const print = () => {
        doc.save('myfile.pdf')
    }

    return <>
        <div>
            <button onClick={print}>print</button>
        </div>
    </>
}

export default TEPrint