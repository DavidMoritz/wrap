class Wrap {
	constructor() {
		const getNumber = (query, check) => Number(document.querySelector(`[name=${query}]${check ? ":checked" : ""}`).value);

		this.height = getNumber("height");
		this.length = getNumber("length");
		this.depth = getNumber("depth");
		this.roll = getNumber("roll-length", true);
		this.buffer = 1;
	}
	get longest() {
		return Math.max(this.height, this.length, this.depth);
	}
	get shortest() {
		return Math.min(this.height, this.length, this.depth);
	}
	get waist() {
		return 2 * (this.height + this.length + this.depth - this.longest);
	}
	get cape() {
		return this.longest + this.shortest;
	}
	get amount() {
		const capeLength = Math.max(this.cape, this.waist) + this.buffer;
		const waistLength = Math.min(this.cape, this.waist) + this.buffer;

		if(capeLength <= this.roll) {
			return waistLength;
		} else if (waistLength <= this.roll) {
			return capeLength;
		} else {
			return "too large for this roll";
		}
	}
}

function calculateTotal() {
	const wrap = new Wrap();
	const foot = wrap.amount > 23 ? "feet" : "foot";
	const inch = wrap.amount % 12 === 1 ? "inch" : "inches";
	let result = `<span class="unit">${wrap.amount}</span>`;

	if(wrap.amount > 12) {
		result += ` <span class="parse">(${parseInt(wrap.amount/12)} ${foot} - ${wrap.amount%12} ${inch})</span>`;
	}

	document.querySelector("#result").innerHTML = result;
}

function switchUnits() {
	if(document.body.className === "cm-unit") {
		document.body.className = "";
	} else {
		document.body.className = "cm-unit";
	}
}

function clickButton(e) {
	const attr = e.currentTarget.getAttribute("for");
	const targetClass = e.target.className;
	const input = document.querySelector(`[name=${attr}]`);
	let val = Number(input.value);

	if(targetClass.indexOf("plus") >= 0) {
		val += targetClass.indexOf("double") >= 0 ? 5 : 1;
	} else if(targetClass.indexOf("minus") >= 0) {
		val -= targetClass.indexOf("double") >= 0 ? 5 : 1;
	}

	input.value = Math.max(0, val);
	calculateTotal();
}

function on(event, selector, func) {
	document.querySelectorAll(selector).forEach(el => {
		el.addEventListener(event, func);
	});
}

on("input", "input", calculateTotal);
on("change", "input", calculateTotal);
on("click", ".input-group", clickButton);
on("click", ".title", switchUnits);
