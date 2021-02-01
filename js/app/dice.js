const dices = document.getElementsByClassName('dice-wrapper__img-wrapper');
const dice_wrap = document.getElementsByClassName('dice-wrapper')[0];
const effect = document.getElementsByClassName('dice-wrapper__effect')[0];
let pre = 0; //一つ前の出た目を記憶
const interval = 100; //転がるインターバル

//ページロード時に実行されるイベントハンドラーを登録
document.addEventListener(
	'DOMContentLoaded',
	function () {
		dice_wrap.addEventListener(
			'click',
			function () {
				// エフェクト画像を非表示
				effect.classList.add('disp--none');

				//転がる回数(10~15の範囲)
				const times = Math.floor(Math.random() * 6 + 10);
				// console.log(times);

				//転がった回数をカウント
				let time = 0;
				//intervalミリ秒ごとに転がる
				const roll = window.setInterval(function () {
					//6+1(0~6未満+1 → Math.floorで小数切り捨て)
					//1~6の範囲
					const result = Math.floor(Math.random() * 6 + 1);
					// console.log(result);

					//一つ前の面を非表示に戻して
					dices[pre].classList.toggle('disp--none');
					//結果の面を表示させて
					dices[result - 1].classList.toggle('disp--none');
					//結果の面を変数preに保存しておく
					pre = result - 1;
					//これをtimes回繰り返す
					time++;
					if (time === times) {
						// エフェクト画像を表示
						effect.classList.remove('disp--none');
						//times回繰り返したらsetIntervalを破棄
						window.clearInterval(roll);
					}
				}, interval);
			},
			false
		);
	},
	false
);
