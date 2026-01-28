"use client";
import { useEffect, useState } from "react";
import { AIUsage } from "./AIUsage";
import { DongSonBackground } from "./DongSonBackground";
import { Game } from "./Game";
import { Hero } from "./Hero";
import { Library } from "./Library";
import { NavBar, type NavKey } from "./NavBar";
import { Presentation as PresentationOverview } from "./Presentation";
import { Regions } from "./Regions";
import { Theory } from "./Theory";
import { PresentationModal } from "./PresentationModal";
import { SlideContent, type Slide } from "./SlideContent";

export function Home() {
  const [currentPage, setCurrentPage] = useState<NavKey>("presentation");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    cards: { region?: string; content?: string; images: string[] }[];
  } | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(1);
  const [dropdownLeftOpen, setDropdownLeftOpen] = useState(false);
  const [dropdownRightOpen, setDropdownRightOpen] = useState(false);
  const [economyCultureView, setEconomyCultureView] = useState<"foundation" | "driver" | null>(null);
  const [economyCultureSelectionBySlide, setEconomyCultureSelectionBySlide] = useState<
    Record<string, "foundation" | "driver" | null>
  >({});

  const handleEconomyCultureChoice = (
    targetId: string,
    choice: "foundation" | "driver"
  ) => {
    setEconomyCultureView(choice);
    setEconomyCultureSelectionBySlide((prev) => ({
      ...prev,
      [targetId]: choice,
    }));
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== "presentation") {
      setModalOpen(false);
      setCurrentCardIndex(0);
    }
  }, [currentPage]);

  const economyCultureContent = {
    foundation: {
      quote:
        "Văn hóa là một kiến trúc thượng tầng; những cơ sở hạ tầng của xã hội có kiến thiết rồi, văn hóa mới kiến thiết được.",
      citation:
        "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 1.b, tr. 209)",
      description:
        "Kinh tế tạo ra của cải, cơ sở vật chất và điều kiện sống để con người tồn tại, học tập, lao động và sáng tạo. Trình độ phát triển kinh tế quyết định khả năng đầu tư cho giáo dục, khoa học, nghệ thuật, bảo tồn di sản và nâng cao đời sống tinh thần. Không có nền tảng kinh tế, văn hóa khó có điều kiện hình thành và phát triển.",
      evidences: [
        {
          image: "/images/trang/trai/m1-1.jpg",
          caption:
            "Khánh thành công trình phúc lợi giáo dục – nền tảng vật chất cho phát triển văn hóa.",
          url: "https://nongnghiepmoitruong.vn/pvfcco-khanh-thanh-cong-trinh-truong-mam-non-xa-dai-dong-d279915.html",
        },
        {
          image: "/images/trang/trai/m1-2.jpg",
          caption:
            "Cơ sở vật chất nhà trường được đầu tư giúp nâng chất lượng giáo dục.",
        },
        {
          image: "/images/trang/trai/m2-1.jpg",
          caption:
            "Tu bổ di tích khi có nguồn lực kinh tế và sự quan tâm đầu tư.",
          url: "https://bvhttdl.gov.vn/trung-tu-chua-cau-hoi-an-giu-yeu-to-goc-va-dam-bao-tinh-lau-ben-cua-cong-trinh-20240729094040633.htm",
        },
        {
          image: "/images/trang/trai/m2-2.jpg",
          caption:
            "Di sản được phục hồi, tạo không gian văn hóa – du lịch cộng đồng.",
        },
        {
          image: "/images/trang/trai/m3-1.jpg",
          caption:
            "Hội nghị, sự kiện phát triển bền vững thúc đẩy hợp tác văn hóa – xã hội.",
          url: "https://baochinhphu.vn/chuyen-doi-so-chuyen-doi-xanh-khong-chi-thuan-tuy-la-ung-dung-cong-nghe-10223093010372527.htm",
        },
        {
          image: "/images/trang/trai/m3-2.jpg",
          caption:
            "Đầu tư cho con người và phúc lợi xã hội tạo nền tảng lan tỏa văn hóa.",
        },
      ],
      summaries: [
        "Kinh tế là nền tảng vật chất để phát triển giáo dục, văn hóa và nâng cao đời sống nhân dân.",
        "Nhờ có nền tảng kinh tế, hoạt động bảo tồn văn hóa mới thực hiện được.",
        "Trước hết phải xây dựng nền kinh tế hiện đại, đúng tinh thần “kinh tế là nền tảng”.",
      ],
    },
    driver: {
      quote: "Văn hóa cũng không thể đứng ngoài mà phải đứng trong kinh tế",
      citation:
        "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 1.b, tr. 209)",
      description:
        "Văn hóa không chỉ là kết quả của kinh tế mà còn là sức mạnh thúc đẩy kinh tế phát triển. Văn hóa hình thành nền con người có tri thức, đạo đức, kỷ luật, ý thức trách nhiệm, năng lực sáng tạo và tinh thần cống hiến. Chính con người – với chất lượng văn hóa của mình – là nguồn lực nội sinh quan trọng nhất của phát triển kinh tế.",
      evidences: [
        {
          image: "/images/trang/phai/m3-2.jpg",
          caption: "Văn hóa doanh nghiệp giúp tăng năng suất và đổi mới sáng tạo.",
          url: "https://v3.viettelfamily.com/magazine/chuyen-muc-van-hoa-viettel/van-hoa-viettel-soi-duong-con-muon-phat-trien-thi-phai-tien-len",
        },
        {
          image: "/images/trang/phai/m1-1.jpg",
          caption: "Môi trường làm việc tích cực tạo động lực phát triển kinh tế.",
          url: "https://mecifactory.com/van-hoa-doanh-nghiep-fpt/",
        },
        {
          image: "/images/trang/phai/m1-2.jpg",
          caption:
            "Hoạt động cộng đồng nâng cao ý thức, hình thành lối sống văn minh.",
          url: "https://nhandan.vn/phat-dong-chien-dich-da-uong-ruou-bia-khong-lai-xe-post859699.html",
        },
        {
          image: "/images/trang/phai/m2-1.jpg",
          caption:
            "Giá trị văn hóa thúc đẩy sự gắn kết và kỷ luật xã hội.",
          url: "https://baochinhphu.vn/phat-dong-phong-trao-toan-dan-chung-tay-bao-ve-moi-truong-chao-mung-ky-niem-80-nam-quoc-khanh-2-9-102250813234741553.htm",
        },
        {
          image: "/images/trang/phai/m2-2.jpg",
          caption:
            "Tri thức – kỹ năng – đạo đức là nền tảng nguồn nhân lực.",
          url: "https://hcmcpv.org.vn/tin-tuc/doi-hinh-chuyen-doi-so-cong-dong-ho%CC%83-tro%CC%A3-nguo%CC%80i-dan-tren-dia-ban-quan-1-1491934952",
        },
        {
          image: "/images/trang/phai/m3-1.jpg",
          caption:
            "Chuyển đổi số hiệu quả cần văn hóa học tập và đổi mới.",
        },
      ],
      summaries: [
        "Chính văn hóa tổ chức tạo ra sức cạnh tranh kinh tế.",
        "Hoạt động văn hóa – cộng đồng góp phần nâng cao ý thức và kỷ cương xã hội.",
        "Văn hóa trở thành động lực thúc đẩy con người tham gia, cống hiến và chung tay xây dựng xã hội phát triển.",
      ],
    },
  };

  // Danh sách các slide trình bày, sắp xếp hợp lý theo tiến trình nội dung
  const slides: Slide[] = [
    // Mở đầu: Đặt vấn đề về sự khác biệt phong tục giữa các vùng miền
    {
      id: "slide-1",
      layout: "title" as const,
      content: {
        textLarge: "Vì sao cùng một quốc gia nhưng phong tục tập quán giữa các vùng miền lại khác biệt sâu sắc?",
        image: "/images/modau.png",
      },
    },
    // Lý luận nền tảng: Tư tưởng Hồ Chí Minh về văn hoá
    {
      id: "slide-2",
      title: "Tư tưởng Hồ Chí Minh về văn hoá",
      layout: "title" as const,
      content: {
        points: [
          "Chủ tịch Hồ Chí Minh được UNESCO tôn vinh là Anh hùng giải phóng dân tộc, Nhà văn hoá kiệt xuất của Việt Nam (1987).",
          "Người để lại dấu ấn sâu sắc trong sự nghiệp đấu tranh vì hoà bình, độc lập dân tộc, dân chủ và tiến bộ xã hội, đồng thời có đóng góp lớn trong các lĩnh vực văn hoá, giáo dục, nghệ thuật.",
          "Tư tưởng văn hoá Hồ Chí Minh là sự kết tinh truyền thống văn hoá hàng nghìn năm của dân tộc Việt Nam, đồng thời tiếp thu tinh hoa văn hoá nhân loại, thể hiện khát vọng khẳng định bản sắc dân tộc và tăng cường hiểu biết giữa các dân tộc.",
          "Người có cống hiến to lớn trong việc sáng tạo văn hoá, xây dựng hệ thống quan điểm về văn hoá và đặt nền móng cho nền văn hoá mới Việt Nam.",
          "Suốt cuộc đời, Hồ Chí Minh đặc biệt chú trọng chống nạn mù chữ, nâng cao dân trí, phát triển văn hoá.",
          "Nền văn hoá mà Người chủ trương là sự kết hợp giữa chủ nghĩa yêu nước và chủ nghĩa quốc tế chân chính, giữa truyền thống dân tộc và giá trị tiến bộ của nhân loại.",
          "Văn hoá phải đi sâu vào đời sống xã hội, góp phần chống tham nhũng, lười biếng, phù hoa, xa xỉ, giúp mọi người dân hiểu rõ trách nhiệm và được hưởng hạnh phúc chính đáng.",
        ],
      },

    },
    // Ba yếu tố cấu thành tồn tại xã hội
    {
      id: "slide-3",
      title: "Mối quan hệ giữa văn hóa và chính trị",
      layout: "image-carousel" as const,
      content: {
        image: "/images/thao/slide1.jpg",
        points: [
          {
            text: "Chỉ khi chính trị và xã hội được giải phóng thì văn hóa mới có điều kiện được giải phóng và phát triển.",
            citation: "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 2.b – Quan hệ giữa văn hóa với chính trị, trang 208).",
            image: "/images/thao/slide1.jpg",
            conclusion: "Nếu đất nước còn bị áp bức, mất độc lập, nhân dân chưa được tự do thì văn hóa cũng sẽ bị kìm hãm, không thể phát triển toàn diện."
          },
          {
            text: "Văn hóa cũng không đứng ngoài chính trị mà phải phục vụ nhiệm vụ chính trị, ở trong chính trị",
            citation: "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 2.b – Quan hệ giữa văn hóa với chính trị, trang 209).",
            image: "/images/thao/carosell2.jpg",
          },
          {
            text: "Người nhấn mạnh văn hóa phải tham gia vào nhiệm vụ chung của dân tộc: tham gia các hoạt động cách mạng, tham gia kháng chiến và xây dựng chủ nghĩa xã hội.",
            citation: "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 2.c – Văn hóa phục vụ quần chúng nhân dân, trang 216).",
            image: "/images/thao/carosell3.jpg",
          },
          {
            text: "Trước Cách mạng Tháng Tám năm 1945, nước ta còn là thuộc địa nên đời sống tinh thần của nhân dân rất khó khăn, trình độ dân trí thấp và văn hóa bị hạn chế. ",
            citation: "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 3 – Quan điểm Hồ Chí Minh về xây dựng nền văn hóa mới, trang 217).",
            image: "/images/thao/carosell4.jpg",
            conclusion: "Sau khi giành được độc lập, chính trị được giải phóng thì văn hóa mới có cơ hội phát triển mạnh. Nhà nước phát động các phong trào như Bình dân học vụ để xóa nạn mù chữ, đồng thời xây dựng nền văn hóa mới mang tính dân tộc, khoa học và đại chúng."
          },
          {
            text: "Trong cách mạng xã hội chủ nghĩa, Hồ Chí Minh đánh giá cuộc cách mạng trên mặt trận văn hóa là một nhiệm vụ cực kỳ quan trọng.",
            citation: "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 2.c – Văn hóa phục vụ quần chúng nhân dân, trang 216).",
            image: "/images/thao/carosell5.jpg",
            conclusion: "Vì vậy, trong giai đoạn xây dựng đất nước, chính trị và văn hóa càng phải tiến hành song song, tác động qua lại và thúc đẩy nhau phát triển."
          },
          {
            text: "Liên hệ thực tiễn hiện nay, chúng ta có thể thấy khi đất nước ổn định về chính trị và có các chính sách phát triển đúng đắn, văn hóa càng có điều kiện lan tỏa mạnh hơn.",
            citation: "(Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 2 – Quan điểm của Hồ Chí Minh về văn hóa, trang 208–209).",
            image: "/images/thao/carosell6.jpg"
          }
        ],
      }
    },
    {
      id: "slide-3a",
      title: "Quan hệ giữa văn hóa và kinh tế",
      subtitle: "Chọn một nhánh để xem trình bày chi tiết",
      layout: "economy-culture-choice" as const,
      content: {
        targetId: "slide-3b",
        left: {
          title: "KINH TẾ LÀ NỀN TẢNG",
        },
        right: {
          title: "VĂN HÓA LÀ ĐỘNG LỰC",
        },
      },
    },
    {
      id: "slide-3b",
      title: "Trình bày nội dung",
      layout: "economy-culture-detail" as const,
      content: economyCultureContent,
    },
    {
      id: "slide-3c",
      title: "Quan hệ giữa văn hóa và kinh tế",
      subtitle: "Chọn một nhánh để xem trình bày chi tiết",
      layout: "economy-culture-choice" as const,
      content: {
        targetId: "slide-3d",
        disableLeft: true,
        left: {
          title: "KINH TẾ LÀ NỀN TẢNG",
          subtitle: "Nền tảng vật chất cho văn hóa",
          description:
            "Chỉ khi kinh tế phát triển, văn hóa mới có điều kiện hình thành và lan tỏa mạnh mẽ.",
        },
        right: {
          title: "VĂN HÓA LÀ ĐỘNG LỰC",
          subtitle: "Động lực nội sinh cho kinh tế",
          description:
            "Chất lượng con người và giá trị văn hóa thúc đẩy năng suất, sáng tạo và phát triển bền vững.",
        },
      },
    },
    {
      id: "slide-3d",
      title: "Trình bày nội dung",
      layout: "economy-culture-detail" as const,
      content: economyCultureContent,
    },
    {
      id: "slide-3e",
      title: "Tác động của mối quan hệ văn hóa - kinh tế hiện nay",
      layout: "impact-economy-culture" as const,
      content: {
        positiveTitle: "Mặt tích cực",
        negativeTitle: "Mặt hạn chế",
        positive: [
          {
            text: "Văn hóa được đưa vào sản phẩm, nâng giá trị kinh tế và thương hiệu quốc gia.",
            example: "VD: Gạo ST25, cà phê Trung Nguyên,...",
          },
          {
            text: "Văn hóa doanh nghiệp tạo động lực đổi mới, kỷ luật và phụng sự.",
            example: "VD: Viettel, FPT,...",
          },
          {
            text: "Văn hóa thúc đẩy kinh tế xanh, kinh tế tri thức, phát triển bền vững.",
            example:
              "VD: Du lịch sinh thái Tràng An – Ninh Bình, Hội An, các dự án khởi nghiệp xanh, nông nghiệp hữu cơ, sản phẩm thủ công thân thiện môi trường,...",
          },
        ],
        negative: [
          {
            text: "Chạy theo lợi nhuận, xem nhẹ văn hóa dẫn đến phá vỡ cảnh quan, di tích.",
            example:
              "VD: Một phần bán đảo Sơn Trà bị “cạo trọc” cây xanh để lấy đất xây hàng chục biệt thự của Khu du lịch Biển Tiên Sa,...",
          },
          {
            text: "Làng nghề ô nhiễm nghiêm trọng do thiếu ý thức văn hóa trong sản xuất.",
            example:
              "VD: Nhựa chất thành đống tại lán trại của một hộ dân trong thôn Xà Cầu - “thủ phủ” với nghề thu mua và sơ chế rác thải nhựa lớn nhất thủ đô,...",
          },
          {
            text: "Phát triển nóng gây tổn hại môi trường và đời sống cộng đồng.",
            example: "VD: Khu công nghiệp gây ô nhiễm không khí, nguồn nước,...",
          },
        ],
      },
    },
    {
      id: "slide-3f",
      title: "Quan hệ văn hóa với xã hội",
      layout: "society-relation" as const,
      content: {
        hero: {
          image: "/images/uyen/1.png",
          text:
            "Giải phóng chính trị đồng nghĩa với giải phóng xã hội, tự do văn hóa mới có điều kiện phát triển. “Xã hội thế nào, văn nghệ thế ấy” của Bác khi xưa, nay mở rộng ra thành xã hội thế nào, văn hóa thế ấy.",
          quote: "“Xã hội thế nào, văn nghệ thế ấy” (Hồ Chí Minh).",
          note: "(1) Hồ Chí Minh: Toàn tập, tập 9, trang 231",
          noteUrl: "https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/book/ho-chi-minh/tac-pham/ho-chi-minh-toan-tap-tap-9-276?categoryId=104000015",
        },
        intro:
          "Văn học nghệ thuật của dân tộc Việt Nam rất phong phú, nhưng chế độ nô lệ của kẻ áp bức, thì văn nghệ cũng bị nô lệ, bị tồi tàn, không thể phát triển được.",
        leftBox: {
          title: "Xã hội cũ (Phong kiến, lạc hậu)",
          points: [
            "Tôn ti trật tự cũ",
            "Mê tín",
            "Coi trọng lễ nghi rườm rà",
            "⇒ Cờ bạc, hút xách, mê tín dị đoan, trọng nam khinh nữ.",
          ],
        },
        rightBox: {
          title: "Xã hội mới (Sau Cách mạng tháng 8)",
          points: [
            "Nhân dân làm chủ",
            "Xã hội đề cao sự bình đẳng",
            "Tiết kiệm để kiến quốc",
            "⇒ Bác Hồ phát động phong trào “Đời sống mới”",
            "Ma chay linh đình → tổ chức đơn giản, trang nghiêm (Tiết kiệm).",
            "Mê tín → tin vào khoa học, vệ sinh phòng bệnh (Văn minh).",
            "Đàn bà chỉ ở trong bếp → Phụ nữ tham gia công tác xã hội (Bình đẳng).",
          ],
        },
        lifeNew: {
          image: "/images/uyen/1-1.png",
          text:
            "“Đời sống mới” là tác phẩm của Chủ tịch Hồ Chí Minh (bút danh Tân Sinh) viết năm 1947, nhằm kêu gọi nhân dân xây dựng xã hội văn minh, loại bỏ hủ tục và thực hành Cần, Kiệm, Liêm, Chính trong kháng chiến và kiến quốc. Đây là nền tảng tư tưởng quan trọng, vẫn còn giá trị đến nay, đặc biệt trong việc xây dựng nông thôn mới và đời sống văn hóa.",
          url: "https://nghean.dcs.vn/vi-vn/tin/tac-pham-doi-song-moi%E2%80%9D-cua-chu-tich-ho-chi-minh-voi-viec-khoi-day-suc-manh-dai-doan-ket-cac-tang-lop-nhan-dan-o-nghe-an-hien-nay%E2%80%9D/73410-203449-163366",
        },
      },
    },
    {
      id: "slide-4",
      title: "Về giữ gìn bản sắc văn hóa dân tộc, tiếp thu văn hóa nhân loại",
      layout: "cultural-identity" as const,
      content: {
        intro:
          "Bản sắc văn hóa dân tộc là những giá trị văn hóa bền vững của cộng đồng các dân tộc Việt Nam, là thành quả của quá trình lao động, sản xuất, chiến đấu và giao lưu của con người Việt Nam. Được nhìn nhận qua hai lớp quan hệ:",
        top: {
          image: "/images/uyen/3/image.png",
          title: "Về nội dung:",
          points: [
            "Lòng yêu nước",
            "Thương nòi",
            "Tinh thần độc lập",
            "Tự cường tự tôn dân tộc...",
          ],
        },
        bottom: {
          image: "/images/uyen/3/image2.jpg",
          title: "Về hình thức:",
          points: [
            "Ngôn ngữ",
            "Phong tục",
            "Tập quán",
            "Lễ hội truyền thống",
            "Cách cảm và nghĩ...",
          ],
        },
      },
    },
    {
      id: "slide-5",
      title: "Trách nhiệm của con người Việt Nam là phải:",
      layout: "responsibility-list" as const,
      hideTitle: true,
      content: {
        title: "Trách nhiệm của con người Việt Nam là phải:",
        bullets: [
          "Trân trọng, khai thác, giữ gìn, phát huy, phát triển những giá trị của văn hóa dân tộc, đáp ứng yêu cầu, nhiệm vụ cách mạng của từng giai đoạn lịch sử như Người đã dạy “Dân ta phải biết sử ta. Cho tường gốc tích nước nhà Việt Nam”.",
          "Chăm lo cải cách dân tộc, đồng thời cần triệt để tẩy trừ mọi di hại thuộc địa và ảnh hưởng nô dịch của văn hóa đế quốc, tôn trọng phong tục tập quán, văn hóa của các dân tộc ít người.",
        ],
        citation: "(2) Hồ Chí Minh: Toàn tập, tập 3, trang 255",
        citationUrl: "https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/book/ho-chi-minh/tac-pham/ho-chi-minh-toan-tap-tap-3-270",
        exampleTitle: "Ví dụ",
        exampleItems: [
          "Âm nhạc và nghệ thuật",
          "Các di tích",
          "Chính sách Nhà nước về ngôn ngữ",
        ],
        accentColor: "#c40000",
        rowBackground: "#f4e2d6",
      },
    },
    {
      id: "slide-6",
      title: "Hồ Chí Minh chú trọng chắt lọc tinh hoa văn hóa nhân loại với phương châm:",
      layout: "bullet-emphasis" as const,
      hideTitle: true,
      content: {
        title: "Hồ Chí Minh chú trọng chắt lọc tinh hoa văn hóa nhân loại với phương châm:",
        bullets: [
          "Không bài ngoại cực đoan",
          "Không được trở thành \"kẻ bắt chước\". Phải nghiên cứu toàn diện văn hóa thế giới để làm giàu cho văn hóa chính mình Hòa nhập nhưng không hòa tan",
          "Kết hợp tinh hoa văn hóa xưa và nay, Đông và Tây để tạo ra một nền văn hóa Việt Nam mới, hợp với tinh thần dân chủ.",
        ],
        emphasisText: "Hòa nhập nhưng không hòa tan",
      },
    },
    {
      id: "slide-7",
      title: "Quan điểm của Hồ Chí Minh về vai trò của văn hoá",
      layout: "highlight" as const,
      content: {
        boxes: [
          {
            title: "Văn hoá chính trị",
            icon: "🟠",
            cards: [
              {
                content:
                  "Định hướng tư tưởng, nâng cao nhận thức, \"soi đường cho quốc dân đi\", giúp nhân dân hiểu đúng con đường cách mạng.",
                images: [],
              },
            ],
          },
          {
            title: "Văn hoá giáo dục",
            icon: "🟠",
            cards: [
              {
                content:
                  "Tiêu biểu là phong trào \"diệt giặc dốt\", nhằm nâng cao dân trí, đào tạo con người mới – chủ thể của sự nghiệp xây dựng và bảo vệ đất nước.",
                images: [],
              },
              {
                content:
                  "Sau Cách mạng Tháng Tám năm 1945, hơn 90% dân số Việt Nam mù chữ. Bác Hồ coi nạn mù chữ là một loại \"giặc\" và kêu gọi toàn dân tham gia diệt giặc dốt.",
                images: [],
              },
            ],
          },
          {
            title: "Văn hoá văn nghệ",
            icon: "🟠",
            cards: [
              {
                content:
                  "Khơi dậy lòng yêu nước, tinh thần đoàn kết, cổ vũ ý chí đấu tranh và khát vọng vươn lên.",
                images: [],
              },
              {
                content:
                  "Các tác phẩm như \"Bình Ngô đại cáo\" (Nguyễn Trãi), \"Đất nước\" (Nguyễn Khoa Điềm) và nhiều phim/âm nhạc hiện đại đã nuôi dưỡng tinh thần yêu nước, củng cố đoàn kết dân tộc.",
                images: [],
              },
            ],
          },
          {
            title: "Văn hoá đạo đức",
            icon: "🟠",
            cards: [
              {
                content:
                  "Xây dựng hệ giá trị con người mới với các phẩm chất cốt lõi: cần, kiệm, liêm, chính, chí công vô tư.",
                images: [],
              },
            ],
          },
          {
            title: "Văn hoá pháp luật",
            icon: "🟠",
            cards: [
              {
                content: "Bảo đảm dân chủ, trật tự, kỷ cương, phép nước.",
                images: [],
              },
            ],
          },
          {
            title: "Kết luận",
            icon: "✅",
            cards: [
              {
                content:
                  "Trình độ văn hoá của nhân dân càng cao thì khả năng khôi phục kinh tế, phát triển dân chủ và củng cố độc lập dân tộc càng vững chắc.",
                images: [],
              },
              {
                content:
                  "📚 Giáo trình Tư tưởng Hồ Chí Minh, Chương 6, mục 2.a (Văn hóa là động lực), trang 214.",
                images: [],
              },
            ],
          },
        ],
      },
    },
    {
      id: "slide-8",
      title: "Văn hoá là mục tiêu và động lực của sự nghiệp cách mạng",
      layout: "section-summary" as const,
      hideTitle: true,
      content: {
        number: "1",
        title: "Văn hoá là mục tiêu và động lực của sự nghiệp cách mạng",
        intro:
          "Cách mạng Việt Nam không chỉ giành độc lập dân tộc, mà còn hướng tới xây dựng đời sống văn hoá mới, con người mới, xã hội mới.",
        bullets: [
          "Văn hoá là bộ phận không thể thiếu trong mục tiêu chung của cách mạng.",
          "Văn hoá thúc đẩy phát triển xã hội qua các lĩnh vực: chính trị, giáo dục, văn nghệ, đạo đức, pháp luật.",
          "Trình độ văn hoá càng cao thì khả năng khôi phục kinh tế, phát triển dân chủ và củng cố độc lập dân tộc càng vững chắc.",
        ],
      },
    },
    {
      id: "slide-9",
      title: "Văn hoá là một mặt trận",
      layout: "quote" as const,
      content: {
        quote: "Văn hoá nghệ thuật cũng là một mặt trận, anh chị em văn nghệ sĩ là chiến sĩ trên mặt trận ấy.",
        author: "Hồ Chí Minh",
      },
    },
    {
      id: "slide-10",
      title: "Văn hoá phục vụ quần chúng nhân dân",
      layout: "title" as const,
      content: {
        points: [
          "Văn hoá phải xuất phát từ đời sống, phục vụ và vì đời sống của quần chúng nhân dân.",
          "Nhân dân không chỉ là đối tượng hưởng thụ mà còn là chủ thể sáng tạo giá trị văn hoá.",
        ],
      },
    },
    // Định nghĩa ý thức xã hội

  ];

  const conclusionMessages: Record<string, string> = {
    "Trình độ phản ánh":
      "Trình độ phản ánh thể hiện ở hai cấp độ: tâm lý xã hội (thói quen đời thường) và hệ tư tưởng (quan niệm có hệ thống).",
    "Lĩnh vực phản ánh":
      "Các lĩnh vực phản ánh bao gồm: chính trị, pháp quyền, đạo đức, thẩm mỹ, khoa học, tôn giáo, triết học - tạo nên bức tranh toàn diện về ý thức xã hội.",
  };

  const conclusionText =
    modalContent?.title && conclusionMessages[modalContent.title]
      ? conclusionMessages[modalContent.title]
      : "";

  const hasTitleHighlight = (slide: Slide): slide is Slide & { titleHighlight: string } =>
    typeof (slide as { titleHighlight?: unknown }).titleHighlight === "string";

  const handleOpenModal = (title: string, cards: { region?: string; content?: string; images: string[] }[]) => {
    setModalContent({ title, cards });
    setModalOpen(true);
  };

  return (
    <>
      <NavBar current={currentPage} onNavigate={setCurrentPage} />

      {renderPageContent()}

      <PresentationModal
        open={currentPage === "presentation" && modalOpen}
        content={modalContent}
        currentCardIndex={currentCardIndex}
        conclusionText={conclusionText}
        onClose={() => {
          setModalOpen(false);
          setCurrentCardIndex(0);
        }}
        onPrev={() =>
          setCurrentCardIndex((prev) =>
            modalContent ? (prev === 0 ? modalContent.cards.length - 1 : prev - 1) : prev
          )
        }
        onNext={() =>
          setCurrentCardIndex((prev) =>
            modalContent ? (prev === modalContent.cards.length - 1 ? 0 : prev + 1) : prev
          )
        }
      />
    </>
  );

  function renderPageContent() {
    switch (currentPage) {
      case "theory":
        return (
          <main>
            <Hero
              onPrimary={() => setCurrentPage("presentation")}
              onSecondary={() => setCurrentPage("game")}
            />
            <Theory />
            <PresentationOverview />
          </main>
        );
      case "presentation":
        return (
          <main className="presentation-scroll">
            <DongSonBackground />

            {slides.map((slide) => (
              <section key={slide.id} id={slide.id} className="slide-section">
                <div className="slide-content-wrapper">
                  {!("hideTitle" in slide && slide.hideTitle) && (
                    <h1 className="slide-title">
                      {hasTitleHighlight(slide) ? (
                        <>
                          <span className="slide-title-highlight">
                            {slide.titleHighlight}
                          </span>
                          {"titleSuffix" in slide ? slide.titleSuffix : null}
                        </>
                      ) : slide.id === "slide-3b" || slide.id === "slide-3d" ? (
                        economyCultureSelectionBySlide[slide.id] === "foundation"
                          ? "Kinh tế là nền tảng"
                          : economyCultureSelectionBySlide[slide.id] === "driver"
                            ? "Văn hóa là động lực"
                            : slide.title
                      ) : (
                        slide.title
                      )}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className="slide-subtitle">{slide.subtitle}</p>
                  )}
                  <div className="slide-content">
                    <SlideContent
                      slide={slide}
                      economyCultureView={economyCultureView}
                      economyCultureSelectionBySlide={economyCultureSelectionBySlide}
                      onEconomyCultureChoice={handleEconomyCultureChoice}
                      onOpenModal={handleOpenModal}
                      dropdownLeftOpen={dropdownLeftOpen}
                      dropdownRightOpen={dropdownRightOpen}
                      onToggleDropdownLeft={() =>
                        setDropdownLeftOpen((prev) => !prev)
                      }
                      onToggleDropdownRight={() =>
                        setDropdownRightOpen((prev) => !prev)
                      }
                      selectedFeature={selectedFeature}
                      onSelectFeature={setSelectedFeature}
                    />
                  </div>
                </div>
              </section>
            ))}
          </main>
        );
      case "regions":
        return (
          <main>
            <Regions />
          </main>
        );
      case "library":
        return (
          <main>
            <Library />
          </main>
        );
      case "game":
        return (
          <main>
            <Game />
          </main>
        );
      case "about":
        return (
          <main>
            <section className="container section">
              <div className="section-head">
                <div>
                  <h2>Về dự án</h2>
                  <p className="sub">
                    Bộ công cụ học nhanh Triết học Mác-Lênin thông qua phong tục ba miền: slide thuyết trình, thư viện, bản đồ và
                    trò chơi.
                  </p>
                </div>
                <div className="pill pill-ghost">Giới thiệu</div>
              </div>
              <div className="card">
                <p>
                  Dự án được xây dựng để hỗ trợ sinh viên CQ14 chuẩn bị bài trình bày về ý thức xã hội. Toàn bộ nội dung tập trung
                  vào trải nghiệm tương tác: xem slide, đọc lý thuyết, khám phá vùng miền và chơi game dân gian.
                </p>
                <p>
                  Phiên bản hiện tại chạy trên Next.js, ưu tiên tốc độ và khả năng mở rộng. Đóng góp thêm nội dung/ý tưởng bằng
                  cách tạo issue hoặc pull request trên GitHub.
                </p>
              </div>
            </section>
          </main>
        );
      case "ai-usage":
        return (
          <main>
            <AIUsage />
          </main>
        );
      default:
        return null;
    }
  }

}
