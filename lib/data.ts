export type RegionKey = 'bac' | 'trung' | 'nam';

export type LibraryEntry = {
  region: RegionKey;
  title: string;
  desc: string;
  tags: string[];
};

export type RegionHighlight = {
  title: string;
  points: string[];
};

export type RegionCard = {
  key: RegionKey;
  name: string;
  image?: string;
  badge: string;
  badge2: string;
  badgeImage?: string;
  highlights: RegionHighlight[];
};

export type Rank = { name: string; min: number };

export const libraryEntries: LibraryEntry[] = [
  { region: 'bac', title: 'Quan họ Bắc Ninh', desc: 'Làn điệu giao duyên, UNESCO công nhận, hát đối đáp trên thuyền.', tags: ['Dân ca', 'Lễ hội Lim'] },
  { region: 'bac', title: 'Ca trù', desc: 'Không gian ca trù với phách, đàn đáy và giọng hát ca nương.', tags: ['Di sản phi vật thể'] },
  { region: 'bac', title: 'Ẩm thực Hà Nội', desc: 'Phở, bún chả, bún thang, cốm làng Vòng và trà sen.', tags: ['Ẩm thực'] },
  { region: 'trung', title: 'Nhã nhạc cung đình Huế', desc: 'Âm nhạc lễ nghi triều Nguyễn, nhạc cụ nhã nhạc & múa cung đình.', tags: ['Âm nhạc cung đình'] },
  { region: 'trung', title: 'Mì Quảng & cao lầu', desc: 'Sợi mì vàng, đậu phộng rang, bánh tráng nướng và rau sống xứ Quảng.', tags: ['Ẩm thực'] },
  { region: 'trung', title: 'Bài chòi Trung Bộ', desc: 'Trò chơi dân gian hát hò với thẻ tre, gắn với Tết Nguyên Đán.', tags: ['Trò chơi', 'Di sản UNESCO'] },
  { region: 'nam', title: 'Đờn ca tài tử', desc: 'Ngũ cung phương Nam, vọng cổ, nhịp song lang, không gian đờn ca trên sông.', tags: ['Âm nhạc'] },
  { region: 'nam', title: 'Chợ nổi Mekong', desc: 'Văn hóa giao thương trên sông, ghe xuồng, tiếng rao hàng đầu sáng.', tags: ['Đời sống', 'Du lịch'] },
  { region: 'nam', title: 'Ẩm thực miệt vườn', desc: 'Lẩu mắm, bánh xèo, cá kho tộ, trái cây Cái Bè, Cần Thơ.', tags: ['Ẩm thực'] },
  { region: 'trung', title: 'Lễ hội cầu ngư', desc: 'Tín ngưỡng cư dân biển miền Trung, cầu mùa tôm cá bội thu.', tags: ['Lễ hội', 'Tín ngưỡng'] },
  { region: 'bac', title: 'Chèo đồng bằng', desc: 'Sân khấu dân gian kết hợp hài hước, trữ tình và múa.', tags: ['Sân khấu'] },
  { region: 'nam', title: 'Đua ghe ngo Nam Bộ', desc: 'Lễ hội Khmer với những chiếc ghe ngo dài, nhiều tay chèo.', tags: ['Lễ hội', 'Thể thao dân gian'] }
];

