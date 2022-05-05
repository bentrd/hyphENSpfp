const address = document.getElementById("donationAddress");

const donate = () => {
    navigator.clipboard.writeText('0x4EdD54039EE4fe332b43477E8E8F233D60059cc2')
        .then(() => {
            console.log("address successfully copied");
        })
}