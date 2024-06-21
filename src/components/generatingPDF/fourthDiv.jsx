import React from "react";
import { Page, Text, View, Document, PDFDownloadLink ,StyleSheet, Font, Svg, Line, Image} from '@react-pdf/renderer';
import Gabarito from '../../fonts/Gabarito/Gabarito-Regular.ttf'
import GabaritoBold from '../../fonts/Gabarito/Gabarito-Bold.ttf'
import { useSelector } from "react-redux";


Font.register({
  family: 'Gabarito',
  src : Gabarito,
})
Font.register({
  family: 'GabaritoBold',
  src : GabaritoBold,
})
const months = {
  0 : "January",
  1 : "February",
  2 : "March",
  3 : "April",
  4 : "May",
  5 : "June",
  6 : "July",
  7 : "August",
  8 : "September",
  9 : "October",
  10 : "November",
  11 : "December"
}
// PDF için bir bileşen oluştur
const styles = StyleSheet.create({
  page: {
    display : '',
    flexDirection: '',
    padding : '48px'
  },
  header: {
    fontFamily : "GabaritoBold",
    fontSize: '24px',
  },
  topSegments : {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom : '32px'
  },
  companyInfoSegments : {
    textAlign : 'right'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: '48px',
    right: '48px',
  },
  container: {
    backgroundColor: '#ebf8ff',
    padding: 12,
    borderRadius: 6,
    border: '1px solid #bee3f8',
    marginTop: 40,
    color: '#2b6cb0',
    fontSize: 10,
    fontFamily: 'Gabarito',
  },

});

