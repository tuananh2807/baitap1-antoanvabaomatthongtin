#include <iostream>
#include <string>
using namespace std;

// Hàm tìm nghịch đảo modular
int modInverse(int a, int m) {
    a = a % m;
    for (int x = 1; x < m; x++)
        if ((a * x) % m == 1)
            return x;
    return -1;
}

// Hàm mã hóa Affine
string affineEncrypt(const string& text, int a, int b) {
    string result = "";
    for (char c : text) {
        if (isupper(c))
            result += char((a * (c - 'A') + b) % 26 + 'A');
        else if (islower(c))
            result += char((a * (c - 'a') + b) % 26 + 'a');
        else
            result += c;
    }
    return result;
}

// Hàm giải mã Affine
string affineDecrypt(const string& text, int a, int b) {
    string result = "";
    int a_inv = modInverse(a, 26);
    for (char c : text) {
        if (isupper(c))
            result += char((a_inv * ((c - 'A' - b + 26)) % 26) + 'A');
        else if (islower(c))
            result += char((a_inv * ((c - 'a' - b + 26)) % 26) + 'a');
        else
            result += c;
    }
    return result;
}

int main() {
    string text;
    int a, b;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap a (nguyen to cung nhau voi 26): ";
    cin >> a;
    cout << "Nhap b: ";
    cin >> b;
    string encrypted = affineEncrypt(text, a, b);
    cout << "Chuoi da ma hoa: " << encrypted << endl;
    string decrypted = affineDecrypt(encrypted, a, b);
    cout << "Chuoi da giai ma: " << decrypted << endl;
    return 0;
}
