import Validator from "./Validator.js";

// #region DOM Elements
const topNav = document.querySelector("#myTopnav");
const navMenu = document.querySelector(".main-navbar");
const navBtn = document.querySelectorAll("a.nav-elem");
const closeNav = document.querySelector("a.icon");

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");

const finishBtn = document.querySelector(".form-validated-text+.btn-submit.button");
const formReserve = document.querySelector("form");
const formStrInput = document.querySelectorAll(".text-control");
const formRadioInput = document.querySelectorAll("[name='location']");
const formCheckInput = document.querySelector("#checkbox1");
// #endregion

// #region Nav
function editNav(nav) {
	if (nav.className === "topnav") {
		nav.classList.add("responsive");
	} else {
		nav.classList.remove("responsive");
	}
}

function setActive(btn) {
	navBtn.forEach((btn) => btn.classList.remove("active"));
	console.log("oups");
	if (btn && btn.classList && !btn.classList.contains("active")) {
		btn.classList.add("active");
	}
}

topNav.addEventListener("click", editNav(topNav));
navBtn.forEach((btn) => btn.addEventListener("click", setActive));

function toggleNav(nav) {

	if (!nav.classList.contains("hidden")) {
		nav.classList.add("hidden");
	} else {
		nav.classList.remove("hidden");
	}
}

closeNav.addEventListener("click", () => {
	toggleNav(navMenu);
	console.log(closeNav);
});
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

// onChange: removing error style and toggling error msg display
formStrInput.forEach(
	(input) => input.addEventListener("input", validator.assignChecker(input.name, reserve))
);
formRadioInput.forEach(
	(input) => addEventListener("input", validator.assignChecker(input.name, reserve))
);
formCheckInput.addEventListener("input", validator.assignChecker(formCheckInput.id, reserve));

// validate
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
		reserve.submit();
	}
	return success;
}

formReserve.addEventListener("submit", validate);
// #endregion
