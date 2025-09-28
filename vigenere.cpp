#include <iostream>
#include <string>
using namespace std;

// Hàm mở rộng key cho đủ độ dài text
string generateKey(const string& text, const string& key) {
    string newKey = key;
    while (newKey.length() < text.length())
        newKey += key;
    return newKey.substr(0, text.length());
}

// Hàm mã hóa Vigenère
string vigenereEncrypt(const string& text, const string& key) {
    string result = "";
    string fullKey = generateKey(text, key);
    for (size_t i = 0; i < text.length(); ++i) {
        char c = text[i];
        if (isupper(c))
            result += char((c - 'A' + toupper(fullKey[i]) - 'A') % 26 + 'A');
        else if (islower(c))
            result += char((c - 'a' + tolower(fullKey[i]) - 'a') % 26 + 'a');
        else
            result += c;
    }
    return result;
}

// Hàm giải mã Vigenère
string vigenereDecrypt(const string& text, const string& key) {
    string result = "";
    string fullKey = generateKey(text, key);
    for (size_t i = 0; i < text.length(); ++i) {
        char c = text[i];
        if (isupper(c))
            result += char((c - 'A' - (toupper(fullKey[i]) - 'A') + 26) % 26 + 'A');
        else if (islower(c))
            result += char((c - 'a' - (tolower(fullKey[i]) - 'a') + 26) % 26 + 'a');
        else
            result += c;
    }
    return result;
}

int main() {
    string text, key;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap khoa: ";
    getline(cin, key);
    string encrypted = vigenereEncrypt(text, key);
    cout << "Chuoi da ma hoa: " << encrypted << endl;
    string decrypted = vigenereDecrypt(encrypted, key);
    cout << "Chuoi da giai ma: " << decrypted << endl;
    return 0;
}
