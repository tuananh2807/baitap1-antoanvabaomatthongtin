
# AN TOÀN VÀ BẢO MẬT THÔNG TIN B1
# baitap1
# TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN

Caesar

Affine

Hoán vị

Vigenère

Playfair

# VỚI MỖI PHƯƠNG PHÁP HÃY TÌM HIỂU  

Tên gọi

Thuật toán mã hóa

thuật toán giải mã

Không gian khóa

Cách phá mã (mà không cần khoá) 

Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript
# mật mã Caesar
-Nguyên lý: Mỗi chữ cái được chuyển thành một số rồi thay bằng một số khác theo hai tham số khóa, tạo thành ánh xạ cố định giữa chữ gốc và chữ mã.

-Mã hóa: Với mỗi chữ cái, áp dụng phép biến đổi tuyến tính (nhân + cộng) rồi lấy phần còn lại trong 26 chữ cái để ra chữ trong bản mã.

-Giải mã: Là làm ngược lại: đảo phép biến đổi để tìm về chữ ban đầu (cần biết một phép nghịch đảo của tham số a).

-Yêu cầu: Một trong hai tham số phải chọn sao cho phép nghịch đảo tồn tại; nếu không thì không thể giải.

-Không gian khóa: Có 312 cặp khóa khả dĩ — tức khá nhỏ.

-Cách phá: Dễ bị bẻ bằng thử hết khóa (brute-force) hoặc phân tích tần suất chữ cái, hoặc nếu biết vài chữ cái gốc thì có thể suy ngay ra khóa.
# HÌNH ẢNH KIỂM THỬ 

# MÃ HÓA

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c77df605-30f7-4054-9c9e-dcd00af4d872" />


# GIẢI MÃ 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dac18d27-8ca3-4dea-9575-1ab0edf0885b" />

# mật mã Affine
-Nguyên lý: Affine mã hoá biến mỗi chữ cái thành chữ khác bằng phép nhân và cộng với hai tham số khóa, còn giải mã thì làm ngược lại để thu về chữ gốc.

-Mã hóa: Mỗi chữ cái gốc được đưa về dạng số (A=0, B=1,…). Sau đó thực hiện phép nhân với tham số a, cộng thêm b, rồi quy về trong phạm vi 26 chữ cái. Kết quả được chuyển lại thành chữ → ta có bản mã.

-Giải mã: Để đảo ngược, cần tìm nghịch đảo của tham số a theo modulo 26. Dùng nghịch đảo này để “trừ đi b và chia lại cho a” theo đúng quy tắc modulo, từ đó khôi phục bản rõ ban đầu.

-Điều kiện: Tham số a phải nguyên tố cùng nhau với 26 (tức gcd(a,26)=1), nếu không thì không có nghịch đảo, không thể giải mã.

-Không gian khóa: Có 12 giá trị hợp lệ cho a và 26 giá trị cho b, tổng cộng 312 khóa. Đây là số lượng nhỏ, nên dễ bị dò hết.

-Cách phá mã: Vì là mã thay thế đơn nên có thể:

Thử toàn bộ 312 khóa (brute-force).

Phân tích tần suất chữ cái trong bản mã.

Nếu biết trước vài cặp chữ gốc–chữ mã thì có thể suy ra ngay cặp (a, b).
# HÌNH ẢNH KIỂM THỬ

# MÃ HÓA 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4496e04f-93fb-468c-8009-01d76758310d" />

# GIẢI MÃ 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/be76dd48-273f-433e-9938-1ef33764b0d8" />

# mật mã hoán vị 

-Nguyên lý: Thay vì đổi chữ cái thành chữ khác, mật mã hoán vị giữ nguyên các chữ cái nhưng thay đổi vị trí của chúng theo một quy luật nhất định do khóa quy định.

-Mã hóa: Chia bản rõ thành các khối (block) có độ dài bằng độ dài khóa. Trong mỗi khối, các ký tự được sắp xếp lại theo thứ tự mà khóa chỉ ra.

-Giải mã: Thực hiện sắp xếp ngược lại theo khóa để trả các ký tự về đúng vị trí ban đầu, thu lại bản rõ.

-Không gian khóa: Với độ dài khối là n, có 
𝑛
!
n! (n giai thừa) khóa khả dĩ. Ví dụ: n=3 → có 6 khóa; n=5 → có 120 khóa.

-Cách phá mã: Có thể dùng brute-force thử tất cả các hoán vị, hoặc dựa vào phân tích ngữ nghĩa và tần suất để đoán vị trí chữ trong từ/câu. Với n nhỏ thì rất dễ bị phá.

# HÌNH ẢNH KIỂM THỬ

# MÃ HÓA 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9fd12812-1767-4fa1-bd64-1c9a3f17e017" />

# GIẢI MÃ 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9843a34c-b3c7-4816-9329-69de16d9ecb9" />

# mật mã Vigenère

-Nguyên lý: Đây là dạng mã hóa thay thế đa bảng chữ cái. Mỗi chữ trong bản rõ được mã hóa bằng một bảng Caesar khác nhau, và bảng nào dùng thì phụ thuộc vào chữ cái khóa tương ứng.

