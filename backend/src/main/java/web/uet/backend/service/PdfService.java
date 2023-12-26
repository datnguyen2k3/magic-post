package web.uet.backend.service;

import jakarta.annotation.PostConstruct;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.event.DeliveryCreateEvent;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PdfService {

    public static File INVOICE;
    public static String DELIVERY_PDF_SOURCE_PATH = "src/main/resources/deliveries/pdfs/";

    @PostConstruct
    public void setInvoiceFile() throws IOException {
        PdfService.INVOICE = new File(DELIVERY_PDF_SOURCE_PATH + "invoice.pdf");
    }

    @EventListener
    @Async
    public void handleDeliveryCreatedEvent(DeliveryCreateEvent event) throws IOException {
        Delivery delivery = (Delivery) event.getSource();
        savePdf(delivery);
    }

    public byte[] getDeliveryPdfByteBy(String deliveryPdfName) throws IOException {
        Path path = Paths.get(DELIVERY_PDF_SOURCE_PATH + deliveryPdfName);
        return Files.readAllBytes(path);
    }

    private static void savePdf(Delivery delivery) throws IOException {
        write(delivery.getDeliveryId().toString(),
            delivery.getFromName(),
            delivery.getFromAddress(),
            delivery.getFromPhone(),
            delivery.getProductType().toString(),
            delivery.getName(),
            delivery.getDescription(),
            delivery.getCreatedAt().toString(),
            delivery.getToName(),
            delivery.getToAddress(),
            delivery.getToPhone(),
            delivery.getDescription(),
            delivery.getWeight().toString() + " kg",
            delivery.getShippingFee().toString(),
            delivery.getToShop().getShopId().toString(),
            ""
            );
    }

    private static void write(String deliveryId,
                             String senderName,
                             String senderLocation,
                             String senderPhone,
                             String type,
                             String name,
                             String senderNote,
                             String sendDate,
                             String receiverName,
                             String receiverLocation,
                             String receiverPhone,
                             String note,
                             String weight,
                             String cost,
                             String shop,
                             String receiveDate) throws IOException
    {
        PDDocument document = PDDocument.load(INVOICE);
        PDPage page = document.getPage(0);

        PdfService pc = new PdfService();
        pc.addText(document, page,deliveryId, 500, 498, 20);
        pc.addText(document, page,senderName, 185, 452, 12);
        pc.addText(document, page,receiverName, 560, 452, 12);
        pc.addText(document, page,senderLocation, 95, 435, 12);
        pc.addText(document, page,receiverLocation, 455, 435, 12);
        pc.addText(document, page,senderPhone, 75, 405, 12);
        pc.addText(document, page,receiverPhone, 435, 405, 12);
        if (type.equals("DOCUMENT")) {
            pc.addText(document, page,"x", 117, 370, 15);
        }
        else {
            pc.addText(document, page,"x", 207, 370, 15);
        }
        pc.addText(document, page,name, 105, 330, 12);
        pc.addText(document, page,senderNote, 180, 317, 12);
        pc.addText(document, page,note, 510, 379, 12);
        pc.addText(document, page,weight, 510, 295, 12);
        pc.addText(document, page,cost, 535, 267, 20);
        pc.addText(document, page,shop, 530, 230, 12);
        pc.addText(document, page,sendDate, 38, 132, 12);
        pc.addText(document, page,receiveDate, 582, 218, 12);

        document.save(DELIVERY_PDF_SOURCE_PATH + "delivery_"+ deliveryId +".pdf");
        document.close();
    }

    private void addText(PDDocument document, PDPage page, String value, int pos_x, int pos_y, int fontSize) throws IOException {
        PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true);
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA, fontSize);
        contentStream.setNonStrokingColor(Color.BLACK);
        contentStream.newLineAtOffset(pos_x, pos_y);
        contentStream.showText(value);
        contentStream.endText();
        contentStream.close();
    }

}