/**
 @ Component: Button
 * --------------------------------------------------
 */

const _payment = function () {
 const card = document.createElement("div");
 const cardHead = document.createElement("div");
 const cardBody = document.createElement("div");
 const cardHeadTitle = document.createElement("h2");
 const cardPaymentImgContainer = document.createElement("div");
 const cardPaymentImg1 = document.createElement("img");
 const cardPaymentImg2 = document.createElement("img");
 const cardPaymentImg3 = document.createElement("img");
 const cardPaymentImg4 = document.createElement("img");
 card.className = "_card";
 cardHead.className = "_card--header";
 cardBody.className = "_card--body";
 cardPaymentImgContainer.className = "__cardimgcontainer";
 cardHeadTitle.innerHTML = "Payment Details";
 cardPaymentImg1.title = "Mastercard";
 cardPaymentImg2.title = "Discover";
 cardPaymentImg3.title = "Paypal";
 cardPaymentImg4.title = "American Express";
 cardPaymentImg1.src =
  "https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png";
 cardPaymentImg2.src =
  "https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png";
 cardPaymentImg3.src =
  "https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png";
 cardPaymentImg4.src =
  "https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png";
 cardPaymentImgContainer.appendChild(cardPaymentImg1);
 cardPaymentImgContainer.appendChild(cardPaymentImg2);
 cardPaymentImgContainer.appendChild(cardPaymentImg3);
 cardPaymentImgContainer.appendChild(cardPaymentImg4);
 cardHead.appendChild(cardHeadTitle);
 cardHead.appendChild(cardPaymentImgContainer);
 cardBody.innerHTML = `
 <div>
    <style>
       
    </style>
    <p>Card Number</p>
    <div style="_input-group">
        <input type="number" placeholder="Valid Card Number" />
        <button class="_btn"></button>
    </div>
    <div style="display:flex;">
        <div style="width:50%">
            <p>Expiry Date</p>
            <div style="_input-group">
                <input type="number" placeholder="MM" />
                <input type="number" placeholder="YY" />
            </div>
        </div>
        <div style="width:50%">
            <p>CV Code</p>
            <div style="_input-group">
                <input type="number" placeholder="CVC" />
                <button class="_btn"></button>
            </div>
        </div>
    </div>
 </div>
 `;
 card.appendChild(cardHead);
 card.appendChild(cardBody);
 document.body.appendChild(card);
};
