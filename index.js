const address = document.getElementById("donationAddress");

const copyToClipboard = () => {
    navigator.clipboard.writeText(copyText.innerText);
}