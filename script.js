const nameInput = document.getElementById("name");
const startingBid = document.getElementById("startingBid");
const education = document.getElementById("education");
const netWorth = document.getElementById("networth");
const caste = document.getElementById("caste");
const skills = Array.from(document.querySelectorAll('input[name="skills"]'));
const ageGroups = Array.from(document.querySelectorAll('input[name="age"]'));
const reputationChecks = Array.from(document.querySelectorAll('input[name="reputation"]'));
const loveLetterInput = document.getElementById("loveLetter");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");

submitButton.addEventListener("click", () => calculate());

const calculate = () => {
    let name = nameInput.value;
    let price = Number(startingBid.value);

    if (!name || price === "") {
        alert("Please fill in both the Bride/Groom Name and Starting Bid.");
        return;
    }

    if (education.value !== "blank") {
        price *= Number(education.value);
    }

    if (netWorth.value !== "blank") {
        price *= Number(netWorth.value);
    }

    if (caste.value !== "blank") {
        price += Number(caste.value);
    }

    const skillsTotal = skills
        .filter(skill => skill.checked)
        .reduce((acc, skill) => acc + Number(skill.value), 0);
    price += skillsTotal;

    ageGroups.forEach(age => {
        if (age.checked) {
            price *= Number(age.value);
        }
    });

    let reputationCoefficient = 1;
    for (let i = 0; i < reputationChecks.length; i++) {
        if (reputationChecks[i].checked) {
            const repValue = reputationChecks[i].value;
            if (repValue === "-20") {
                price += Number(repValue);
            } else {
                reputationCoefficient *= Number(repValue);
            }
        }
    }
    price *= reputationCoefficient;

    let person = {
        bride_name: name,
        bride_price: price.toFixed(2),
        letter_to_bride: loveLetterInput.value
    };

    resultElement.innerText = `The calculated dowry price for ${person.bride_name} is $${person.bride_price}. Love letter: ${person.letter_to_bride}`;
    resultElement.style.color = "green";
    resultElement.style.fontWeight = "bold";
    resultElement.style.fontSize = "1.5em";
};
