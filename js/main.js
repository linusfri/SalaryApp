function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.id === selector) {
            callback(e);
        }
    });
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
    const results = document.querySelector("#res");
    try {
        const dataObject = getFormData();
        const salaryString = calculate(dataObject);
        results.value = salaryString;
    } catch (error) {
        results.value = error;
    }
});

function getFormData() {
    const form = document.getElementById("salaryForm");
    const formData = new FormData(form);
    const dataObj = {};
    const regExp = /[^0-9]+/;
    for (const data of formData.entries()) {
        if (data[1] === "" || regExp.test(data[1])) {
            throw new Error("Input data was in incorrect format!");
        }
        dataObj[data[0]] = data[1];
    }
    return dataObj;
}

function calculate(data) {
    const wSalaryInt = parseInt(data.wSalary);
    const oSalaryInt = parseInt(data.oSalary);
    const totalToPay = parseInt(data.payment);
    if ((wSalaryInt + oSalaryInt) < totalToPay)
    {
        throw new Error("You cannot pay!");
    }

    const williamPay = (totalToPay * wSalaryInt) / (oSalaryInt + wSalaryInt);
    const oliviaPay = totalToPay - williamPay;

    return `William: ${williamPay.toFixed(0)}kr\nOlivia: ${oliviaPay.toFixed(0)}kr`;
}
