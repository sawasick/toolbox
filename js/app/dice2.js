/* dice.jsをjQueryを用いた記述に書き換え */
const $dices = document.getElementsByClassName('dice-wrapper__img-wrapper');
const $dice_wrap = document.getElementsByClassName('dice-wrapper')[0];
const $effect = document.getElementsByClassName('dice-wrapper__effect')[0];
let $pre = 0; //一つ前の出た目を記憶
const $interval = 100; //転がるインターバル

$(document).on('DOMContentLoaded', function () {
	$($dice_wrap).on('click', () => {
		// エフェクト画像を非表示
		$($effect).addClass('disp--none');

		//転がる回数(10~15の範囲)
		const times = Math.floor(Math.random() * 6 + 10);

		//転がった回数をカウント
		let time = 0;

		//intervalミリ秒ごとに転がる
		const roll = window.setInterval(() => {
			//6+1(0~6未満+1 → Math.floorで小数切り捨て)
			//1~6の範囲
			const result = Math.floor(Math.random() * 6 + 1);
			//一つ前の面を非表示に戻して
			$($dices[$pre]).toggleClass('disp--none');
			//結果の面を表示させて
			$($dices[result - 1]).toggleClass('disp--none');
			//結果の面を変数preに保存しておく
			$pre = result - 1;
			//これをtimes回繰り返す
			time++;
			if (time === times) {
				// エフェクト画像を表示
				$($effect).removeClass('disp--none');
				//times回繰り返したらsetIntervalを破棄
				window.clearInterval(roll);
			}
			// console.log('ok2');
		}, $interval);
	});
});
