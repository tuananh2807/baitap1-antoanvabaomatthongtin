#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Hàm mã hóa Hoán vị
string permutationEncrypt(const string& text, const vector<int>& key) {
    string result = text;
    int n = key.size();
    for (size_t i = 0; i < text.length(); i += n) {
        for (int j = 0; j < n && i + j < text.length(); ++j) {
            result[i + key[j]] = text[i + j];
        }
    }
    return result;
}

// Hàm giải mã Hoán vị
string permutationDecrypt(const string& text, const vector<int>& key) {
    string result = text;
    int n = key.size();
    for (size_t i = 0; i < text.length(); i += n) {
        for (int j = 0; j < n && i + j < text.length(); ++j) {
            result[i + j] = text[i + key[j]];
        }
    }
    return result;
}

int main() {
    string text;
    int n;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap do dai khoa hoan vi: ";
    cin >> n;
    vector<int> key(n);
    cout << "Nhap khoa hoan vi (vi du: 2 0 1 cho khoa 3): ";
    for (int i = 0; i < n; ++i) cin >> key[i];
    string encrypted = permutationEncrypt(text, key);
    cout << "Chuoi da ma hoa: " << encrypted << endl;
    string decrypted = permutationDecrypt(encrypted, key);
    cout << "Chuoi da giai ma: " << decrypted << endl;
    return 0;
}
