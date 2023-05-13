import React, {useEffect} from "react";
import Helmet from "../../components/Helmet";
import HeroSlider from "../../components/HeroSlider";
import img1 from "../../assets/images/slider/slide_1.png"
import img2 from "../../assets/images/slider/slide_2.png"
import img3 from "../../assets/images/slider/slide_3.png"
import Section, {SectionBody} from "../../components/UI/Section";
import Grid from "../../components/UI/Grid";
import PolicyCard from "../../components/PolicyCard";
const heroSliderData = [
    {
        title: "Polo nữ Pima cao cấp",
        description:
            "Nhắc đến sự đẳng cấp là không thể không nhắc đến dòng vải pima. Nó tạo nên chất lượng tốt nhất cho bất kỳ sản phẩm thời trang nào. Sợi vải pima dài và dày hơn sợi cotton thông thường gấp đôi nhờ công nghệ dệt tân tiến. Điều đó làm cho kết cấu áo polo chắc chắn, bền chặt, hạn chế tối đa xù lông, mềm mượt, bền màu, vô cùng đảm bảo sức khoẻ người dùng",
        img: img1,
        color: "blue",
        path: "/catalog/ao-thun-dinosaur-01",
    },
    {
        title: "Polo Nữ Dáng Suông Modal",
        description:
            "Polo nữ dáng suông Modal sử dụng công nghệ vải cao cấp thân thiện với môi trường sản xuất độc quyền chống co rút vải, áo polo nữ vải modal là sản phẩm thích hợp cho các bạn có môi trường làm việc năng động như hiện nay",
        img: img2,
        path: "/catalog/ao-thun-dinosaur-02",
        color: "pink",
    },
    {
        title: "Polo Nữ Coolmax Lacoste",
        description:
            "Mẫu áo polo nữ được làm bằng chất liệu coolmax đem lại cảm giác mát lạnh khi mặc. Thiết kế mẫu áo polo coolmax này có kiểu dáng cực kỳ thoải mái. Tạo sự gọn gàng hứa hẹn sẽ là mẫu áo polo vô cùng hot trong thời điểm sắp tới",
        img: img3,
        path: "/catalog/ao-thun-dinosaur-03",
        color: "orange",
    },
];
const policy = [
    {
        name: "Miễn phí giao hàng",
        description: "Miễn phí ship với đơn hàng > 239K",
        icon: "bx bx-shopping-bag"
    },
    {
        name: "Thanh toán COD",
        description: "Thanh toán khi nhận hàng (COD)",
        icon: "bx bx-credit-card"
    },
    {
        name: "Khách hàng VIP",
        description: "Ưu đãi dành cho khách hàng VIP",
        icon: "bx bx-diamond"
    },
    {
        name: "Hỗ trợ bảo hành",
        description: "Đổi, sửa đồ tại tất cả store",
        icon: "bx bx-donate-heart"
    }
]

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(heroSliderData)

    return (
        <Helmet title="Trang chủ">
            <HeroSlider
                data={heroSliderData}
                control={true}
                auto={true}
                timeout={5000}
            />
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {policy.map((item, index) => (
                            <PolicyCard
                                key={index}
                                name={item.name}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Home;
