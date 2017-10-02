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

	$("#demo").html(wrap.amount);
}

$(() => {
	$("input").on("input change", calculateTotal);
});
