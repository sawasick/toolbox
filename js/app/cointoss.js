const heads = document.getElementById('heads');
const tails = document.getElementById('tails');
const coins = document.getElementsByClassName('coin-wrapper')[0];
const interval = 50; //回るインターバル
let result; //結果

//ページロード時に実行されるイベントハンドラーを登録
document.addEventListener(
	'DOMContentLoaded',
	function () {
		coins.addEventListener(
			'click',
			function () {
				//回る回数(15~20の範囲)
				const times = Math.floor(Math.random() * 5 + 15);
				// console.log(times);

				//結果
				//1 < result < 10の範囲
				do {
					result = Math.floor(Math.random() * 9 + 1);
					// console.log(result);
				} while (result === 1);

				//コインが回る間は少し薄くする
				heads.classList.add('pale');
				tails.classList.add('pale');

				//回った回数をカウント
				let time = 0;
				//intervalミリ秒ごとに回る
				const roll = window.setInterval(function () {
					//コインの表裏を交互にtimes回表示させる
					heads.classList.toggle('disp--none');
					tails.classList.toggle('disp--none');
					time++;

					if (time === times) {
						//times回繰り返したらsetIntervalを破棄
						window.clearInterval(roll);
						//最後にresultの面を表示させる
						//1<result≦5 →表, 5<result<10 →裏
						if (result <= 5) {
							//表
							heads.classList.remove('disp--none');
							tails.classList.add('disp--none');
						} else {
							//裏
							heads.classList.add('disp--none');
							tails.classList.remove('disp--none');
						}
						//コインの透明度を戻す
						heads.classList.remove('pale');
						tails.classList.remove('pale');
					}
				}, interval);
			},
			false
		);
	},
	false
);
