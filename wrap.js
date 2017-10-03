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

class Build {
	constructor() {
		this.radioTemplate = $.clone($(".radio-group").children()[0]);
		this.setting = "inch";
		this.rollSizes = {
			inch: [18, 24, 30]
		}
	}

	start() {
		this.clear();
		this.rebuild();
	}

	clear() {
		$(".radio-group").empty();
	}

	rebuild() {
		$.each(this.rollSizes[this.setting], rollSize => {
			const $newRadio = $(this.radioTemplate);

			$newRadio.children().val(rollSize);
			$newRadio.prepend(`${rollSize} in.`);

			$(".radio-group").append($newRadio);
		});
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
	const build = new Build();
	build.start();
	$("input").on("input change", calculateTotal);
	$("button").on("click", clickButton);
});
