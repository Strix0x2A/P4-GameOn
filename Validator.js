class Validator {
	// #region function assignation map
	#functionAssignation = {
		first: this.#validateName,
		last: this.#validateName,
		email: this.#validateMail,
		birthdate: this.#validateDate,
		quantity: this.#validateNumber,
		location: this.#validateRadio,
		checkbox1: this.#validateChecked,
	};
	// #endregion

	// #region Errors: css handlers on input and displaying error msg
	#assignError(form, key) {
		if (key === "checkbox1") {
			document.querySelector(`#terms-of-use+.error-msg`).classList.add("visible");
			return;
		}
		if (key === "location") {
			document.querySelector(`#location+.error-msg`).classList.add("visible");
			return;
		}
		form[key].classList.add("error");
		document.querySelector(`#${key}+.error-msg`).classList.add("visible");
	}
	
	#removeError(form, key) {
		if (key === "checkbox1") {
			document.querySelector(`#terms-of-use+.error-msg`).classList.remove("visible");
			return;
		}
		if (key === "location") {
			document.querySelector(`#location+.error-msg`).classList.remove("visible");
			return;
		}
		form[key].classList.remove("error");
		document.querySelector(`#${key}+.error-msg`).classList.remove("visible");
	}
	// #endregion

	// #region Validators
	#validateName(input) {
		return /^[a-zA-Z \-\u00C0-\u00FF]*$/.test(input.value)
			&& input.value.length >= 2;
	}

	#validateMail(input) {
		var mailFmt = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return mailFmt.test(input.value);
	}

	#validateDate(input) {
		return Date.parse(input.value);
	}

	#validateNumber(input) {
		return /^\d+$/.test(input.value);
	}

	#validateRadio(input) {
		console.log(input.value);
		return input.value;
	}

	#validateChecked(input) {
		return input.checked;
	}
	// #endregion

	// #region Checker
	check(form, key) {
		console.log(key, form[key]);
		if (!this.#functionAssignation[key](form[key])) {
			this.#assignError(form, key);
			return false;
		}
		this.#removeError(form, key);
		return true;
	}
	// #endregion

	// Returns a function for onChange feature
	assignChecker(key, form) {
		return () => this.check(form, key);
	}
}

export default Validator;