export const regions: RegionCard[] = [
  {
    key: 'bac',
    name: 'Miền Bắc',
    image: '/images/mienbacne.jpg',
    badge: 'Khí hậu bốn mùa',
    badge2: 'Đậm đà ngàn năm',
    badgeImage: '/images/mienbacne.jpg',
    highlights: [
      {
        title: 'Ẩm thực tinh tế',
        points: ['Bún chả', 'Phở', 'Cốm làng Vòng']
      },
      {
        title: 'Lễ hội tiêu biểu',
        points: ['Đền Hùng', 'Chùa Hương', 'Hội Lim quan họ']
      },
      {
        title: 'Âm nhạc truyền thống',
        points: ['Quan họ', 'Ca trù', 'Chèo cổ']
      },
      {
        title: 'Địa hình',
        points: ['Núi đá vôi', 'Trung du', 'Đồng bằng sông Hồng']
      },
      {
        title: 'Vì sao “trang trọng – lễ nghi – chỉn chu”?',
        points: [
          'Lịch sử định cư lâu đời với cộng đồng làng xã kết chặt tạo quan hệ dày đặc.',
          'Môi trường đông người đòi hỏi khuôn phép: xưng hô phân vai, cưới hỏi/giỗ chạp chuẩn bị nghi thức, giờ giấc chuẩn chỉnh.'
        ]
      },
      {
        title: 'Phong tục tiêu biểu',
        points: [
          'Xưng hô luôn kèm vai vế (cô, chú, bác, anh, chị) và “dạ/thưa”.',
          'Nghi lễ gia đình coi trọng trình tự, sính lễ, giờ lành, thể hiện sự chỉn chu.'
        ]
      }
    ]
  },
  {         
    key: 'trung',
    name: 'Miền Trung',
    badge: 'Dải đất di sản',
    badge2: 'Gió Lào & sóng biển',
    badgeImage: '/images/mientrungne.jpg',
    highlights: [
      {
        title: 'Ẩm thực',
        points: ['Bún bò Huế', 'Mì Quảng', 'Cao lầu Hội An']
      },
      {
        title: 'Di sản văn hóa',
        points: ['Phố cổ Hội An', 'Thánh địa Mỹ Sơn', 'Kinh thành Huế']
      },
      {
        title: 'Lễ hội & biển',
        points: ['Festival Huế', 'Đua ghe ngo', 'Lễ cầu ngư miền biển']
      },
      {
        title: 'Âm nhạc',
        points: ['Hò khoan Lệ Thủy', 'Bài chòi', 'Nhã nhạc cung đình']
      }
    ]
  },
  {
    key: 'nam',
    name: 'Miền Nam',
    badge: 'Sông nước',
    badge2: 'Phóng khoáng miệt vườn',
    badgeImage: '/images/miennamne.jpg',
    highlights: [
      {
        title: 'Ẩm thực sông nước',
        points: ['Hủ tiếu', 'Bánh xèo', 'Cá kho tộ', 'Lẩu mắm']
      },
      {
        title: 'Không gian trải nghiệm',
        points: ['Chợ nổi Cái Răng', 'Rừng tràm Trà Sư', 'Miệt vườn trái cây']
      },
      {
        title: 'Âm nhạc dân gian',
        points: ['Đờn ca tài tử', 'Vọng cổ', 'Cải lương']
      },
      {
        title: 'Giao lưu văn hóa',
        points: ['Múa lân', 'Lễ hội Ok Om Bok', 'Miếu Bà Chúa Xứ núi Sam']
      }
    ]
  }
];

export const ranks: Rank[] = [
  { name: 'Tân binh', min: 0 },
  { name: 'Dân chơi làng', min: 2 },
  { name: 'Cao thủ đình', min: 4 },
  { name: 'Nghệ nhân', min: 7 },
  { name: 'Huyền thoại', min: 10 }
];

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

