const dices = document.getElementsByClassName('dice-wrapper__img-wrapper');
const dice_wrap = document.getElementsByClassName('dice-wrapper')[0];

//ページロード時に実行されるイベントハンドラーを登録
document.addEventListener(
	'DOMContentLoaded',
	function () {
		dice_wrap.addEventListener(
			'click',
			function () {
				//6+1(0~6未満+1 → Math.floorで小数切り捨て)
				const random = Math.floor(Math.random() * 6 + 1);
				// console.log(random);

				//全ての面を非表示にして
				for (let i = 0, len = dices.length; i < len; i++) {
					dices[i].classList.add('disp--none');
					if (i === random - 1) {
						//該当する面のみ表示する
						dices[i].classList.remove('disp--none');
					}
					// console.log(i + 'is' + dices[i]);
				}
			},
			false
		);
	},
	false
);
