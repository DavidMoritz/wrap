class Wrap {
	constructor() {
		this.height = Number($("[name=height]").val());
		this.length = Number($("[name=length]").val());
		this.depth = Number($("[name=depth]").val());
		this.roll = Number($("[name=roll-length]:checked").val());
	}
	get longest() {
		return Math.max(this.height, this.length, this.depth);
	}
	get shortest() {
		return Math.min(this.height, this.length, this.depth);
	}
	get cape() {
		return this.longest + this.shortest;
	}
	get amount() {
		const tempX = Math.max(this.cape, this.waist) + 1;
		const tempN = Math.min(this.cape, this.waist) + 1;

		if(tempX <= this.roll) {
			return tempN;
		} else if (tempN <= this.roll) {
			return tempX;
		} else {
			return "too large for this roll";
		}
	}
	get waist() {
		return 2 * (this.height + this.length + this.depth - this.longest) + 1;
	}
}

function calculateTotal() {
	const wrap = new Wrap();
	const foot = wrap.amount > 23 ? "feet" : "foot";
	const inch = wrap.amount % 12 === 1 ? "inch" : "inches";
	let result = `${wrap.amount} inches`;

	if(wrap.amount > 12) {
		result += ` <span class="feet">(${parseInt(wrap.amount/12)} ${foot} - ${wrap.amount%12} ${inch})</span>`;
	}

	$("#demo").html(result);
}

function clickButton(e) {
	const $target = $(e.target);
	const $input = $target.closest(".input-group").find("input");
	let val = Number($input.val());

	if($target.hasClass("plus")) {
		val += $target.hasClass("double") ? 5 : 1;
	} else {
		val -= $target.hasClass("double") ? 5 : 1;
	}

	$input.val(Math.max(0, val));
	calculateTotal();
}

$(() => {
	$("input").on("input change", calculateTotal);
	$("button").on("click", clickButton);
});
