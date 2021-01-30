// const info = document.getElementById("info");
// const btn_open = document.getElementsByClassName("btn--open")[0];
// const btn_close = document.getElementsByClassName("btn--close")[0];
const btn_disp_grid = document.getElementsByClassName('btn--disp--grid')[0];
const btn_disp_list = document.getElementsByClassName('btn--disp--list')[0];
const btn_sort = document.getElementsByClassName('btn--sort')[0];
const btn_sort_selected = document.getElementsByClassName(
	'btn--sort--selected'
)[0];
const content_list = document.getElementsByClassName('content-list')[0];
const content_list_li = content_list.childNodes;
//並び替え時にクリックをキャンセルするための関数
const prevDef = function (e) {
	e.preventDefault();
};

//並び替え可能な状態かどうか
let isDrag = false;

//現在の画面表示
let disp = true; //true:グリッド, false:リスト

//a要素とimg要素のdraggableをfalseにする
function cannotDrag() {
	//a要素とimg要素を取得
	const link = document.getElementsByTagName('a');
	const img = document.getElementsByTagName('img');
	//それぞれの要素にdraggable属性を付与
	for (let i = 0, len1 = link.length; i < len1; i++) {
		link[i].setAttribute('draggable', 'false');
	}
	for (let j = 0, len2 = img.length; j < len2; j++) {
		img[j].setAttribute('draggable', 'false');
	}
}

//グリッド表示とリスト表示を切り替える
// li要素配下それぞれに対応する、専用クラスの付与を切替え
function dispChange() {
	content_list.classList.toggle('content-list--list');
	for (let i = 0, len = content_list_li.length; i < len; i++) {
		//ul要素の子要素であるli要素
		const li = content_list_li.item(i);
		// 子ノードが要素ノードなら
		if (li.nodeType === 1) {
			li.classList.toggle('content-list__tmb--list');
			//このli要素がダミーだったら表示を切り替え(リスト表示ではダミーは非表示)
			if (li.classList.contains('content-list__dummy')) {
				li.classList.toggle('disp--none');
				continue;
			}
			//li要素の子要素であるa要素
			const a = li.childNodes;
			for (let j = 0, len2 = a.length; j < len2; j++) {
				const a_item = a.item(j);
				if (a_item.nodeType === 1) {
					a_item.classList.toggle('content-list__a--list');
				}
				//a要素の子要素であるimg要素
				const img = a_item.childNodes;
				for (let k = 0, len3 = img.length; k < len3; k++) {
					const img_item = img.item(k);
					if (img_item.nodeType === 1) {
						img_item.classList.toggle('content-list__img--list');
						//img要素と兄弟要素であるp要素
						const p = img_item.nextElementSibling;
						if (p !== null && p.nodeType === 1) {
							p.classList.toggle('content-list__p--list');
							p.classList.toggle('disp--none');
						}
					}
				}
			}
		}
	}
	//ボタンの表示の切替
	btn_disp_grid.classList.toggle('disp--none');
	btn_disp_list.classList.toggle('disp--none');

	if (disp) {
		disp = false;
	} else {
		disp = true;
	}
}

//アイコンの並び替えをする
function listDrag() {
	//並び替えを可能にする
	if (!isDrag) {
		isDrag = true;
		for (let i = 0, len = content_list_li.length; i < len; i++) {
			//ul要素の子要素であるli要素
			const li = content_list_li.item(i);
			// console.log(li);
			if (li.nodeType === 1) {
				//ダミーのli要素は並び替えに影響しないようにする
				if (li.classList.contains('content-list__drag')) {
					//li要素のdraggableをtrueにする
					li.setAttribute('draggable', 'true');

					//クリックをキャンセルする
					li.addEventListener('click', prevDef, false);

					//ドラッグを始めた時
					li.addEventListener(
						'dragstart',
						function (e) {
							if (!li.classList.contains('content-list__dummy')) {
								//ドラッグ(のちにドロップ)する要素をdataTransferオブジェクトに保存
								e.dataTransfer.setData('text/plain', li.id);
							}
						},
						false
					);

					//ドロップ可能な場所に移動させた時にドロップ位置を知らせる
					li.addEventListener(
						'dragover',
						function (e) {
							e.preventDefault();
							if (disp) {
								//現在がグリッド表示ならボーダーを左につける
								li.classList.add('dragover--grid');
							} else {
								//リスト表示ならボーダーを上につける
								li.classList.add('dragover--list');
							}
							// li.style.borderTop = "2rem solid rgba(0,255,255,0.5)";
						},
						false
					);

					//ドロップ不可能な場所に移動させた時に上記の位置案内を消す
					li.addEventListener(
						'dragleave',
						function (e) {
							//ボーダーを消す
							if (disp) {
								li.classList.remove('dragover--grid');
							} else {
								li.classList.remove('dragover--list');
							}
							// li.style.borderTop = "";
						},
						false
					);

					//ドロップ可能な場所にドロップした時→並び替える
					li.addEventListener(
						'drop',
						function (e) {
							e.preventDefault();

							//'dragstart'で保存した対象要素を取得
							const id = e.dataTransfer.getData('text/plain');
							const target = document.getElementById(id);

							//ここでのthis(li)はドロップ先
							//ドロップ先のthisの前にtargetを挿入
							this.parentNode.insertBefore(target, this);
							//ボーダーを消す
							if (disp) {
								li.classList.remove('dragover--grid');
							} else {
								li.classList.remove('dragover--list');
							}
							// this.style.borderTop = "";
						},
						false
					);
				}
			}
		}
	} else {
		//並び替えを不可能にする
		isDrag = false;
		for (let i = 0, len = content_list_li.length; i < len; i++) {
			//ul要素の子要素であるli要素
			const li = content_list_li.item(i);
			// console.log(li);
			if (li.nodeType === 1) {
				if (li.classList.contains('content-list__drag')) {
					//li要素のdraggableをfalseにする
					li.setAttribute('draggable', 'false');
					//クリックをキャンセルするイベントリスナーを破棄
					li.removeEventListener('click', prevDef, false);
				}
			}
		}
	}
	//ボタンの表示の切替え
	btn_sort.classList.toggle('disp--none');
	btn_sort_selected.classList.toggle('disp--none');
}

