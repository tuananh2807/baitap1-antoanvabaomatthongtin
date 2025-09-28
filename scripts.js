// Helpers
function isUpper(c){ return c >= 'A' && c <= 'Z'; }
function isLower(c){ return c >= 'a' && c <= 'z'; }
function mod(n, m){ return ((n % m) + m) % m; }

// Caesar
function caesarEncrypt(text, shift){
	let res = '';
	shift = mod(shift,26);
	for (let c of text){
		if (isUpper(c)) res += String.fromCharCode('A'.charCodeAt(0) + mod(c.charCodeAt(0)-'A'.charCodeAt(0)+shift,26));
		else if (isLower(c)) res += String.fromCharCode('a'.charCodeAt(0) + mod(c.charCodeAt(0)-'a'.charCodeAt(0)+shift,26));
		else res += c;
	}
	return res;
}

// Vigenère
function generateKey(text, key){
	let newKey = key;
	while (newKey.length < text.length) newKey += key;
	return newKey.substr(0, text.length);
}
function vigenereEncrypt(text, key){
	let result = '';
	let fullKey = generateKey(text, key);
	for (let i=0;i<text.length;i++){
		let c = text[i];
		let k = fullKey[i] || 'A';
		if (isUpper(c)) result += String.fromCharCode((c.charCodeAt(0)-65 + k.toUpperCase().charCodeAt(0)-65)%26 + 65);
		else if (isLower(c)) result += String.fromCharCode((c.charCodeAt(0)-97 + k.toLowerCase().charCodeAt(0)-97)%26 + 97);
		else result += c;
	}
	return result;
}
function vigenereDecrypt(text, key){
	let result = '';
	let fullKey = generateKey(text, key);
	for (let i=0;i<text.length;i++){
		let c = text[i];
		let k = fullKey[i] || 'A';
		if (isUpper(c)) result += String.fromCharCode(mod(c.charCodeAt(0)-65 - (k.toUpperCase().charCodeAt(0)-65),26) + 65);
		else if (isLower(c)) result += String.fromCharCode(mod(c.charCodeAt(0)-97 - (k.toLowerCase().charCodeAt(0)-97),26) + 97);
		else result += c;
	}
	return result;
}

// Affine
function modInverse(a, m){
	a = mod(a,m);
	for (let x=1;x<m;x++) if ((a*x)%m === 1) return x;
	return -1;
}
function affineEncrypt(text,a,b){
	let res='';
	for (let c of text){
		if (isUpper(c)) res += String.fromCharCode(mod(a*(c.charCodeAt(0)-65)+b,26)+65);
		else if (isLower(c)) res += String.fromCharCode(mod(a*(c.charCodeAt(0)-97)+b,26)+97);
		else res += c;
	}
	return res;
}
function affineDecrypt(text,a,b){
	let res='';
	let a_inv = modInverse(a,26);
	if (a_inv === -1) return 'Lỗi: a không có nghịch đảo modulo 26';
	for (let c of text){
		if (isUpper(c)) res += String.fromCharCode(mod(a_inv*(c.charCodeAt(0)-65 - b),26)+65);
		else if (isLower(c)) res += String.fromCharCode(mod(a_inv*(c.charCodeAt(0)-97 - b),26)+97);
		else res += c;
	}
	return res;
}

// Playfair
function generateMatrix(key){
	let used = '';
	for (let ch of key.toUpperCase()){
		let c = ch === 'J' ? 'I' : ch;
		if (/[A-Z]/.test(c) && used.indexOf(c) === -1) used += c;
	}
	for (let i=0;i<26;i++){
		let c = String.fromCharCode(65+i);
		if (c === 'J') continue;
		if (used.indexOf(c) === -1) used += c;
	}
	let matrix = [];
	for (let r=0;r<5;r++) matrix.push(used.substr(r*5,5).split(''));
	return matrix;
}
function findPosition(matrix,c){
	if (c === 'J') c = 'I';
	for (let i=0;i<5;i++) for (let j=0;j<5;j++) if (matrix[i][j] === c) return [i,j];
	return [-1,-1];
}
function processTextPlayfair(text){
	let res='';
	for (let ch of text){
		if (/[A-Za-z]/.test(ch)) res += (ch.toUpperCase()==='J'?'I':ch.toUpperCase());
	}
	let s = res.split('');
	for (let i=0;i<s.length;i+=2){
		if (i+1 === s.length || s[i] === s[i+1]) { s.splice(i+1,0,'X'); }
	}
	if (s.length % 2 !== 0) s.push('X');
	return s.join('');
}
function playfairEncrypt(text,key){
	let matrix = generateMatrix(key);
	let pt = processTextPlayfair(text);
	let res = '';
	for (let i=0;i<pt.length;i+=2){
		let [r1,c1] = findPosition(matrix,pt[i]);
		let [r2,c2] = findPosition(matrix,pt[i+1]);
		if (r1 === r2){
			res += matrix[r1][(c1+1)%5];
			res += matrix[r2][(c2+1)%5];
		} else if (c1 === c2){
			res += matrix[(r1+1)%5][c1];
			res += matrix[(r2+1)%5][c2];
		} else {
			res += matrix[r1][c2];
			res += matrix[r2][c1];
		}
	}
	return res;
}
function playfairDecrypt(text,key){
	let matrix = generateMatrix(key);
	let res = '';
	for (let i=0;i<text.length;i+=2){
		let [r1,c1] = findPosition(matrix,text[i]);
		let [r2,c2] = findPosition(matrix,text[i+1]);
		if (r1 === r2){
			res += matrix[r1][(c1+4)%5];
			res += matrix[r2][(c2+4)%5];
		} else if (c1 === c2){
			res += matrix[(r1+4)%5][c1];
			res += matrix[(r2+4)%5][c2];
		} else {
			res += matrix[r1][c2];
			res += matrix[r2][c1];
		}
	}
	return res;
}

