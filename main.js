const generateBtn = document.getElementById("generate-btn");
const codeBoxArea = document.getElementById("code");
const cryptoOptions = document.getElementById("crypto-options");
const copyBtn = document.getElementById("copy-btn"); 

// Show/hide wallet address fields based on checkbox status if checked

cryptoOptions.addEventListener("change", (e) => {
    const checkbox = e.target;
    const ticker = checkbox.value;
    const walletAddressField = document.querySelector(
        `input[name='${ticker}']`
    ).parentNode;
    if (checkbox.checked) {
        walletAddressField.style.display = "block";
    } else {
        walletAddressField.style.display = "none";
    }
    }
);


// hide each individual input fields on startup
const cryptoFields = document.querySelectorAll(".crypto-field");
cryptoFields.forEach((field) => {
    field.style.display = "none";
});

// after the text area inputs for wallet addresses are populated, when the user clicks the generate button, generate the code for a static website and put that code in the codeboxArea of the code box

generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const codeBox = document.getElementById("code-box");
    codeBox.style.display = "block";
    const code = generateCode();
    codeBoxArea.value = code;
});

// when the copy button is clicked, copy the code in the code box to the clipboard

copyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    codeBoxArea.select();
    document.execCommand("copy");
}
);

// urls for the images for all the coins

const coinUrls = {
    "BTC": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    "DOGE": "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    "ETH": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    "LTC" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    "XMR" : "https://s2.coinmarketcap.com/static/img/coins/64x64/328.png",
    "BCH" : "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png"
};  

// generate the code for the static website
function generateCode() {
    let code = "";
    const cryptoOptions = document.querySelectorAll(
        "#crypto-options input[type='checkbox']"
    );
    // get the text from each text input and keep track of which coin it goes to using the labels of the text boxes
    const cryptoFields = document.querySelectorAll(".crypto-field");
    const cryptoFieldsText = [];
    cryptoFields.forEach((field) => {
        const label = field.querySelector("label").textContent;
        const input = field.querySelector("input").value;
        cryptoFieldsText.push({ label, input });
    }
    );
    // generate the code for the static website
    //add style code to the website in a multiline string
    code += `
    <style>
        #crypto-donations {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .crypto-donation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 1rem;
            padding: 1rem;
            border: 1px solid black;
            border-radius: 5px;
        }
        .crypto-donation-header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .crypto-donation-header img {
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }
        .crypto-donation-header h3 {
            margin: 0;
        }
        .crypto-donation-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .crypto-donation-body p {
            margin: 0.5rem;
        }
        .code-box {
            background-color: #f2f2f2;
            padding: 20px;
            border-radius: 10px;
        }
        .copy-btn {
            background-color: #1DA1F2;
            border: none;
            color: white;
            padding: 8px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 2.5rem;
            margin: 10px 2px;
            cursor: pointer;
            border-radius: 30px;
            font-weight: bold;
        }
        .crypto-donation-top {
            margin-bottom: 30px;
        }
        .thicc-text {
            font-weight: bold;
            font-size: 3rem;
        }
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 80px;
            background-color: #f0f0f0;
            border-radius: 30px;
            box-shadow: 0 2px 5px rgba(0,0,0,.3);
            margin: 0 auto;
            /* center text horizontally and vertically */
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        .footer a {
            /* text-decoration: none; */
            color: #000;
        }
        h3 {
            font-size: 5rem;
        }
        canvas {
            padding-left: 0;
            padding-right: 0;
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
        p {
            font-size: 2rem;
        }
        </style>`;
    code += `
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>
`;
    code += "<div id='crypto-donations'>";
    cryptoOptions.forEach((option) => {
        if (option.checked) {
            let ticker = option.value;
            let cryptoField = cryptoFieldsText.find(
                (field) => field.label === option.parentNode.textContent
            );
            let walletAddress = cryptoField.input;
            code += `
    <div class='crypto-donation'>
        <div class='crypto-donation-header'>
        <img src='${coinUrls[ticker]}' style="width: 10vw; height: auto;">
            <h3>${ticker}</h3>
        </div>
        <div class='crypto-donation-body'>
            <div class="crypto-donation-top">
                <p class="thicc-text">Send ${ticker} to the following address:</p>
                <div class='${ticker}-code code-box'>
                    <p class="wallet-address">${walletAddress}</p>
                </div>
                <button class="copy-btn" onclick="${ticker}copyCode()">Copy</button>
            </div>
            <div class='crypto-donation-bottom'>
                <p class="thicc-text">Or scan the following QR code:</p>    
                <canvas id="${ticker}-qr"></canvas>
            </div>
        </div>
    </div>
`;
            // add javascript for the qr code
            code += `
    <script type="text/javascript">
        new QRious({
            element: document.getElementById("${ticker}-qr"), 
            value: "${walletAddress}",
            size: 400
        });
        function ${ticker}copyCode() {
            var copyText = document.querySelector(".${ticker}-code");
            var range = document.createRange();
            range.selectNode(copyText);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
        }
    </script>
`;
        }
    });
    code += "</div>";
    // add the footer
    code += `
<div class="footer">
    <p>This site created by <a href="https://dev00ps.com">Someone</a></p>
</div>
`;
    return code;
}