//ページロード時に実行されるイベントハンドラーを登録
document.addEventListener(
	'DOMContentLoaded',
	function () {
		//a要素とimg要素のdraggableをfalseにする
		cannotDrag();

		//iOSとAndroidだった場合並び替えは非対応なのでボタンを非表示
		const ua = window.navigator.userAgent.toLowerCase();
		if (
			ua.indexOf('iphone') !== -1 ||
			ua.indexOf('ipad') !== -1 ||
			ua.indexOf('android') !== -1
		) {
			btn_sort.classList.add('disp--none');
		}

		//リストを並び替えできるかどうかを切替え
		btn_sort.addEventListener('click', listDrag, false);
		btn_sort_selected.addEventListener('click', listDrag, false);

		//インフォ画面表示
		// btn_open.addEventListener(
		// 	'click',
		// 	function () {
		// 		info.classList.add('info--in');
		// 		this.classList.toggle('disp--none');
		// 		btn_close.classList.toggle('disp--none');
		// 		btn_disp_grid.classList.add('fade--out');
		// 		btn_disp_list.classList.add('fade--out');
		// 		btn_sort.classList.add('fade--out');

		// 		setTimeout(() => {
		// 			info.style.width = '30%';

		// 			btn_disp_grid.style.opacity = '0';
		// 			btn_disp_list.style.opacity = '0';
		// 			btn_sort.style.opacity = '0';
		// 			btn_disp_grid.classList.toggle('disp--none');
		// 			btn_disp_list.classList.toggle('disp--none');
		// 			btn_sort.classList.toggle('disp--none');
		// 		}, 1000);
		// 	},
		// 	false
		// );

		//インフォ画面非表示
		// btn_close.addEventListener(
		// 	'click',
		// 	function () {
		// 		info.classList.add('info--out');
		// 		info.classList.remove('info--in');
		// 		this.classList.toggle('disp--none');
		// 		btn_open.classList.toggle('disp--none');

		// 		btn_disp_grid.classList.add('fade--in');
		// 		btn_disp_grid.classList.remove('fade--out');
		// 		btn_disp_grid.classList.toggle('disp--none');

		// 		btn_disp_list.classList.add('fade--in');
		// 		btn_disp_list.classList.remove('fade--out');
		// 		btn_disp_list.classList.toggle('disp--none');

		// 		btn_sort.classList.add('fade--in');
		// 		btn_sort.classList.remove('fade--out');
		// 		btn_sort.classList.toggle('disp--none');
		// 		setTimeout(() => {
		// 			info.style.width = '0%';
		// 			info.classList.remove('info--out');

		// 			btn_disp_grid.style.opacity = '1';
		// 			btn_disp_list.style.opacity = '1';
		// 			btn_sort.style.opacity = '1';
		// 		}, 1000);
		// 	},
		// 	false
		// );

		//グリッド,リスト表示切り替え
		btn_disp_list.addEventListener(
			'click',
			function () {
				dispChange();
				// disp = false;
			},
			false
		);
		btn_disp_grid.addEventListener(
			'click',
			function () {
				dispChange();
				// disp = true;
			},
			false
		);
	},
	false
);
