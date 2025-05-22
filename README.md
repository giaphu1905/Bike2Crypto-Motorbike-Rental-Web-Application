Bike2Crypto - Nền tảng thuê xe máy với thanh toán ETH  
Đây là website được xây dựng bằng Django, cho phép:  

-Tìm và thuê xe máy  
-Giao dịch được lưu trên blockchain  
-Thanh toán thông qua smart contract - tự động, minh bạch và an toàn cho người thuê.  
Mục tiêu: Tạo trải nghiệm thuê xe đơn giản, an toàn và hiện đại bằng cách kết hợp dịch vụ truyền thống với công nghệ blockchain.  
Đây là bước đầu trong việc ứng dụng blockchain vào các dịch vụ thực tế hàng ngày.  

Công nghệ sử dụng  
Frontend: HTML, CSS, JavaScript​  
Backend: Django (Python)​  
Cơ sở dữ liệu: SQLite​  
Thanh toán: Tích hợp Web3 cho giao dịch Ethereum (test-local Ganache)  

Chức năng tổng quát:  
![image](https://github.com/user-attachments/assets/7c45bbba-3023-4d66-bcef-19411d76e0ca)
1. Quản lý tài khoản  
-Đăng ký/đăng nhập tài khoản  
-Cập nhật thông tin cá nhân  
-Quản lý mật khẩu  
2. Quản lý xe (Admin)  
-Quản lý thông tin xe, khách hàng, địa điểm, phụ kiện  
-Tìm kiếm xe, hóa đơn, lịch sử thanh toán  
-CRUD các thông tin liên quan  
3. Thuê xe  
-Chọn địa điểm nhận/trả xe tại các tỉnh phía Nam  
-Đặt lịch và chọn xe có sẵn  
-Thêm phụ kiện và dịch vụ  
-Xem và xác nhận hóa đơn  
4. Thanh toán ETH  
-Kết nối ví MetaMask  
-Thanh toán trực tiếp bằng ETH  
-Quản lý hóa đơn và lịch sử giao dịch  
-Smart contract đảm bảo giao dịch an toàn  

Usecase:  
![image](https://github.com/user-attachments/assets/f7b0b98f-3385-4f6c-9101-09f0d3947187)

Biểu đồ tuần tự chức năng thanh toán hóa đơn:
![image](https://github.com/user-attachments/assets/474e193a-0f5a-460f-bbad-ed2e70483eb3)

Class diagram:
![image](https://github.com/user-attachments/assets/00e24a11-ec3f-4964-bb85-4c52eafe1c4c)

📘 **Setup Guide**: See [`HOW_TO_RUN.md`](./HOW_TO_RUN.md) for instructions on how to install and run the project.
