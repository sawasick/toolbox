const info = document.getElementById('info');
const btn_open = document.getElementsByClassName('btn--open')[0];
const btn_close = document.getElementsByClassName('btn--close')[0];
const btn_disp_grid = document.getElementsByClassName('btn--disp--grid')[0];
const btn_disp_list = document.getElementsByClassName('btn--disp--list')[0];
const btn_sort = document.getElementsByClassName('btn--sort')[0];
const content_list = document.getElementsByClassName('content-list')[0];
const content_list_li = content_list.childNodes;
// const content_list_a = content_list_li.childNodes;
let disp = true; //true:grid, false:list

function dispChange() {
	content_list.classList.toggle('content-list--list');
	for (let i = 0, len = content_list_li.length; i < len; i++) {
		//ul要素の子要素であるli要素
		const li = content_list_li.item(i);
		// 子ノードが要素ノードなら
		if (li.nodeType === 1) {
			li.classList.toggle('content-list__tmb--list');
			//このli要素がダミーだったら表示を切り替え
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
	btn_disp_grid.classList.toggle('disp--none');
	btn_disp_list.classList.toggle('disp--none');
	console.log(disp);
}

document.addEventListener(
	'DOMContentLoaded',
	function () {
		//インフォ画面表示
		btn_open.addEventListener(
			'click',
			function () {
				info.classList.add('info--in');
				this.classList.toggle('disp--none');
				btn_close.classList.toggle('disp--none');
				btn_disp_grid.classList.add('fade--out');
				btn_disp_list.classList.add('fade--out');
				btn_sort.classList.add('fade--out');

				setTimeout(() => {
					info.style.width = '30%';

					btn_disp_grid.style.opacity = '0';
					btn_disp_list.style.opacity = '0';
					btn_sort.style.opacity = '0';
					btn_disp_grid.classList.toggle('disp--none');
					btn_disp_list.classList.toggle('disp--none');
					btn_sort.classList.toggle('disp--none');
				}, 1000);
			},
			false
		);

		//インフォ画面非表示
		btn_close.addEventListener(
			'click',
			function () {
				info.classList.add('info--out');
				info.classList.remove('info--in');
				this.classList.toggle('disp--none');
				btn_open.classList.toggle('disp--none');

				btn_disp_grid.classList.add('fade--in');
				btn_disp_grid.classList.remove('fade--out');

				btn_disp_list.classList.add('fade--in');
				btn_disp_list.classList.remove('fade--out');

				btn_sort.classList.add('fade--in');
				btn_sort.classList.remove('fade--out');
				btn_sort.classList.toggle('disp--none');
				setTimeout(() => {
					info.style.width = '0%';
					info.classList.remove('info--out');

					btn_disp_grid.style.opacity = '1';
					btn_disp_grid.classList.toggle('disp--none');
					btn_disp_list.style.opacity = '1';
					btn_disp_list.classList.toggle('disp--none');
					btn_sort.style.opacity = '1';
				}, 1000);
			},
			false
		);
		//グリッド,リスト表示切り替え
		btn_disp_list.addEventListener(
			'click',
			function () {
				dispChange();
				disp = false;
			},
			false
		);
		btn_disp_grid.addEventListener(
			'click',
			function () {
				dispChange();
				disp = true;
			},
			false
		);
	},
	false
);
