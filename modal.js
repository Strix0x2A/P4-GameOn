import Validator from "./Validator.js";

function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.classList.replace("responsive");
	} else {
		x.classList.replace("topnav");
	}
}

// #region DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");
const finishBtn = document.querySelector(`.form-validated-text+.btn-submit.button`);
const formReserve = document.querySelector("form");
const formStrInput = document.querySelectorAll(".text-control");
// #endregion

// #region MODAL FORM
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// close modal form
function closeModal() {
	modalbg.style.display = "none";
}
finishBtn.addEventListener("click", closeModal);
// #endregion

// #region FORM
const validator = new Validator();

// onChange
formStrInput.forEach(
	(input) => input.addEventListener("input", validator.assignChecker(input.id, reserve))
);

// validate
formReserve.addEventListener("submit", validate);
function validate(event) {
	let success = true;
	let reserve = event.target;
	
	event.preventDefault();

	success = validator.checkName(reserve, "first") && success;
	success = validator.checkName(reserve, "last") && success;
	success = validator.checkMail(reserve, "email") && success;
	success = validator.checkDate(reserve, "birthdate") && success;
	success = validator.checkNumber(reserve, "quantity") && success;

	if (success) {
		document
			.querySelector(".modal-body.modal-body-hidden")
			.classList.remove("modal-body-hidden");
		reserve.classList.add("modal-body-hidden");
	}
	return success;
}
// #endregion