const FourthDiv = () => {
  const currency = useSelector(state => state.currency.currency) 
  
  const name = useSelector(state => state.name)
  const details = useSelector(state => state.details)
  const calenders = useSelector(state => state.calenders)
  const productsData = useSelector(state => state.dataStore.data)
  const subTotal = useSelector(state => state.dataStore.sumOfamounts)
  const notes = useSelector(state => state.notes)
  const totals = useSelector(state => state.total)
  const logoPath = useSelector((state) => state.logo.uploadLogoPath); 
  //pdf ye bastırılacak dataları çekme kısmı

  const tax = parseFloat(totals.tax);
  const discount = parseFloat(totals.discount);
  const taxValue = ((subTotal - discount)*tax)/100
  const shippingCost = parseFloat(totals.shipping);
  const absoluteTotal = subTotal - discount + shippingCost + taxValue

  const formatNumberWithCommas = (number) => {
    number = parseFloat(number);
    isNaN(number) ? number = 0 : number = number + 0;
    number = number.toFixed(2);
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };  

  const PDFfile = () => {
    return (
      <Document>
      <Page size="A4" style={styles.page}>
      <View style={styles.topSegments}>
          <View style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
            <View style={{display:"flex", justifyContent:"center", alignContent:"center"}}> 

            <Text style={styles.header}>Invoice #{name.invoiceNumber}</Text>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop : "4px"}}>
              <View style={{ marginRight: 7 }}>
                <Text style={{ fontFamily: 'GabaritoBold', fontSize : '12px', marginBottom: 0, textAlign: 'center', }}>Date of Issue</Text>
                <Text style={{ fontFamily: 'Gabarito', fontSize: 12 }}>
                  {months[calenders.invoiceDate.month]} {calenders.invoiceDate.day} {calenders.invoiceDate.year}
                </Text>
              </View>
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontFamily: 'GabaritoBold', fontSize : '12px', marginBottom: 0, textAlign: 'center' }}>Due Date</Text>
                <Text style={{ fontFamily: 'Gabarito', fontSize: 12 }}>
                  {months[calenders.dueDate.month]} {calenders.dueDate.day} {calenders.dueDate.year}
                </Text>
              </View>
            </View>

            <View style={{marginTop : "4px"}}>
              <Text style={{ fontFamily : 'GabaritoBold', fontSize : '12px' }}>Purchase Order</Text>
              <Text style={{ fontFamily : 'Gabarito', fontSize : '12px' }}>{name.purchaseOrder}</Text>
            </View>

            </View>
            {    
              logoPath !==null ?<Image src={logoPath} style={{maxWidth:'150px', maxHeight: '150px'}}/> : ""}
          </View>
        </View>
        <View style={styles.companyInfoSegments}>
          <Text style={{fontFamily : 'GabaritoBold' , fontSize : '12px', marginBottom : '4px'}}>From :</Text>
          <Text style={{ fontFamily : 'Gabarito' , fontSize : '12px', marginBottom : '4px'}}>{details.companyDetails}</Text>
        </View>
        <Svg style={{marginTop : '4px', marginBottom : '4px'}} height="10" width="500">
          <Line
            x1="0"
            y1="2"
            x2="2000"
            y2="2"
            stroke="rgb(192,192,192)"
          />
        </Svg>
        <View style={{marginTop : '5px' , marginBottom : '5px'}}>
          <Text style={{fontFamily : 'GabaritoBold' , fontSize : '12px', marginBottom : '4px'}}>Bill to :</Text>
          <Text style={{ fontFamily : 'Gabarito' , fontSize : '12px', marginBottom : '4px'}}>{details.billDetails}</Text>
        </View>
        <Svg style={{marginTop : '4px', marginBottom : '4px'}} height="10" width="500">
          <Line
            x1="0"
            y1="2"
            x2="2000"
            y2="2"
            stroke="rgb(192,192,192)"
          />
        </Svg>
        <View style={{marginBottom : '40px'}}>
          <Text style={{ fontFamily : 'Gabarito' , fontSize : '12px' }}>{notes.notes}</Text>
        </View>
  
        <View style={{borderBottom : '1px', borderColor : '#c0c0c0',width : '100%'}}>{/* table header */}
          <View style={{marginBottom : '5px', marginTop : '5px',display : 'flex', flexDirection : 'row'}}>
            <View style={{display : 'flex' , flexDirection : 'row', width : '50%'}}>
              <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', width : '15%', display : 'flex', alignItems : 'center', justifyContent : 'center'}}>Item</Text>
              <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', width : '85%', textAlign : "center"}}>Description</Text>
            </View>
            <View style={{display : 'flex', flexDirection : 'row', width : '50%'}}>
              <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', width : '100%', textAlign : "center"}}>Unit Price</Text>
              <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', width : '100%', textAlign : "center"}}>Quantity</Text>
              <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', width : '100%', textAlign : "center"}}>Amount</Text>
            </View>
          </View>
        </View>

        {productsData.map((product, index) => (
  <View key={index} style={{ borderBottom: '1px', borderColor: '#c0c0c0', width: '100%' }}>
    <View style={{ marginBottom: '5px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
      <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
        <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{index + 1}</Text>
        <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '85%', textAlign : "center"}}>{product.description}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
        <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '100%', textAlign : "center"}}>{currency} {formatNumberWithCommas(product.cost)}</Text>
        <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '100%', textAlign : "center"}}>{product.quantity}</Text>
        <Text style={{ fontFamily: 'Gabarito', fontSize: '10px', width: '100%', textAlign : "center"}}>{currency} {formatNumberWithCommas(product.amount)}</Text>
      </View>
    </View>
  </View>
))}

      <View style={{width : '100%', marginTop : "5px"}}>{/* table content */}
          <View style={{marginBottom : '5px', marginTop : '5px',display : 'flex', flexDirection : 'row'}}>
            <View style={{display : 'flex' , flexDirection : 'row', width : '70%'}}>
              <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', width : '15%', display : 'flex', alignItems : 'center', justifyContent : 'center'}}></Text>
              <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', width : '85%', textAlign : "center"}}></Text>
            </View>
            <View style={{display : 'flex', flexDirection : 'column', width : '30%'}}>
              <View style={{display : 'flex', justifyContent : "space-between", flexDirection : "row"}}>
                <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', textAlign : "left"}}>Subtotal </Text>
                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px',textAlign : "right"}}>{currency} {formatNumberWithCommas(subTotal)}</Text>
              </View>
              <View style={{display : 'flex', justifyContent : "space-between", flexDirection : "row"}}>
                <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', textAlign : "left"}}>Discount </Text>
                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px',textAlign : "right"}}>{currency} {formatNumberWithCommas(discount)}</Text>
              </View>
              <View style={{display : 'flex', justifyContent : "space-between", flexDirection : "row"}}>
                <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', textAlign : "left"}}>Taxes </Text>
                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px',textAlign : "right"}}>{currency} {formatNumberWithCommas(taxValue)}</Text>
              </View>
              <View style={{display : 'flex', justifyContent : "space-between", flexDirection : "row"}}>
                <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', textAlign : "left"}}>Shipping </Text>
                <Text style={{ fontFamily: 'Gabarito', fontSize: '10px',textAlign : "right"}}>{currency} {formatNumberWithCommas(shippingCost)}</Text>
              </View>
              <View style={{display : 'flex', flexDirection : "column"}}>
                <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', textAlign : "right", marginTop : "5px"}}>INVOICE TOTAL</Text>
                <Text style={{fontFamily : 'GabaritoBold', fontSize : '12px', textAlign : "right"}}>{currency} {formatNumberWithCommas(absoluteTotal)}</Text>
              </View>
              
            </View>
          </View>
        </View>

        <View style={styles.container} wrap={false}>
          <Text>{notes.bankAccount}</Text>
        </View>
  
        <View style={styles.footer}>
          <Text style={{fontFamily : 'Gabarito', fontSize : '12px'}}>This includes non-business days.</Text>
          <Svg style={{marginTop : '4px'}} height="10" width="500">
          <Line
            x1="0"
            y1="2"
            x2="2000"
            y2="2"
            stroke="rgb(192,192,192)"
          />
        </Svg>
        <Text style={{fontFamily : 'Gabarito', fontSize : '12px', color : '#c0c0c0'}}>Invoice #{name.invoiceNumber}</Text>
        </View>
      </Page>
    </Document>
)}

    return (
        <div className=" w-full h-[118.7px]">

          <div className="hidden">
            <PDFDownloadLink document={<PDFfile />} fileName="invoice.pdf" id="download-pdf">
            </PDFDownloadLink>
          </div> 

          <div className='w-[754px] h-[48px] mt-[35.35px] mb-[35.35px] mr-[19.99px] ml-[19.99px]'>
            <button
              className={`w-full h-full bg-[#9fe870] rounded-full text-lg font-semibold ${!true ? `opacity-80` : ``}`}
              onClick={() => document.getElementById('download-pdf').click()}
              disabled = {!true}
              >{!true ? 'Generating...' : 'Create Invoice'}</button>
          </div>

        </div>
    )
}

export default FourthDiv