import Validator from "./Validator.js";



// #region DOM Elements
const topNav = document.querySelector("#myTopnav");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");
const finishBtn = document.querySelector(`.form-validated-text+.btn-submit.button`);
const formReserve = document.querySelector("form");
const formStrInput = document.querySelectorAll(".text-control");
const formRadioInput = document.querySelector("[name='location']");
const formCheckInput = document.querySelector("#checkbox1");
// #endregion

// #region Nav
function editNav(nav) {
	if (nav.className === "topnav") {
		nav.classList.replace("responsive");
	} else {
		nav.classList.replace("topnav");
	}
}

topNav.addEventListener("click", editNav(topNav));
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
formRadioInput.addEventListener("input", validator.assignChecker(formRadioInput.name, reserve))
formCheckInput.addEventListener("input", validator.assignChecker(formCheckInput.id, reserve))

// validate
formReserve.addEventListener("submit", validate);
function validate(event) {
	let success = true;
	let reserve = event.target;
	
	event.preventDefault();

	success = validator.check(reserve, "first") && success;
	success = validator.check(reserve, "last") && success;
	success = validator.check(reserve, "email") && success;
	success = validator.check(reserve, "birthdate") && success;
	success = validator.check(reserve, "quantity") && success;
	success = validator.check(reserve, "location") && success;
	success = validator.check(reserve, "checkbox1") && success;

	if (success) {
		document
			.querySelector(".modal-body.modal-body-hidden")
			.classList.remove("modal-body-hidden");
		reserve.classList.add("modal-body-hidden");
	}
	return success;
}
// #endregion
