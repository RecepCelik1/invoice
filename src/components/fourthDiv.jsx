import React from "react";
import jsPDF from 'jspdf';
import { useSelector } from "react-redux";
import 'jspdf-autotable';


const FourthDiv = () => {

  //pdf ye bastırılacak dataları çekme kısmı

  const currency = useSelector(state => state.currency.currency) 
  
  const name = useSelector(state => state.name)
  const details = useSelector(state => state.details)
  const calenders = useSelector(state => state.calenders)
  const productsData = useSelector(state => state.dataStore.data)
  const subTotal = useSelector(state => state.dataStore.sumOfamounts)
  const notes = useSelector(state => state.notes)
  const totals = useSelector(state => state.total)
  const logoPath = useSelector((state) => state.logo.uploadLogoPath);

  const generatePDF = () => {

    
    
    let length = productsData.length-1; //=> dinamik content içeriği için dinamik height
    let taxValue = subTotal * (totals.tax/100) //=> vergi tutarı
    let totalAmount = (subTotal + (taxValue)) + (totals.shipping - totals.discount) //=> aritmetik işlemler vs.
    let index = 0;
    const doc = new jsPDF();  //=> yeni pdf oluştur

    let regionWidth = doc.internal.pageSize.width;

    doc.setFont("helvetica");
    doc.setFontSize(30);
    doc.setTextColor( 101, 101, 101 );
    
    doc.text("Invoice",20 ,20 )
    doc.setFontSize(10);
    doc.text(`INVOICE NUMBER`,20,35)
    doc.setFontSize(13);
    doc.setTextColor( 0, 0, 0 );
    doc.text(`${name.invoiceNumber}`,20,42)

    doc.setTextColor( 101, 101, 101 )
    doc.setFontSize(10);
    doc.text(`DATE OF ISSUE`, 65, 35)
    doc.setTextColor( 0, 0, 0 );
    doc.text(`${calenders.invoiceDate.day}/${calenders.invoiceDate.month + 1}/${calenders.invoiceDate.year}`,65,42)

    doc.setTextColor( 101, 101, 101 )
    doc.setFontSize(10);
    doc.text(`DUE DATE`, 110, 35)
    doc.setTextColor( 0, 0, 0 );
    doc.text(`${calenders.dueDate.day}/${calenders.dueDate.month + 1}/${calenders.dueDate.year}`,110,42)

         if (logoPath) {
       const img = new Image();
       img.src = logoPath;
       doc.addImage(img, 'PNG', 150, 10, 50, 50);
       doc.addImage(img, 'JGP', 150, 10, 50, 50);
       doc.addImage(img, 'JPEG', 150, 10, 50, 50);
       console.log('Logo yüklendi');
       }

       doc.setTextColor( 101, 101, 101 )
       doc.setFontSize(10);
       doc.text(`BILLED TO`,20,57)
       doc.setFontSize(13);
       doc.setTextColor( 0, 0, 0 );
       doc.text(`${details.billDetails}`,20,64)

       doc.setTextColor( 101, 101, 101 )
       doc.setFontSize(10);
       doc.text(`FROM`,65,57)
       doc.setFontSize(13);
       doc.setTextColor( 0, 0, 0 );
       doc.text(`${details.companyDetails}`,65,64)

       doc.setTextColor( 101, 101, 101 )
       doc.setFontSize(10);
       doc.text(`PURCHASE ORDER`,110,57)
       doc.setFontSize(13);
       doc.setTextColor( 0, 0, 0 );
       doc.text(`${name.purchaseOrder}`,110,64)
   

      doc.setFillColor(240,240,240); 
      doc.rect(0, 95, regionWidth,115 + (length*10), 'F');
      doc.setTextColor( 101, 101, 101 )
      doc.setFontSize(12);
      doc.text(`Description`,20,105)
      doc.text(`Unit Cost`,110,105)
      doc.text(`QTY`,150,105)
      doc.text(`Amount`,180,105)
      doc.setTextColor( 0, 0, 0 );
      doc.setFontSize(12)

      let height = 125;
      let count = 0;
      const itemsPerPage = 8; // Her sayfada görüntülenecek öğe sayısı
      
      for (index; index < productsData.length; index++) {
        
        if (index > 0 && index % itemsPerPage === 0) {
          doc.setFillColor(255, 255, 255);
          doc.rect(0, 210, regionWidth, 100 + (length * 10), 'F');
          doc.addPage();
          doc.setFillColor(240, 240, 240);
          doc.rect(0, 95, regionWidth, 220, 'F');
          doc.setTextColor(101, 101, 101);
          doc.setFontSize(12);
          doc.text(`Description`, 20, 105);
          doc.text(`Unit Cost`, 110, 105);
          doc.text(`QTY`, 150, 105);
          doc.text(`Amount`, 180, 105);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          count = 0;
        }
      
        doc.text(`${typeof productsData[index].description === 'undefined' ? '' : productsData[index].description}`, 20, height + count * 10);
        doc.text(`${typeof productsData[index].cost === 'undefined' ? '' : productsData[index].cost}`, 110, height + count * 10);
        doc.text(`${typeof productsData[index].quantity === 'undefined' ? '' : productsData[index].quantity}`, 150, height + count * 10);
        doc.text(`${typeof productsData[index].amount === 'undefined' ? '' : productsData[index].amount}`, 180, height + count * 10);
        count++;
      }

      doc.setTextColor( 101, 101, 101 )
      doc.line(20, 130 + (count-1)*10, regionWidth-20, 130 + (count-1) * 10);
      doc.text(`TERMS`,20, 135 + count*10)
      doc.setTextColor( 0, 0, 0 )
      doc.text(`${notes.notes}`,20,142 + count*10)
      doc.setTextColor( 101, 101, 101 )
      doc.setFontSize(12)
      doc.text(`SUBTOTAL`,120 , 135 + count*10)
      doc.text(`DISCOUNT`,120 , 142 + count*10)
      doc.text(`(TAX RATE)`,120 , 149 + count*10)
      doc.text(`TAX`,120 , 156 + count*10)
      doc.text(`SHIPPING`,120 , 163 + count*10)

      doc.setTextColor( 0, 0, 0 )
      doc.setFontSize(12)

      doc.text(`${currency} ${isNaN(subTotal) ? 0 : subTotal}`,170 , 135 + count*10)
      doc.text(`${currency} -${totals.discount}`,170 , 142 + count*10)
      doc.text(`${totals.tax} %`,170 , 149 + count*10)
      doc.text(`${currency} ${isNaN(taxValue) ? 0 : taxValue}`,170 , 156 + count*10)
      doc.text(`${currency} ${totals.shipping}`,170 , 163 + count*10)
      doc.setTextColor( 101, 101, 101 )
      doc.text(`INVOICE TOTAL`,150,177 + count*10)

      doc.setTextColor( 0, 0, 0 )
      doc.setFontSize(14)
      doc.text(`${currency} ${isNaN(totalAmount) ? 0 : totalAmount}`,150,188+count*10)

      doc.setFillColor(255, 255, 255);
      doc.rect(0, 196.5 + count*10, regionWidth, 205 + count*10, 'F');

      doc.setTextColor( 101, 101, 101 )
      doc.setFontSize(10)
      doc.text(`BANK ACCOUNT DETAILS`,20,205 + count*10)
      doc.setTextColor( 0, 0, 0 )
      doc.text(`${notes.bankAccount}`,20,212 + count*10)


    doc.save('invoice.pdf'); 
  };

    return (
        <div className=" w-full h-[118.7px]">
                  
                 <div className='w-[754px] h-[48px] mt-[35.35px] mb-[35.35px] mr-[19.99px] ml-[19.99px]'>
                   <button 
                   onClick={generatePDF}
                   className='w-full h-full bg-[#9fe870] rounded-full text-lg font-semibold'>Create the invoice</button>
                 </div>

                </div>
    )
}

export default FourthDiv