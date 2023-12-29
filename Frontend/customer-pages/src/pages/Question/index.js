import classNames from 'classnames/bind';
import styles from './Question.module.scss';

const cx = classNames.bind(styles);

function Introduce() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 class={cx('content-title')}>
                    <span>Hỏi đáp</span>
                </h1>

                <div className={cx('description')}>
                    <h3>
                        <strong>1. Tôi muốn mua hàng từ xa online phải làm sao ?</strong>
                    </h3>
                    <p>
                        Bạn có thể tìm kiếm các sản phẩm bằng cách sử dụng các chức năng tìm kiếm tại website. Sau khi
                        đã nắm bắt được đầy đủ thông tin về sản phẩm cần mua như : tên máy, Cấu hình, phụ kiện kèm theo,
                        giá và khuyến mãi tại thời điểm mua, hoặc liên hệ qua số điện thoại để hitech.vn tư vấn cho bạn
                        mã máy phù hợp. Ví dụ bạn có thể thực hiện các cách sau để liên hệ khi có nhu cầu mua hàng
                        Online:
                    </p>
                    <h4>
                        <u>
                            <strong>Cách 1:</strong>
                        </u>
                        &nbsp;<strong>Đặt mua hàng từ xa qua số Hotline</strong>
                    </h4>
                    <p>
                        Gọi điện thoại đến số Hotline&nbsp;1900 1217 từ 8h30-20h00&nbsp;(cả CN &amp; ngày lễ) nhân viên
                        chúng tôi luôn sẵn sàng phục vụ bạn.
                    </p>
                    <h4>
                        <u>
                            <strong>Cách 2:</strong>
                        </u>
                        &nbsp;<strong>Đặt mua hàng từ xa qua Facebook</strong>
                    </h4>
                    <p>
                        Các bạn liên hệ với nick Facebook hỗ trợ của hitech.vn hoặc chat fanpage để nhận hướng dẫn mua
                        hàng từ xa Online (Hỗ trợ 24/24h)
                    </p>
                    <p>
                        Trang Fanpage của Laptop Hitech:&nbsp;
                        <a href="https://facebook.com/hitechvn" rel="noopener noreferrer" target="_blank">
                            https://facebook.com/hitechvn
                        </a>
                    </p>
                    <p>
                        Nick Hitech hỗ trợ:&nbsp;
                        <a href="https://facebook.com/hitechbk" rel="noopener noreferrer" target="_blank">
                            https://facebook.com/hitech
                        </a>
                    </p>
                    <h4>
                        <u>
                            <strong>Cách 3:</strong>
                        </u>
                        &nbsp;<strong>Đặt mua hàng từ xa qua Email</strong>
                    </h4>
                    <p>
                        Gửi mail order chi tiết vào email&nbsp;cskh.hitech.vn<u>@gmail.com</u>
                        <br />
                        Mẫu Mail Order:
                    </p>
                    <p>
                        Tên Khách Hàng:&nbsp;<strong>Nguyễn Văn A</strong>
                        <br />
                        SĐT: 0988XXXXX
                        <br />
                        Email: vana@gmail.com
                    </p>
                    <p>
                        Sản Phẩm Đặt Hàng:(ví dụ)&nbsp;
                        <a href="https://hitech.vn/thinkpad/thinkpad-t430-i5-nvidia-nvs-5400m-p1559.html">
                            ThinkPad T430 i5 Nvidia NVS 5400M
                        </a>
                        <br />
                        Địa chỉ nhận hàng: Số nhà 21, Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh
                        <br />
                        Yêu Cầu Thêm: Cài Win 10, Office 2010, các game, từ điển….
                    </p>
                    <p>
                        Tối đa 30 phút&nbsp;sau khi đặt hàng (trong giờ làm việc 8h30 – 22h) nhân viên bán hàng của
                        hitech.vn sẽ liên hệ với quý khách hàng để làm thủ tục giao hàng.
                    </p>
                    <h4>
                        <strong>
                            <u>Cách 4:</u>&nbsp;Đặt mua hàng từ xa Online trên website
                        </strong>
                    </h4>
                    <p>
                        Các bạn có thể đặt mua hàng online trực tiếp tại link chi tiết sản phẩm. Hệ thống sẽ phản hồi
                        ngay sau khoảng 30p kể từ thời điểm đặt hàng
                    </p>

                    <p>
                        <strong>Lưu ý:</strong>
                    </p>
                    <p>
                        – Sau khi đã nhận thông tin sản phẩm khách cần mua, nhân viên của chúng tôi sẽ chụp ảnh, quay
                        video các góc cạnh máy, nhãn dán, service tag…trên thân máy/ video call tới quý khách để quý
                        khách có cái nhìn trực tiếp về sản phẩm/ kết nối quý khách trực tiếp tới sản phẩm thông qua
                        teamviewer hoặc ultraview để quý khách có thể trực tiếp kiểm tra cấu hình, các thông số kỹ thuật
                        hay các phần mềm đã được yêu cầu. Nói chung, chúng tôi sẽ cố gắng để khách hàng có thể tiệm cận
                        nhất với sản phẩm, chỉ thiếu một bước duy nhất là có thể tận tay sờ nắn sản phẩm mà thôi.
                    </p>
                    <p>
                        – Công ty cam kết tất cả hàng hóa gửi đến quý khách đều là hàng chuẩn 100% (có đầy đủ phụ kiện,
                        giấy tờ, phiếu bảo hành).&nbsp;
                    </p>
                    <p>
                        – Chúng tôi chỉ chấp nhận những đơn đặt mua hàng khi cung cấp đủ thông tin chính xác về địa chỉ,
                        số điện thoại. Sau khi bạn đặt hàng, chúng tôi sẽ liên lạc lại để kiểm tra thông tin và thỏa
                        thuận thêm những vấn đề liên quan.
                    </p>
                    <p>
                        – Hiện hitech.vn phục vụ bán hàng từ xa Online đối với tất cả khách hàng trên khắp các tỉnh
                        thành cả nước.
                    </p>
                    <p>
                        – Khách hàng mua hàng từ xa sau khi xác nhận đặt hàng vui lòng&nbsp;
                        <strong>chuyển khoản đặt cọc tối thiểu&nbsp;500k (Năm trăm nghìn đồng chẵn)</strong>. Sau khi
                        chuyển khoản xong, vui lòng liên hệ với nhân viên kinh doanh phụ trách đơn hàng của bạn để xác
                        nhận đã chuyển khoản thành công. &nbsp;
                    </p>
                    <table border="1" cellpadding="1" cellspacing="1" width="685">
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Chủ Tài khoản</strong>
                                </td>
                                <td>
                                    <strong>Số Tài khoản</strong>
                                </td>
                                <td>
                                    <strong>Ngân hàng</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp; Phạm Phước Huy</td>
                                <td>
                                    &nbsp;&nbsp;<strong>00110044847</strong>
                                </td>
                                <td>&nbsp; Vietcombank </td>
                            </tr>
                            <tr>
                                <td>&nbsp; Trần Văn Thanh Tâm</td>
                                <td>
                                    &nbsp;&nbsp;<strong>124100006421</strong>
                                </td>
                                <td>&nbsp; BIDV </td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;Tăng Thiện Tâm</td>
                                <td>
                                    &nbsp;&nbsp;<strong>19011661728011</strong>
                                </td>
                                <td>&nbsp; TechcomBank </td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;Nguyễn Lê Gia Bảo</td>
                                <td>
                                    &nbsp;&nbsp;<strong>1502.205.221.550</strong>
                                </td>
                                <td>&nbsp; AgriBank</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>
                        <strong>2. Sao tôi có thể tin tưởng khi chuyển tiền rồi, tôi sẽ nhận được hàng?</strong>
                    </h3>
                    <p>
                        Khác với một số công ty chỉ bán hàng trôi nổi trên mạng không rõ địa chỉ.&nbsp;
                        <a href="https://hitech.vn/">hitech.vn</a>&nbsp;là một công ty có địa chỉ rõ ràng cụ thể được
                        đăng tải trên website. Chúng tôi cam kết sẽ nhanh chóng liên hệ và chuyển hàng cho các bạn trong
                        thời gian sớm nhất khi các bạn đã đặt cọc/thanh toán tiền cho đơn hàng mình đặt. Uy tín và đảm
                        bảo chất lượng hàng hoá cũng như lợi ích của khách hàng luôn là tiêu chí hàng đầu của Chúng tôi.
                    </p>
                    <p>
                        <strong>Cam kết:</strong>
                    </p>
                    <ul>
                        <li>&nbsp;Gửi đúng hàng, đúng theo yêu cầu chất lượng của khách.</li>
                        <li>
                            &nbsp;Khách hàng nhận hàng không đúng yêu cầu có thể gửi khiếu nại về tổng đài tới bộ phận
                            chăm sóc khách hàng. Chúng tôi cam kết giải quyết các sai phạm trong quy trình nếu có.
                        </li>
                    </ul>
                    <h3>
                        <strong>3. Bao lâu tôi nhận được hàng khi mua hàng từ xa Online?</strong>
                    </h3>
                    <p>
                        Hàng của quý khách sẽ được đóng gói qua 1 lớp chống shock, 1 lớp nilon chống nước, 1 hộp xốp bọc
                        bên ngoài tránh va đập đảm bảo an toàn tuyệt đối cho gói hàng, gửi thông qua hệ thống chuyển
                        hàng của Bưu Cục Viettel đến tận địa chỉ nhận hàng của quý khác.
                    </p>
                    <p>
                        Nhân viên bán hàng sẽ email, hoặc điện thoại, gửi sms thông báo chi tiết thông tin gửi hàng, kèm
                        mã vận đơn.&nbsp;
                    </p>
                    <p>
                        Khách hàng có thể kiểm tra được lộ trình hàng thông qua trang:&nbsp;
                        <a href="http://viettelpost.com.vn/?tabid=208">http://viettelpost.com.vn/?tabid=208</a>
                        <br />
                        Gõ mã vận đơn vào ô hành trình đường thư, quý khách có thể kiểm soát được hàng đã về đến đâu,
                        lúc nào giao hàng thành công.
                    </p>
                    <p>
                        Tùy thuộc vào địa chỉ nhận hàng của các bạn mà thời gian nhận hàng trong vòng 12h đến 48h trong
                        thời gian làm việc. Đối với các tỉnh vùng sâu vùng xa, vùng núi thời gian có thể lâu hơn. Tuy
                        nhiên trong một số trường hợp phát sinh ngoài ý muốn (địa chỉ giao hàng không chính xác, không
                        có người nhận, không liên hệ được với người nhận hàng,…) mà hàng hóa có thể không đúng thời
                        gian. Các bạn vui lòng liên hệ với công ty, Chúng tôi sẽ kiểm tra với công ty vận chuyển để xác
                        nhận thông tin &amp; giao hàng lại cho các bạn trong thời gian sớm nhất.
                    </p>
                    <h3>
                        <strong>4. Tôi mua hàng rồi có thể đổi lại hay không?</strong>
                    </h3>
                    <p>
                        Với những trường hợp mua hàng từ xa, máy bị lỗi, móp, méo do quá trình vận chuyển các bạn nên
                        chụp ảnh ngay trước khi kí nhận, liên hệ với Hotline, gửi ảnh xác nhận để được hỗ trợ đổi trả
                        máy tương đương, toàn bộ chi phí ship hitech.vn sẽ thanh toán
                    </p>
                    <p>
                        Với trường hợp mua hàng từ xa nhưng khi nhận hàng khách hàng không ưng ý (cá nhân, gia đình
                        không đồng ý….). Các bạn hãy liên hệ lại Số Hotline&nbsp;1900 1217&nbsp;để được hỗ trợ trả hàng,
                        Phụ phí và phí vận chuyển sẽ dựa trên cơ sở thỏa thuận giữa 2 bên.
                    </p>
                    <p>
                        Hàng được đổi phải đảm bảo chưa được sử dụng, không bị hư hỏng hoặc trầy xước, phụ kiện và tem
                        bảo hành của nhà sản xuất phải còn đủ nguyên đai, nguyên kiện. Chúng tôi không giải quyết các
                        trường hợp đổi hàng đã sử dụng qua hoặc các trường hợp trả lại hàng.
                    </p>

                    <h3>
                        <strong>5. Để yêu cầu chụp ảnh thật sản phẩm và tư vấn, liên hệ ai nhanh nhất?</strong>
                    </h3>
                    <p>
                        Để nhận được ảnh thật về sản phẩm nhanh nhất các bạn vui lòng liên hệ số Hotline&nbsp;1900 1217
                        (8h30 – 20h00), cung cấp địa chỉ Zalo, Facebook, Email… để&nbsp;
                        <a href="https://hitech.vn/">hitech.vn</a>&nbsp;có thể gửi chi tiết ảnh thật sản phẩm
                    </p>
                    <h3>
                        <strong>
                            6. Khi tôi không hài lòng về phong cách phục vụ, và chất lượng hàng của hitech.vn tôi cần
                            liên hệ giải quyết khiếu nại ntn?
                        </strong>
                    </h3>
                    <p>
                        Mời bạn gửi mail phản hồi vào email:&nbsp;cskh.hitech.vn@gmail.com&nbsp;hoặc gọi điện cho bộ
                        phận chăm sóc khách hàng:&nbsp;1900 1217&nbsp;để được hỗ trợ tư vấn nhanh nhất.
                    </p>
                    <h3>
                        <strong>
                            7. Tôi mua hàng từ xa nếu máy có lỗi, thì phải gửi bảo hành đến công ty như thế
                            nào?&nbsp;&nbsp;
                        </strong>
                    </h3>
                    <p>
                        Mời bạn vui lòng gọi điện cho bộ phận chăm sóc khách hàng&nbsp;1900 1217&nbsp;gặp nhân viên tư
                        vấn phòng kĩ thuật để được tư vấn hỗ trợ bảo hành.
                        <br />
                        Hệ thống Hitech.vn tiến hành giao nhận qua Viettel CPN. Các bạn có thể chuyển phát về địa chỉ:
                    </p>
                    <p>
                        &nbsp;<strong>Laptop Hitech</strong>
                        <br />– Địa chỉ: Khu phố 6, P. Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh,&nbsp; SĐT: 0909.889.889
                    </p>
                    <p>
                        &nbsp;<strong>Gói hàng vui lòng nhớ kèm theo giấy ghi rõ nội dung: Bảo hành lỗi a,b,c</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Introduce;
