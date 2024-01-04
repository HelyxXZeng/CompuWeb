# CompuWeb
---
#Môi trường chạy:

 - Visual Studio Code(VS Code)
 - Microsoft SQL Server (Khuyến khích dùng bản Express)7
 - .NET SDK 7.0.0(https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
 - Node.JS(https://nodejs.org/en/download)
   
#Cách cài đặt:

 1. Tải về Node.JS và .Net SDK 7.0.0 và cài đặt nếu chưa cài những runtime evironment này. (64bit, bản mới nhất)
 2. Sau khi cài xong thì check lại bằng cách mở cmd ( ấn window + r gõ cmd ) và nhập 2 dòng lệnh sau theo thứ tự để kiểm tra xem đã cài đặt thành công chưa:
      - 2.1. ``npm --version`` để kiểm tra xem đã cài đặt Node.JS hay chưa
      - 2.2. ``dotnet --info`` , check dòng ``dotnet SDK installed`` và ``dotnet runtime installed`` để kiểm tra xem .Net SDK đã install thành công hay chưa.
      - 2.3. Nếu chưa thành công thì cài lại.
 3. Trong thư mục ``./CompuWeb/Backend/`` Dùng SQL Server để chạy file CompuWeb.sql, sau khi thành công thì chạy file FakeDatabase.sql để khởi tạo dữ liệu mẫu
 4. Mở thư mục CompuWeb bằng VS Code.
 5. Sau khi có dữ liệu, thực hiện lệnh sau tại terminal thứ nhất của VS Code: ``cd ./Backend/TestForASPWebAPI/TestForASPWebAPI`` và ``dotnet build`` và ``dotnet run``
 6. Tạo terminal thứ 2, tại đây dùng lệnh: ``cd ./Frontend/`` . Giờ thì ta có 3 UI dành cho 3 loại đối tượng khác nhau. Di chuyển vào từng thư mục để chạy bằng cách ``cd ./tên_thư_mục``
    - Đối với customer-page: dùng ``npm install`` sau đó ``npm start`` để chạy
    - Đối với admin-page và staff-page: dùng ``npm install`` sau đó ``mpm run dev`` để chạy
    - LƯU Ý: ĐỐI VỚI customer-page thì vào ``./customer-page/request.js`` để chỉnh lại link API cho hợp lý. Chỉnh ``baseURL: 'https://localhost:44333/api'`` thành ``baseURL: 'https://localhost:5232/api'`` thì mới lấy được dữ liệu

#Lỗi:
- nếu chương trình xảy ra lỗi, vui lòng ấn f12 và vào tab console, copy và gửi issue về cho Repo này
