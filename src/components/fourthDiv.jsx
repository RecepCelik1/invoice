import React from "react";
import jsPDF from 'jspdf';
import { useSelector } from "react-redux";
import 'jspdf-autotable';


const FourthDiv = () => {

  //pdf ye bastırılacak dataları çekme kısmı
  const logo = useSelector(state => state.logo.uploadLogo)  // şu anlık yüklenen resimleri pdfye ekleyemiyoruz jsPDF boktan bir k
  const currency = useSelector(state => state.currency.currency)  // kütüphane düzeltince editlerim
  
  const name = useSelector(state => state.name)
  const details = useSelector(state => state.details)
  const calenders = useSelector(state => state.calenders)
  const productsData = useSelector(state => state.dataStore.data)
  const subTotal = useSelector(state => state.dataStore.sumOfamounts)
  const notes = useSelector(state => state.notes)
  const totals = useSelector(state => state.total)
  

  const generatePDF = () => {

    
    let length = 0; //=> dinamik content içeriği için dinamik height
    let taxValue = subTotal * (totals.tax/100) //=> vergi tutarı
    let totalAmount = (subTotal + (taxValue)) + (totals.shipping - totals.discount) //=> aritmetik işlemler vs.
    
    const doc = new jsPDF();  //=> yeni pdf oluştur


    doc.text(`invoice number : ${name.invoiceNumber}`,10,20)
    doc.text(`purchase order : ${name.purchaseOrder}`,150,20)
    doc.text(`company details : ${details.companyDetails}`,10,40)
    doc.text(`bill details : ${details.billDetails}`,150,40)
    doc.text(`invoice date : ${calenders.invoiceDate.day}/${calenders.invoiceDate.month + 1}/${calenders.invoiceDate.year}`,10,60)
    doc.text(`due date : ${calenders.dueDate.day}/${calenders.dueDate.month + 1}/${calenders.dueDate.year}`,150,60)

    for (let index = 0; index < productsData.length; index++) { //=> kullanıcının oluşturduğu ürünleri döngü ile teker teker bastır
      doc.text(`description : ${typeof(productsData[index].description) == "undefined" ? "" : productsData[index].description}     unit cost : ${typeof(productsData[index].cost) == "undefined" ? "" : productsData[index].cost}    quantity : ${typeof(productsData[index].quantity) == "undefined" ? "" : productsData[index].quantity}     unit amount : ${typeof(productsData[index].amount) == "undefined" ? "" : productsData[index].amount}`,10, 90 + (index*10))
      length = length + 1;
    }
    
    doc.text(`terms : ${notes.notes}`,10, 110 + (length*10))
    doc.text(`bank account details : ${notes.bankAccount}`,10, 130 + (length*10))
    doc.text(`subtotal : ${currency} ${isNaN(subTotal) ? 0 : subTotal}`,10, 150 + (length*10))
    doc.text(`tax rate : ${totals.tax} %`,10, 170 + (length*10))
    doc.text(`tax : ${currency}${isNaN(taxValue) ? 0 : taxValue}`,10, 190 + (length*10))
    doc.text(`discount : ${currency} -${totals.discount}`,10, 210 + (length*10))
    doc.text(`shipping : ${currency}${totals.shipping}`,10, 230 + (length*10))
    doc.text(`invoice total : ${currency}${isNaN(totalAmount) ? 0 : totalAmount}`,10, 250 + (length*10))


    // PDF dosyasını indir
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