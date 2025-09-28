#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// Tạo ma trận Playfair
void generateMatrix(const string& key, char matrix[5][5]) {
    string used = "";
    for (char c : key) {
        c = toupper(c);
        if (c == 'J') c = 'I';
        if (used.find(c) == string::npos && isalpha(c))
            used += c;
    }
    for (char c = 'A'; c <= 'Z'; ++c) {
        if (c == 'J') continue;
        if (used.find(c) == string::npos)
            used += c;
    }
    int idx = 0;
    for (int i = 0; i < 5; ++i)
        for (int j = 0; j < 5; ++j)
            matrix[i][j] = used[idx++];
}

// Tìm vị trí ký tự trong ma trận
void findPosition(char matrix[5][5], char c, int& row, int& col) {
    if (c == 'J') c = 'I';
    for (int i = 0; i < 5; ++i)
        for (int j = 0; j < 5; ++j)
            if (matrix[i][j] == c) {
                row = i;
                col = j;
                return;
            }
}

// Xử lý cặp ký tự cho Playfair
string processText(const string& text) {
    string result = "";
    for (char c : text) {
        if (isalpha(c)) result += toupper(c == 'J' ? 'I' : c);
    }
    for (size_t i = 0; i < result.length(); i += 2) {
        if (i + 1 == result.length() || result[i] == result[i + 1])
            result.insert(i + 1, "X");
    }
    if (result.length() % 2 != 0) result += "X";
    return result;
}

// Hàm mã hóa Playfair
string playfairEncrypt(const string& text, char matrix[5][5]) {
    string result = "";
    string pt = processText(text);
    for (size_t i = 0; i < pt.length(); i += 2) {
        int r1, c1, r2, c2;
        findPosition(matrix, pt[i], r1, c1);
        findPosition(matrix, pt[i + 1], r2, c2);
        if (r1 == r2) {
            result += matrix[r1][(c1 + 1) % 5];
            result += matrix[r2][(c2 + 1) % 5];
        } else if (c1 == c2) {
            result += matrix[(r1 + 1) % 5][c1];
            result += matrix[(r2 + 1) % 5][c2];
        } else {
            result += matrix[r1][c2];
            result += matrix[r2][c1];
        }
    }
    return result;
}

// Hàm giải mã Playfair
string playfairDecrypt(const string& text, char matrix[5][5]) {
    string result = "";
    for (size_t i = 0; i < text.length(); i += 2) {
        int r1, c1, r2, c2;
        findPosition(matrix, text[i], r1, c1);
        findPosition(matrix, text[i + 1], r2, c2);
        if (r1 == r2) {
            result += matrix[r1][(c1 + 4) % 5];
            result += matrix[r2][(c2 + 4) % 5];
        } else if (c1 == c2) {
            result += matrix[(r1 + 4) % 5][c1];
            result += matrix[(r2 + 4) % 5][c2];
        } else {
            result += matrix[r1][c2];
            result += matrix[r2][c1];
        }
    }
    return result;
}

int main() {
    string text, key;
    char matrix[5][5];
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap khoa: ";
    getline(cin, key);
    generateMatrix(key, matrix);
    string encrypted = playfairEncrypt(text, matrix);
    cout << "Chuoi da ma hoa: " << encrypted << endl;
    string decrypted = playfairDecrypt(encrypted, matrix);
    cout << "Chuoi da giai ma: " << decrypted << endl;
    return 0;
}
