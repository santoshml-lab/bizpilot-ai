/* ===================================
   BIZPILOT AI
   invoice.js
=================================== */

const company = document.getElementById("company");
const client = document.getElementById("client");
const invoiceNo = document.getElementById("invoiceNo");
const invoiceDate = document.getElementById("invoiceDate");
const item = document.getElementById("item");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const gst = document.getElementById("gst");

const generateBtn = document.getElementById("generateBtn");
const invoicePreview = document.getElementById("invoicePreview");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

/* Generate Invoice */

generateBtn.addEventListener("click", generateInvoice);

function generateInvoice(){

const qty = Number(quantity.value);
const pr = Number(price.value);
const gstPercent = Number(gst.value);

const subtotal = qty * pr;
const gstAmount = subtotal * gstPercent / 100;
const total = subtotal + gstAmount;

invoicePreview.innerHTML = `
<h2>${company.value}</h2>
<hr><br>

<b>Invoice No:</b> ${invoiceNo.value}<br>
<b>Date:</b> ${invoiceDate.value}<br>
<b>Client:</b> ${client.value}<br><br>

<table style="width:100%;border-collapse:collapse;">

<tr>
<th align="left">Item</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
</tr>

<tr>
<td>${item.value}</td>
<td align="center">${qty}</td>
<td align="center">₹${pr}</td>
<td align="right">₹${subtotal}</td>
</tr>

</table>

<br><hr>

<p><b>Subtotal :</b> ₹${subtotal}</p>

<p><b>GST (${gstPercent}%) :</b> ₹${gstAmount}</p>

<h2>Total : ₹${total}</h2>

<br>

<p>Thank you for your business ❤️</p>
`;

}

/* Copy */

copyBtn.addEventListener("click", ()=>{

navigator.clipboard.writeText(invoicePreview.innerText);

copyBtn.innerHTML="✅ Copied";

setTimeout(()=>{

copyBtn.innerHTML="📋 Copy";

},2000);

});

/* Download */

downloadBtn.addEventListener("click",()=>{

const blob = new Blob(
[invoicePreview.innerText],
{type:"text/plain"}
);

const a = document.createElement("a");

a.href = URL.createObjectURL(blob);

a.download = "Invoice.txt";

a.click();

});
