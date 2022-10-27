class Validator {
	// #region Errors: css handlers
	#assignError(form, key) {
		form[key].classList.add("error");
		document.querySelector(`#${key}+.error-msg`).classList.add("visible");
	}

	#removeError(form, key) {
		form[key].classList.remove("error");
		document.querySelector(`#${key}+.error-msg`).classList.remove("visible");
	}
	// #endregion

	// #region Validators
	#validateName(input) {
		return input.length >= 2;
	}

	#validateMail(input) {
		var mailFmt = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return mailFmt.test(input);
	}

	#validateDate(input) {
		return Date.parse(input);
	}

	#validateNumber(input) {
		return /^\d+$/.test(input);
	}
	// #endregion

	// #region Checkers
	checkName(form, key) {
		if (!this.#validateName(form[key].value)) {
			this.#assignError(form, key);
			return false;
		}
		this.#removeError(form, key);
		return true;
	}
	
	checkMail(form, key) {
		if (!this.#validateMail(form[key].value)) {
			this.#assignError(form, key);
			return false;
		}
		this.#removeError(form, key);
		return true;
	}

	checkDate(form, key) {
		if (!this.#validateDate(form[key].value)) {
			this.#assignError(form, key);
			return false;
		}
		this.#removeError(form, key);
		return true;
	}

	checkNumber(form, key) {
		if (!this.#validateNumber(form[key].value)) {
			this.#assignError(form, key);
			return false;
		}
		this.#removeError(form, key);
		return true;
	}
	// #endregion

	// Assign a checker according to the key passed 
	assignChecker(key, form) {
		console.log(form[key]);
		if (key === "first" || key === "last") {
			return () => this.checkName(form, key);
		}
		if (key === "email") {
			return () => this.checkMail(form, key);
		}
		if (key === "birthdate") {
			return () => this.checkDate(form, key);
		}
		if (key === "quantity") {
			return () => this.checkNumber(form, key);
		}
	}
}

export default Validator;