export const gameQuestions: Question[] = [
  {
    id: 1,
    question: 'Theo lý thuyết tồn tại xã hội, yếu tố nào sau đây không thuộc cấu thành chính của tồn tại xã hội?',
    options: ['Điều kiện tự nhiên', 'Dân cư', 'Ý thức xã hội', 'Phương thức sản xuất'],
    correctAnswer: 2,
    explanation: 'Ý thức xã hội không thuộc tồn tại xã hội mà là phạm trù riêng biệt.'
  },
  {
    id: 2,
    question: 'Theo lý thuyết phương thức sản xuất vật chất, yếu tố này có vai trò gì đối với sự phát triển xã hội?',
    options: ['Chỉ hỗ trợ đời sống tinh thần', 'Quy định trực tiếp sự sinh tồn và phát triển của xã hội', 'Quy định mức độ dân số trong một khu vực', 'Chỉ tác động đến điều kiện tự nhiên'],
    correctAnswer: 1,
    explanation: 'Phương thức sản xuất là nền tảng quy định sự tồn tại và phát triển của xã hội.'
  },
  {
    id: 3,
    question: 'Trong khuôn khổ quan hệ biện chứng giữa TTXH và YTXH, nguyên nhân chủ yếu khiến phong tục, tập quán khác nhau giữa các vùng miền trong cùng một quốc gia là gì?',
    options: ['Khí hậu và thổ nhưỡng hoàn toàn quyết định YTXH', 'Sự khác nhau về tồn tại xã hội (PTSX, điều kiện sản xuất, lịch sử, điều kiện sinh hoạt) dẫn tới sự khác nhau trong YTXH', 'Do truyền thông hiện đại gây ra', 'Do lãnh đạo địa phương muốn phân biệt'],
    correctAnswer: 1,
    explanation: 'Theo lý thuyết, TTXH quyết định YTXH — khác nhau về TTXH ở các vùng dẫn đến khác nhau trong phong tục tập quán.'
  },
  {
    id: 4,
    question: 'Tại sao một vùng miền đã có thay đổi mạnh về kinh tế kỹ thuật nhưng vẫn giữ nhiều phong tục cũ lạc hậu?',
    options: ['Vì YTXH luôn chính xác hơn TTXH', 'Vì YTXH chỉ là cảm xúc nhất thời', 'Vì YTXH có tính độc lập tương đối: TTXH thay đổi nhanh hơn khả năng phản ánh của YTXH; thêm vào đó, sức mạnh thói quen, truyền thống và lực lượng xã hội phản tiến bộ duy trì tư tưởng cũ', 'Vì con người không học được tư tưởng mới'],
    correctAnswer: 2,
    explanation: 'YTXH thường lạc hậu do khả năng phản ánh chậm, thói quen/truyền thống và lực lượng chống thay đổi.'
  },
  {
    id: 5,
    question: 'Ý nghĩa của "tác động qua lại giữa các hình thái ý thức" trong bối cảnh vùng miền là gì?',
    options: ['Mỗi hình thái ý thức đứng độc lập, không ảnh hưởng lẫn nhau', 'Một hình thái ý thức nổi lên ở vùng này có thể ảnh hưởng, chi phối hoặc làm biến dạng các hình thái ý thức khác trong cùng vùng hoặc giữa các vùng', 'Chỉ có kinh tế mới ảnh hưởng tư tưởng', 'Chỉ xảy ra trong thời chiến'],
    correctAnswer: 1,
    explanation: 'Hình thái ý thức mạnh có thể tác động lan tỏa, giải thích vì sao một xu hướng vùng này ảnh hưởng phong tục vùng khác.'
  },
  {
    id: 6,
    question: 'Ví dụ nào phù hợp nhất với tính vượt trước của ý thức xã hội?',
    options: ['Tập quán ăn Tết truyền qua nhiều đời', 'Dư luận lan nhanh trên mạng về một sự kiện', 'Một học thuyết/quan điểm xã hội đề xuất mô hình tổ chức xã hội tiến bộ trước khi điều kiện vật chất chín muồi', 'Thói quen tiêu dùng không thay đổi dù thu nhập tăng'],
    correctAnswer: 2,
    explanation: 'Tính vượt trước thể hiện khi ý thức đề xuất mô hình mới trước khi thực tế vật chất sẵn sàng.'
  },
  {
    id: 7,
    question: 'Phát biểu nào thể hiện ý thức xã hội tác động trở lại tồn tại xã hội?',
    options: ['Khí hậu khắc nghiệt làm người dân phải tiết kiệm', 'Đời sống vật chất quyết định đời sống tinh thần', 'Phong trào "sống xanh" thay đổi hành vi tiêu dùng và thúc đẩy doanh nghiệp chuyển đổi sản xuất', 'Dân số tăng làm thay đổi nhu cầu nhà ở'],
    correctAnswer: 2,
    explanation: 'Phong trào tư tưởng (YTXH) thay đổi hành vi và sản xuất (TTXH) là ví dụ điển hình tác động ngược.'
  },
  {
    id: 8,
    question: 'Đặc điểm nào sau đây đúng nhất với "ý thức xã hội thông thường"?',
    options: ['Phản ánh sâu sắc bản chất và quy luật của hiện thực', 'Được hệ thống hóa thành học thuyết chặt chẽ', 'Hình thành trực tiếp trong đời sống hằng ngày, phong phú và dễ lan truyền', 'Chỉ tồn tại trong các văn bản pháp lý'],
    correctAnswer: 2,
    explanation: 'Ý thức xã hội thông thường phát sinh từ đời sống hằng ngày, chưa hệ thống hóa.'
  }
];
