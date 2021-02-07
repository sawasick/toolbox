const canvas = document.getElementById('js-canvas');
const btn_add = document.getElementById('js-add');
const btn_remove = document.getElementById('js-remove');
const btn_generate = document.getElementById('js-generate');
let columns = 4; //縦線の本数 (デフォルトは3本)
const column_MAX = 40; //縦線の上限
const column_min = 3; //縦線の下限
let column_w; //縦線の幅
let column_h; //縦線の高さ
let column_iv; //間隔(interval)
const column_branch = [];
let rows; //横棒を格納する配列(generateRows()で代入)

//canvas要素の描画バッファーのサイズを設定
function setCanvasSize() {
	const win_w = window.innerWidth;
	const win_h = window.innerHeight;
	canvas.width = win_w * 0.8;
	canvas.height = win_h * 0.7;
}
//縦線を追加
function addColumn() {
	//増やせる縦線の上限より小さいか判断
	if (columns < column_MAX) {
		columns++;
		drawColumns();
	} else {
		console.log('これ以上増やせません');
	}
	// console.log('add');
}

//縦線を削除
function removeColumn() {
	//減らせる縦線の下限より大きいか判断
	if (column_min < columns) {
		columns--;
		drawColumns();
	} else {
		console.log('これ以上減らせません');
	}
	// console.log('remove');
}

//縦線を描画
function drawColumns() {
	if (canvas.getContext) {
		const context = canvas.getContext('2d');
		column_w = (canvas.width * 1) / 100; //縦線の幅
		column_h = (canvas.height * 90) / 100; //縦線の高さ
		column_iv = (canvas.width * (100 - columns)) / (columns + 1) / 100; //間隔(interval)

		//描画の前にキャンバスをクリアにする
		context.clearRect(0, 0, canvas.width, canvas.height);
		//線を描画
		for (let i = 0; i < columns; i++) {
			context.fillRect(
				column_iv * (i + 1) + column_w * (i + 1),
				25.4,
				column_w,
				column_h
			);
		}
	}
	// console.log('drawColumns');
}

//横線を生成
function generateRows() {
	const pos_Y_min = (canvas.height - column_h) / 2; //横線の範囲の一番上側
	const pos_Y_MAX = pos_Y_min + column_h; //横線の範囲の一番下側
	rows = [];

	for (let i = 0; i < columns - 1; i++) {
		//3~4本(ランダム)の横線をランダムな位置に生成
		//位置は縦棒の長さ以内(canvas要素の上から10%~90%の範囲内)
		const sum = Math.floor(Math.random() * 2 + 3); //生成する本数
		for (let j = 0; j < sum; j++) {
			const pos_Y = Math.floor(
				Math.random() * (pos_Y_MAX - pos_Y_min) + pos_Y_min
			);
			rows.push([pos_Y, i]);
		}
	}
	rows.sort(function (a, b) {
		//pos_Yでソート
		if (a < b) return a[a.length - 2] - b[b.length - 2];
		if (a > b) return a[a.length - 2] - b[b.length - 2];
		return 0;
	});

	for (let i = 0; i < columns; i++) {
		//縦線の数分、横棒を生成
		column_branch[i] = [];
	}
	for (let j = 0, len = rows.length; j < len; j++) {
		const link = rows[j][1];
		column_branch[link].push(rows[j]);
		column_branch[link + 1].push(rows[j]);
	}
	drawRows();
}

//横線を描画
function drawRows() {
	if (canvas.getContext) {
		const context2 = canvas.getContext('2d');
		drawColumns();
		//色を指定する
		// context2.fillStyle = 'rgb(00,00,255)'; //枠線の色は青
		//線を描画
		for (let i = 0, len = rows.length; i < len; i++) {
			context2.fillRect(
				column_iv * (rows[i][1] + 1) + column_w * (rows[i][1] + 1) + column_w,
				rows[i][0],
				column_iv,
				3
			);
		}
	}
}

//選択した位置の結果を辿る
function drawResult() {}

//ページロード時に実行されるイベントハンドラーを登録
document.addEventListener(
	'DOMContentLoaded',
	function () {
		setCanvasSize();
		drawColumns();
		btn_add.addEventListener('click', addColumn, false);
		btn_remove.addEventListener('click', removeColumn, false);
		btn_generate.addEventListener('click', generateRows, false);
	},
	false
);
