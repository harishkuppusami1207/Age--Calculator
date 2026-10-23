const birthDate = document.getElementById("birthDate");
const calculateButton = document.getElementById("calculateButton");
const message = document.getElementById("message");
const result = document.getElementById("result");
const birthdayText = document.getElementById("birthday");
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");

// Do not allow future dates in the picker
birthDate.max = new Date().toISOString().split("T")[0];

function showError(text) {
    message.textContent = text;
    result.classList.add("hidden");
    birthdayText.classList.add("hidden");
}

calculateButton.addEventListener("click", function () {
    message.textContent = "";

    if (birthDate.value === "") {
        showError("Please select your date of birth.");
        return;
    }

    // Split the value so the date is read in local time
    const [y, m, d] = birthDate.value.split("-").map(Number);
    const dateOfBirth = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateOfBirth > today) {
        showError("Date of birth cannot be in the future.");
        return;
    }

    let years = today.getFullYear() - dateOfBirth.getFullYear();
    let months = today.getMonth() - dateOfBirth.getMonth();
    let days = today.getDate() - dateOfBirth.getDate();

    if (days < 0) {
        months--;
        // Days in the month before the current month
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    result.classList.remove("hidden");

    // Next birthday countdown
    let nextBirthday = new Date(today.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysLeft = Math.round((nextBirthday - today) / (1000 * 60 * 60 * 24));

    birthdayText.textContent =
        daysLeft === 0
            ? "Happy birthday! 🎉"
            : "Your next birthday is in " + daysLeft + (daysLeft === 1 ? " day." : " days.");
    birthdayText.classList.remove("hidden");
});