-Mã hóa: Khóa (chuỗi chữ) được lặp lại cho đủ độ dài văn bản. Mỗi chữ cái bản rõ được dịch đi một số vị trí trong bảng chữ cái theo giá trị của chữ cái khóa.

-Giải mã: Dùng lại chuỗi khóa, nhưng thay vì dịch tiến thì dịch lùi số vị trí tương ứng, để khôi phục về chữ cái ban đầu.

-Không gian khóa: Nếu khóa có độ dài k, mỗi vị trí có 26 khả năng → có 
26
𝑘
26
k
 khóa khả dĩ (rất lớn nếu k dài).

-Cách phá mã:

Nếu khóa ngắn → có thể dùng phân tích tần suất và chỉ số trùng hợp (Index of Coincidence) để tìm độ dài khóa, rồi tách thành nhiều Caesar cipher và giải từng cái.

Với khóa dài gần bằng độ dài văn bản → khó phá hơn nhiều.

# HÌNH ẢNH KIỂM THỬ 

# MÃ HÓA 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/21b2b4b0-ea30-4467-a8ab-dcbed8a9ae4e" />

# GIẢI MÃ 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d2dc676a-6568-4ab1-a78e-e6ed7446b72f" />

# mật mã Playfair

-Nguyên lý: Playfair dùng bảng 5×5 chữ cái (gồm 25 chữ, gộp I và J lại). Khóa chính là cách sắp xếp chữ trong bảng này. Mã hóa xử lý theo cặp ký tự, chứ không mã hóa từng ký tự riêng lẻ.

Tạo bảng 5×5 từ khóa, bỏ trùng lặp, chèn các chữ cái còn thiếu.

Chuỗi bản rõ được chuẩn hóa: đổi J thành I, tách thành cặp. Nếu hai chữ trong cặp trùng nhau thì thêm chữ X vào giữa. Nếu cuối cùng lẻ, thêm X để đủ cặp.

-Mã hóa: Với mỗi cặp chữ:

Nếu cùng hàng → thay bằng 2 chữ bên phải (vòng lại đầu hàng nếu cần).

Nếu cùng cột → thay bằng 2 chữ bên dưới (vòng lại đầu cột nếu cần).

Nếu khác hàng, khác cột → thay mỗi chữ bằng chữ ở cùng hàng nhưng cột của chữ kia (tạo thành hình chữ nhật).

-Giải mã: Làm ngược lại: cùng hàng → lấy bên trái; cùng cột → lấy bên trên; khác hàng/cột → đổi theo hình chữ nhật như khi mã hóa.

-Không gian khóa: Có thể có tới 
25
!
25! cách sắp xếp bảng (rất lớn).

-Cách phá mã: Dùng phân tích tần suất trên cặp chữ (digram) thay vì từng chữ cái. Nếu có bản rõ–bản mã mẫu thì dễ khôi phục bảng.

# HÌNH ẢNH KIỂM THỬ 

# MÃ HÓA 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9816a7c3-005d-4178-9477-38d48737e44e" />

# GIẢI MÃ 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d05208f4-0181-4167-b4c4-ccc1a01aa87e" />

# Các thuật toán mã hoá cổ điển như Caesar, Affine, Hoán vị, Vigenère và Playfair đều giữ vai trò quan trọng trong lịch sử mật mã học. Chúng giúp hình thành nền tảng lý thuyết, rèn luyện tư duy logic và cung cấp kiến thức cơ bản để tiếp cận những kỹ thuật mã hóa hiện đại. Vì vậy, việc nghiên cứu các phương pháp này không chỉ mang ý nghĩa lịch sử mà còn có giá trị lớn trong giáo dục và nghiên cứu khoa học.

# điểm chung 

Đều dựa trên biến đổi ký tự (thay thế/hoán vị).

Là mã hoá đối xứng (dùng cùng khoá cho mã hoá và giải mã).

Đơn giản, dễ hiểu và dễ cài đặt.

Không còn an toàn trước tấn công hiện đại.

Có giá trị lịch sử và giáo dục.

# điểm khác 

Caesar: Dịch chuyển ký tự theo số bước cố định, khoá rất nhỏ.

Affine: Kết hợp nhân và cộng, khoá lớn hơn Caesar.

Hoán vị: Sắp xếp lại vị trí ký tự theo khoá, không thay đổi bản thân ký tự.

Vigenère: Dùng một chuỗi khoá lặp lại, tạo dịch chuyển khác nhau cho từng ký tự.

Playfair: Mã hoá theo cặp ký tự trong ma trận 5x5, phức tạp hơn và giảm tần suất lặp.

# Ý NGHĨA THỰC TIỄN 

giúp sinh viên và nhà nghiên cứu làm nền tảng cho việc học và nghiên cứu mật mã, rèn luyện tư duy về mã hoá – giải mã, và có giá trị lịch sử, giáo dục, dù không còn an toàn để ứng dụng thực tế ngày nay.













