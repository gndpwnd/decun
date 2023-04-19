const generateBtn = document.getElementById("generate-btn");
const codeBoxArea = document.getElementById("code");
const cryptoOptions = document.getElementById("crypto-options");
const copyBtn = document.getElementById("copy-btn"); 

// get the current year
const createdYear = new Date().getFullYear();

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
    "ADA" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    "BTC": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    "BCH" : "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
    "BNB" : "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    "DOGE": "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    "ETH": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    "LTC" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    "MATIC" : "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
    "NEO" : "https://s2.coinmarketcap.com/static/img/coins/64x64/1376.png",
    "SOL" : "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
    "XMR" : "https://s2.coinmarketcap.com/static/img/coins/64x64/328.png",
    "XRP" : "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
};  

// generate the code for the static website
function generateCode() {
    let code = "";
    // get the name of the organization from the text input of the form
    const orgName = document.getElementById("org-name").value;
    const orgSite = document.getElementById("org-website").value;
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
        body {
            background-color: #000;
        }
        #crypto-donations {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .crypto-donation {
            background-color: #f0f0f0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 1rem;
            padding: 1rem;
            border: 1px solid white;
            border-radius: 20px;
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
            background-color: #e3e3e3;
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
            box-shadow: 2px 2px 5px rgba(0,0,0,.3);
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
        h1 {
            color: #fff;
            text-align: center;
            font-size: 4rem;
            margin-top: 50px;
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
        .blank-space {
            height: 100px;
        }
    </style>
`;
    code += `
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>
<h1> Donate To ${orgName}!</h1>
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
                        <p id='${ticker}-address' class="wallet-address"></p>
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
            var ${ticker}walletAddress = "${walletAddress}";
            new QRious({
                element: document.getElementById("${ticker}-qr"), 
                value: ${ticker}walletAddress,
                size: 400
            });
            function ${ticker}copyCode() {
                var textToCopy = ${ticker}walletAddress;
                navigator.clipboard.writeText(${ticker}walletAddress);
            }
            var ${ticker}walletAddressElement = document.getElementById("${ticker}-address");
            if (${ticker}walletAddress.length > 10) {
                if (${ticker}walletAddress.length >= 15) {
                    var fp = ${ticker}walletAddress.substring(0, 10);
                    var lp = ${ticker}walletAddress.substring(${ticker}walletAddress.length - 5);
                    var mp = ".....";
                    ${ticker}walletAddressElement.textContent = fp + mp + lp;
                } else {
                    var shortenedText = ${ticker}walletAddress.substring(0, 10) + ".....";
                    ${ticker}walletAddressElement.textContent = shortenedText;
                }
            } else {
                ${ticker}walletAddressElement.textContent = ${ticker}walletAddress;
            }
        </script>
`;
        }
    });
    code += "</div>";
    // add the footer
    code += `
<div class="blank-space">
    <p> </p>
</div>
<div class="footer">
    <p id="copywright"></p>
</div>
<script>
    const currentYear = new Date().getFullYear();
    var copywrightele = document.getElementById("copywright");
    copywrightele.innerHTML = "Copyright &#169 ${createdYear}-" + currentYear + " <a href=\\"${orgSite}\\"> ${orgName}</a>";
</script>
`;
    return code;
}