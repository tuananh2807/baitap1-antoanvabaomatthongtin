#include <iostream>
#include <string>
using namespace std;

string caesarEncrypt(const string& text, int shift) {
    string result = "";
    for (char c : text) {
        if (isupper(c)) {
            result += char(int('A') + (int(c) - int('A') + shift) % 26);
        } else if (islower(c)) {
            result += char(int('a') + (int(c) - int('a') + shift) % 26);
        } else {
            result += c;
        }
    }
    return result;
}

int main() {
    string text;
    int shift;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap so dich chuyen: ";
    cin >> shift;
    string encrypted = caesarEncrypt(text, shift);
    cout << "Chuoi da ma hoa: " << encrypted << endl;
    string decrypted = caesarEncrypt(encrypted, 26 - (shift % 26));
    cout << "Chuoi da giai ma: " << decrypted << endl;
    return 0;
}
    } else if (choice == 2) {
        cout << "Chuoi da giai ma: " << caesarEncrypt(text, 26 - (shift % 26)) << endl;
    } else {
        cout << "Lua chon khong hop le.\n";
    }
    return 0;
}
