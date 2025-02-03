export const supportLinksInfo = [
    {
        header: 'Collaborator',
        info: [
            { id: 'collaborator-program', title: 'chương trình cộng tác viên' },
            { id: 'policy-types', text: <><b>Kiểu chính sách</b> với 1 trong 2 kiểu chính sách có thể áp dụng là:</> },
            { id: 'general-commission-policy', text: <><b>Chính sách hoa hồng chung:</b> là chính sách áp dụng cho toàn bộ sản phẩm trên website ngoại trừ đi các sản phẩm có mức hoa hồng đặc biệt thiết lập tại mục “Chính sách hoa hồng theo sản phẩm”. Khi đối tác giới thiệu các đơn hàng chỉ chứa sản phẩm thông thường (không nằm trong danh sách sản phẩm có hoa hồng đặc biệt) thì sẽ được tính toán mức hoa hồng như chính sách chung. Để thiết lập chính sách hoa hồng chung, bạn cần chọn:</> },
            { id: 'commission-percentage', text: <>% hoa hồng theo giá trị đơn hàng</> },
            { id: 'fixed-commission', text: <>Số tiền cố định theo mỗi đơn hàng</> },
            { id: 'order-value-application', text: <>Và <b>Giá trị đơn hàng áp dụng</b> theo:</> },
            { id: 'total-order-value', text: <>Tổng giá trị đơn hàng không có phí vận chuyển: hoa hồng của đối tác được tính trên tổng giá trị đơn hàng trừ đi phí vận chuyển</> },
            { id: 'total-value-with-shipping', text: <>Tổng giá trị đơn hàng bao gồm phí vận chuyển: Hoa hồng của đối tác sẽ được tính trên tổng giá trị đơn hàng có bao gồm phí vận chuyển</> },
            { id: 'product-specific-policy', text: <><b>Chính sách hoa hồng theo sản phẩm</b> (Tùy chọn): là chính sách chỉ áp dụng cho 1 danh sách sản phẩm hay danh mục sản phẩm tùy chọn. Khi đơn hàng chỉ chứa các sản phẩm có mức hoa hồng đặc biệt thì sẽ áp dụng mức hoa hồng được thiết lập cho từng sản phẩm để tính ra mức hoa hồng cho đối tác. Để thiết lập chính sách hoa hồng theo sản phẩm bạn cần:</> },
            { id: 'select-product', text: <><b>Lựa chọn sản phẩm</b>, bạn có thể chọn đích danh 1 sản phẩm cụ thể hoặc chọn cả danh mục sản phẩm</> },
            { id: 'commission-type', text: <>Chọn loại <b>Hoa hồng áp dụng:</b> Theo phần trăm (%) hoặc Theo số tiền (đ)</> },
            { id: 'confirm-policy', text: <>Tiếp theo, bạn chọn <b>Xác nhận</b> để hoàn tất thiết lập chính sách hoa hồng cho sản phẩm</> },
            { id: 'commission-list', text: <>Sau khi<b> Xác nhận</b>, sản phẩm / danh mục sản phẩm thuộc chính sách hoa hồng theo sản phẩm sẽ hiển thị ở mục <b>Danh sách hoa hồng theo sản phẩm</b></> },
        ]
    },
    {
        header: 'ExchangeReturn',
        info: [
            { id: 'return-policy', title: 'Hướng dẫn đổi trả' },
            { id: 'return-case', text: <><b>Trường hợp được đổi/trả hàng</b></> },
            { id: 'unsatisfied-product', text: <>Sản phẩm mua rồi nhưng không ưng ý</> },
            { id: 'return-terms', text: <>- Người mua có thể trả hàng khi không vừa ý trong vòng 1h kể từ khi nhận hàng, Bean sẽ đổi sản phẩm cho khách. Sản phẩm muốn đổi hoặc trả cần giữ sản phẩm nguyên đai, chưa mở nắp, chưa sử dụng. Không nhất thiết còn tem mác hay hỏng hộp. Không bị méo mó, biến dạng.</> },
            { id: 'faulty-product', text: <>Sản phẩm mua bị lỗi</> },
            { id: 'check-product-before-payment', text: <>Quý khách vui lòng kiểm tra sản phẩm trước khi thanh toán. Trong trường hợp sản phẩm bị hư hại trong quá trình vận chuyển, quý khách vui lòng từ chối và gửi lại sản phẩm cho chúng tôi</> },
            { id: 'non-usable-product', text: <>Sản phẩm không sử dụng được ngay khi được giao</> },
            { id: 'check-product-guide', text: <>Trước tiên, hãy dành thời gian đọc kỹ tem hướng dẫn sử dụng và chắc rằng sản phẩm phù hợp với nhu cầu của bạn. Vui lòng liên hệ ngay cho chúng tôi để được hỗ trợ hồi trả lại hàng</> },
            { id: 'wrong-product-delivery', text: <>Sản phẩm giao không đúng theo đơn đặt hàng</> },
            { id: 'wrong-order-contact-us', text: <>Bạn nghĩ rằng sản phẩm giao cho bạn không đúng với đơn đặt hàng? Hãy liên hệ với chúng tôi càng sớm càng tốt, hệ thống của chúng tôi sẽ kiểm tra nếu hàng của bạn bị gửi nhầm. Trong trường hợp đó, chúng tôi sẽ thay thế đúng mặt hàng bạn yêu cầu (khi có hàng).</> },
            { id: 'return-condition-title', text: <><b>Điều kiện đổi trả hàng</b></> },
            { id: 'return-condition-time', text: <>Điều kiện về thời gian đổi trả: trong vòng 01 ngày kể từ khi nhận được hàng và phải liên hệ gọi ngay cho chúng tôi theo số điện thoại trên để được xác nhận đổi trả hàng.</> },
            { id: 'product-condition', text: <>- Sản phẩm gửi lại phải còn nguyên đai nguyên kiện</> },
            { id: 'warranty-condition', text: <>- Phiếu bảo hành (nếu có) và tem của công ty trên sản phẩm còn nguyên vẹn.</> },
            { id: 'product-requirements', text: <>- Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy Hướng dẫn sử dụng và chưa qua sử dụng.</> },
            { id: 'shipping-costs', text: <>- Quý khách chịu chi phí vận chuyển, đóng gói, thu hộ tiền, chi phí liên lạc tối đa tương đương 20% giá trị đơn hàng.</> },
            { id: 'return-condition-title2', text: <><b>Điều kiện đổi trả hàng</b></> },
            { id: 'step1-check-before-receiving', text: <>Bước 1: Sau khi nhận được hàng. Yêu cầu quý vị kiểm tra kỹ 1 lần trước khi nhận hàng. Nếu có vấn đề xin vui lòng liên hệ Trung tâm hỗ trợ khách hàng tại thời điểm nhân viên giao hàng còn ở đó</> },
            { id: 'after-delivery-step', text: <>- Trường hợp sau khi nhân viên giao hàng đã đi</> },
            { id: 'contact-us-return', text: <>- Nếu muốn đổi trả hàng có thể liên hệ với chúng tôi để được xử lý và hẹn lịch đổi trả hàng</> },
            { id: 'step2-arrange-return', text: <>Bước 2: Sau khi Trung tâm hỗ trợ khách hàng thông báo lịch hẹn nhận hàng trả</> },
            { id: 'thank-you-note', text: <><b>Trân Trọng!</b></> },
        ]
    },
    {
        header: 'Gift',
        info: [
            { id: 'gift-program', title: 'Quà tặng tri ân' },
            { id: 'gratitude-program', text: <>Chương trình tri ân diễn ra vào ngày cuối tuần của tuần cuối hàng tháng</> },
            { id: 'product-quality-service', text: <>+ Với mong muốn mang đến cho Quý khách hàng những sản phẩm chất lượng tốt nhất đồng thời đi kèm với dịch vụ tốt nhất và chính sách chăm sóc khách hàng tuyệt vời nhất.</> },
            { id: 'membership-program', text: <>+ Chương trình thẻ hội viên được xây dựng để tạo nên chính sách tri ân khách hàng đã tin chọn sản phẩm của chúng tôi. Quý khách mua sản phẩm của Bean sẽ được cộng dồn điểm tương ứng doanh số mua hàng với mỗi 100.000 VNĐ tương ứng với 1 điểm.</> },
            { id: 'loyal-customer-conditions-title', text: <><b>1. Điều kiện để trở thành khách hàng thân thiết trong chính sách tri ân khách hàng</b></> },
            { id: 'minimum-purchase-condition', text: <>+ Có mua ít nhất 01 sản phẩm bất kỳ có giá trị từ 1.000.000 VNĐ trở lên tại hệ thống và các gian hàng của Bean.</> },
            { id: 'personal-info-condition', text: <>+ Cung cấp đầy đủ và chính xác thông tin cá nhân.</> },
            { id: 'thank-you-note', text: <><b>Bean</b> xin thân tặng Quý khách hàng Chương trình <b>"TRI ÂN KHÁCH HÀNG THÂN THIẾT"</b> như một lời tri ân sâu sắc cảm ơn sự tin yêu của quý khách dành cho <b>Bean.</b></> },
        ]
    },
    {
        header: 'Inquiries',
        info: [
            { id: 'faq', title: 'Giải đáp thắc mắc' },
            { id: 'customer-abroad-query', text: <><b>Khách hàng ở Tỉnh hoặc ở nước ngoài có mua được trên web không? Cách giao dịch như thế nào?</b></> },
            { id: 'global-shopping-possible', text: <>Hoàn toàn có thể được, Internet đã tạo ra môi trường làm việc không giới hạn khoảng cách địa lý. Hiện nay chúng tôi đã phục vụ được hơn 600.000 khách hàng trên toàn quốc và ở nước ngoài</> },
            { id: 'simple-purchase-process', text: <>Cách giao dịch khá đơn giản bạn chỉ cần thêm sản phẩm cần mua vào giỏ hàng sau đó tiến hành thanh toán </> },
            { id: 'payment-process', text: <>Khi đến trang thanh toán thì nhập các thông tin cần thiết như tên, số điện thoại, địa chỉ và tiến hành đặt hàng nhé!</> },
        ]
    },
    {
        header: 'Payment',
        info: [
            { id: 'payment-guide', title: 'Hướng dẫn thanh toán' },
            { id: 'choose-payment-account', text: <><b>Lựa chọn thông tin tài khoản thanh toán</b></> },
            { id: 'existing-account-login', text: <>Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email và mật khẩu vào mục đã có tài khoản trên hệ thống</> },
            { id: 'register-account', text: <>Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền các thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản bạn sẽ dễ dàng theo dõi được đơn hàng của mình</> },
            { id: 'guest-checkout', text: <>Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp chuột vào mục đặt hàng không cần tài khoả</> },
            { id: 'fill-info-to-receive-order', text: <>+ Điền các thông tin của bạn để nhận đơn hàng, lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình</> },
            { id: 'review-order-info', text: <>+ Xem lại thông tin đặt hàng, điền chú thích và gửi đơn hàng</> },
            { id: 'order-confirmation', text: <>Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.</> },
            { id: 'thank-you-message', text: <>Trân trọng cảm ơn.</> },
        ]
    },
    {
        header: 'RetailAdvice',
        info: [
            { id: 'wholesale-consultation', title: 'Tư vấn bán sỉ' },
            { id: 'store-idea', text: <><b>1. Phác thảo ý tưởng về cửa hàng</b></> },
            { id: 'store-idea-description', text: <>Bước đầu tiên khi lập kế hoạch mở shop quần áo là phải phác thảo ý tưởng về cửa hàng tương lai của bạn. Phần này gồm những thông tin cơ bản, là những nét vẽ phác thảo đầu tiên về cửa hàng của bạn như:</> },
            { id: 'store-idea-details', text: <>+ Xác định phong cách thời trang</> },
            { id: 'store-name', text: <>+ Đặt tên cửa hàng</> },
            { id: 'store-goals', text: <>+ Mục tiêu phát triển của cửa hàng trong 5 năm đầu</> },
            { id: 'store-purpose', text: <>+ Mục đích và định hướng mà cửa hàng theo đuổi là gì?</> },
            { id: 'fashion-style', text: <><b>1.1. Xác định phong cách thời trang</b></> },
            { id: 'fashion-style-description', text: <>Việc xác định được phong cách thời trang rất quan trọng. “Bán hàng không phải là bán sản phẩm mà là bán phong cách” – Đó là điều bạn luôn cần nhớ và quyết định xem cửa hàng của bạn có gì độc đáo hơn những cửa hàng thời trang khác ngoài thị trường?</> },
            { id: 'fashion-style-experience', text: <>Kinh nghiệm mở shop quần áo thành công của nhiều người cho hay, phong cách chính là điều làm một cửa hàng trở nên đặc biệt. Ngay trong bước lập kế hoạch kinh doanh quần áo hãy cân nhắc xem cửa hàng của bạn muốn đem lại cho khách hàng cảm giác gì: mạnh mẽ, sang trọng, nữ tính hay đài các…</> },
            { id: 'store-vision', text: <>Phác thảo tầm nhìn và những tưởng tượng đầu tiên về cửa hàng tương lai của bạn không chỉ giúp bạn tập trung phát triển chúng một cách độc đáo mà còn giúp bạn không bị chệch hướng, không quên đi phong cách của cửa hàng trong những bước tiếp theo.</> },
            { id: 'store-name-title', text: <><b>1.2. Đặt tên cho cửa hàng quần áo</b></> },
            { id: 'store-name-description', text: <>Khi lập kế hoạch mở shop quần áo, việc đặt tên cho cửa hàng cũng là việc hết sức quan trọng. Có nhiều cách đặt tên cửa hàng nhưng hãy đặt những tên ngắn gọn, dễ nhớ và không bị trùng lặp với những cửa hàng khác.</> },
            { id: 'store-name-strategy', text: <>Để khi khách hàng đánh tên cửa hàng trên thanh tìm kiếm, họ sẽ nhìn thấy ngay cửa hàng của bạn chứ không phải cực khổ lọc nó ra giữa những cái tên na ná khác.</> },
            { id: 'popular-store-names', text: <>Những cửa hàng nổi tiếng hiện nay được ưa chuộng phần lớn đều mang tên tiếng Anh, đánh vào tâm lý của người Việt như: May, Daisy, 7a.m… Tuy nhiên có rất nhiều người chọn những cái tên Việt độc đáo như: Mộc, Nhỏ Xíu, Xị Đẹp….</> },
            { id: 'business-plan-title', text: <><b>2. Lập kế hoạch kinh doanh quần áo cụ thể</b></> },
            { id: 'target-customers-title', text: <><b>2.1. Xác định khách hàng mục tiêu</b></> },
            { id: 'target-customers-description', text: <>Khi lập kế hoạch kinh doanh quần áo, việc đầu tiên là phải xác định được cụ thể khách hàng mục tiêu mà bạn muốn hướng tới là ai. Bán hàng đa dạng nguồn thu là mong muốn của hầu hết những người mới bắt đầu kinh doanh.</> },
            { id: 'target-customers-advice', text: <>Tuy nhiên, theo kinh nghiệm kinh doanh quần áo của người đi trước thì không nên tham lam nhắm vào quá nhiều đối tượng khách hàng. Bởi bạn hoàn toàn không có đủ thời gian để có thể lựa chọn sản phẩm cho quá nhiều đối tượng, lứa tuổi.</> },
            { id: 'target-customers-strategy', text: <>Vì vậy, khi lập kế hoạch kinh doanh shop thời trang, bạn cần phải xác định mình sẽ mở cửa hàng bán quần áo nam hay nữ, bán cho sinh viên hay dân công sở, hướng tới đối tượng thu nhập cao hay trung bình.</> },
            { id: 'target-customers-importance', text: <>Đây là bước rất quan trọng vì nó sẽ quyết định số vốn bạn phải bỏ ra, nguồn hàng, chiến lược tiếp thị sau này, cách trang trí shop quần áo,...</> },
            { id: 'market-research-title', text: <><b>2.2. Nghiên cứu kỹ lưỡng thị trường</b></> },
            { id: 'market-research-competitors', text: <>+ Đối thủ đang làm như thế nào</> },
            { id: 'market-research-competitors-description', text: <>Người Việt có câu châm ngôn: “Buôn có bạn, bán có phường”, khi có kế hoạch mở shop quần áo, bạn hãy tìm hiểu xem ở ngoài kia, người ta đang bán như thế nào, chất lượng ra sao, kiểu dáng, chất liệu có đảm bảo. Để từ đó đánh giá và rút kinh nghiệm mở shop quần áo cho mình nhé.</> },
            { id: 'market-research-strategy', text: <>Thay vì “ôm mộng” trở thành một đơn vị cung cấp quần áo cho cả nam, nữ, già, trẻ, trong bản kế hoạch kinh doanh thời trang, điều bạn cần ghi nhớ: nghiên cứu thị trường là công việc bắt buộc.</> },
            { id: 'market-research-focus', text: <>Trong đó cụ thể là xác định được đối tượng khách hàng cũng như những gì thị trường đang cần. Nếu bạn cho rằng tất cả mọi người là khách hàng của bạn, thì bạn đang đi sai hướng.</> },
            { id: 'market-research-customer-needs', text: <>Dù cho sản phẩm và dịch vụ của bạn có đặc biệt đến đâu hay mức độ phủ sóng mạnh mẽ thì bạn cũng không thể bán được cho tất cả mọi người. Với những yếu tố như độ tuổi, giới tính, học vấn, địa lý…sẽ dẫn đến những yêu cầu khác nhau của khách hàng đối với sản phẩm.</> },
            { id: 'market-research-customer-insights', text: <>Nhờ vào bước xác định đối tượng, bạn có thể tập hợp được một số thông tin ví dụ như lứa tuổi, sức mua, lối sống và số lượng của nhóm khách hàng tiềm năng. Từ nền tảng này thì mới có thể ước tính được thị phần của sản phẩm sẽ kinh doanh.</> },
            { id: 'competition-analysis-title', text: <>+ Phân tích cạnh tranh</> },
            { id: 'competition-analysis-description', text: <>Sau khi nghiên cứu kỹ lưỡng thị trường, bạn phải điều tra, tìm hiểu thông tin ví dụ như tìm đọc các tư liệu của ngành thời trang, hỏi han các đầu mối tại chợ, cách đi đánh hàng. Phân tích các điểm mạnh, điểm yếu, cơ hội và mối đe dọa cho cửa hàng của bạn.</> },
            { id: 'competition-analysis-competition', text: <>Tìm kiếm thông tin chi tiết về các cửa hàng bán lẻ quần áo trong khu vực và sức cạnh tranh của họ, xem họ đang kinh doanh mô hình thời trang nào. Sau đó tính toán cách bạn tiếp thị đến khách hàng của bạn, các kênh phân phối bán hàng của bạn, và tính bền vững các lợi thế cạnh tranh của bạn.</> },
            { id: 'costs-title', text: <><b>2.3. Xác định chi phí, số vốn cần có khi mở shop quần áo?</b></> },
            { id: 'costs-description', text: <>Mở shop quần áo cần bao nhiêu vốn? Việc xác định chi phí mở shop quần áo là bước rất quan trọng khi lập kế hoạch mở shop. Dù bạn có bao nhiêu vốn đầu tư kinh doanh đi chăng nữa thì nên dành ra 50% số vốn mình có để lấy đợt hàng đầu tiên.</> },
            { id: 'costs-risk', text: <>Đây là kỹ năng bán quần áo khá quan trọng bạn cần nhớ. Đừng nên mạo hiểm nhập hết hàng với số tiền mình có, rủi ro sẽ cao đấy. Theo kinh nghiệm của các chủ shop thời trang, bạn nên có vốn dự phòng để đề phòng những trường hợp rủi ro có thể xảy ra khi thực hiện giấc mơ kinh doanh của mình.</> },
            { id: 'shop-rent', text: <>+ Tiền mở cửa hàng</> },
            { id: 'shop-rent-description', text: <>Nếu bạn mở cửa hàng kinh doanh quần áo online thì vốn tối thiểu sẽ từ 30 đến 60 triệu cho việc nhập hàng và quảng cáo online. Còn nếu bạn mở cửa hàng ở khu tập trung buôn bán quần áo thì bạn nên mở một cửa hàng nhỏ với số vốn từ 60 đến 90 triệu để có thể chi trả cho các chi phí mở shop quần áo nhập hàng, thuê mặt bằng, trang trí không gian cửa hàng và quảng cáo online.</> },
            { id: 'investment-equipment', text: <>+ Đầu tư thiết bị bán hàng</> },
            { id: 'investment-equipment-description', text: <>Đầu tư một phần mềm quản lý cửa hàng thời trang cũng là một yếu tố quan trọng. Đặc thù của những sản phẩm thời trang là nhiều mẫu mã, màu sắc và size số. Sử dụng phần mềm quản lý sẽ cho bạn biết chính xác số lượng cụ thể của từng mặt hàng, để có thể chọn hàng nhanh tư vấn cho khách.</> },
        ]
    },
    {
        header: 'Size',
        info: [
            { id: 'size-guide', title: 'Hướng dẫn chọn size' },
            { id: 'size-chart-introduction', text: <>Một số bảng size chuẩn mà Bean muốn gữi bến bạn.</> },
            { id: 'polo-shirt-size', subTitle: '+ ÁO POLO' },
            { id: 'polo-shirt-size-img', sourceImg: '//bizweb.dktcdn.net/100/451/884/files/img-size.png?v=1650034072679' },
            { id: 'cotton-shirt-size', subTitle: '+ ÁO Cotton' },
            { id: 'cotton-shirt-size-img', sourceImg: '//bizweb.dktcdn.net/100/451/884/files/img-size2.png?v=1650034124971' },
            { id: 't-shirt-size', subTitle: '+ ÁO phông' },
            { id: 't-shirt-size-img', sourceImg: '//bizweb.dktcdn.net/100/451/884/files/img-size3-min.png?v=1650034166187' },
        ]
    },
]