// Permutation (Hoán vị)
function permutationEncrypt(text, keyArr){
	let n = keyArr.length;
	let result = text.split('');
	for (let i=0;i<text.length;i+=n){
		for (let j=0;j<n && i+j<text.length;j++){
			let dest = i + keyArr[j];
			if (dest < text.length) result[dest] = text[i+j];
		}
	}
	return result.join('');
}
function permutationDecrypt(text, keyArr){
	let n = keyArr.length;
	let result = text.split('');
	for (let i=0;i<text.length;i+=n){
		for (let j=0;j<n && i+j<text.length;j++){
			let src = i + keyArr[j];
			if (src < text.length) result[i+j] = text[src];
		}
	}
	return result.join('');
}

// Add navigation behavior: show only the selected tool/section
function showSection(name) {
	const sections = document.querySelectorAll('#tools .card');
	sections.forEach(s => {
		if (s.id === name) s.classList.remove('hidden');
		else s.classList.add('hidden');
	});
	// update active nav button
	document.querySelectorAll('.tool-nav .nav-btn').forEach(btn => {
		btn.classList.toggle('active', btn.dataset.target === name);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	// Caesar
	document.getElementById('caesar-encrypt').onclick = () => {
		const t = document.getElementById('caesar-text').value;
		const s = parseInt(document.getElementById('caesar-shift').value) || 0;
		document.getElementById('caesar-result').textContent = caesarEncrypt(t,s);
	};
	document.getElementById('caesar-decrypt').onclick = () => {
		const t = document.getElementById('caesar-text').value;
		const s = parseInt(document.getElementById('caesar-shift').value) || 0;
		document.getElementById('caesar-result').textContent = caesarEncrypt(t,26 - mod(s,26));
	};

	// Vigenere
	document.getElementById('vigenere-encrypt').onclick = () => {
		const t = document.getElementById('vigenere-text').value;
		const k = document.getElementById('vigenere-key').value || 'A';
		document.getElementById('vigenere-result').textContent = vigenereEncrypt(t,k);
	};
	document.getElementById('vigenere-decrypt').onclick = () => {
		const t = document.getElementById('vigenere-text').value;
		const k = document.getElementById('vigenere-key').value || 'A';
		document.getElementById('vigenere-result').textContent = vigenereDecrypt(t,k);
	};

	// Affine
	document.getElementById('affine-encrypt').onclick = () => {
		const t = document.getElementById('affine-text').value;
		const a = parseInt(document.getElementById('affine-a').value) || 1;
		const b = parseInt(document.getElementById('affine-b').value) || 0;
		document.getElementById('affine-result').textContent = affineEncrypt(t,a,b);
	};
	document.getElementById('affine-decrypt').onclick = () => {
		const t = document.getElementById('affine-text').value;
		const a = parseInt(document.getElementById('affine-a').value) || 1;
		const b = parseInt(document.getElementById('affine-b').value) || 0;
		document.getElementById('affine-result').textContent = affineDecrypt(t,a,b);
	};

	// Playfair
	document.getElementById('playfair-encrypt').onclick = () => {
		const t = document.getElementById('playfair-text').value;
		const k = document.getElementById('playfair-key').value || '';
		document.getElementById('playfair-result').textContent = playfairEncrypt(t,k);
	};
	document.getElementById('playfair-decrypt').onclick = () => {
		const t = document.getElementById('playfair-text').value;
		const k = document.getElementById('playfair-key').value || '';
		document.getElementById('playfair-result').textContent = playfairDecrypt(t,k);
	};

	// Permutation
	document.getElementById('perm-encrypt').onclick = () => {
		const t = document.getElementById('perm-text').value;
		const key = document.getElementById('perm-key').value.trim().split(/\s+/).map(x=>parseInt(x,10));
		document.getElementById('perm-result').textContent = permutationEncrypt(t, key);
	};
	document.getElementById('perm-decrypt').onclick = () => {
		const t = document.getElementById('perm-text').value;
		const key = document.getElementById('perm-key').value.trim().split(/\s+/).map(x=>parseInt(x,10));
		document.getElementById('perm-result').textContent = permutationDecrypt(t, key);
	};

	// Nav wiring
	const navButtons = document.querySelectorAll('.tool-nav .nav-btn');
	navButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const target = btn.dataset.target;
			showSection(target);
		});
	});

	// Initially show the first tool (Caesar) and set active
	showSection('caesar');
});