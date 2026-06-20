const theoryData = [
    { id: 1, word: "As = because = since = now that = in that", type: "conj", category: "cause", meaning: "bởi vì", example: "Since it was raining, we stayed home." },
    { id: 2, word: "Because of = due to = owing to = on account of = in light of = in view of = as a result of", type: "pre", category: "cause", meaning: "bởi vì", example: "The match was canceled due to heavy rain." },
    { id: 3, word: "Although, though, even though, while", type: "conj", category: "contrast", meaning: "mặc dù (while chỉ sự tương phản)", example: "Although he was tired, he kept working." },
    { id: 4, word: "Despite = in spite of", type: "pre", category: "contrast", meaning: "mặc dù", example: "In spite of the rain, they played football." },
    { id: 5, word: "So that, in order that", type: "conj", category: "purpose", meaning: "để làm gì", example: "I speak slowly so that you can understand." },
    { id: 6, word: "In order to, so as to", type: "pre", category: "purpose", meaning: "để làm gì", example: "He studies hard in order to pass the exam." },
    { id: 7, word: "While, whereas, meanwhile", type: "conj", category: "contrast", meaning: "trong khi; whereas chỉ sự tương phản", example: "He likes tea, whereas I prefer coffee." },
    { id: 8, word: "However, Even so, Nevertheless, Nonetheless", type: "conj-adv", category: "contrast", meaning: "tuy nhiên", example: "It was raining heavily. However, we went out." },
    { id: 9, word: "Therefore, Hence, So, Thus, Thereby", type: "conj-adv", category: "cause", meaning: "do đó, bởi vậy", example: "He was late; therefore, he missed the train." },
    { id: 10, word: "In addition = besides", type: "conj-adv", category: "addition", meaning: "ngoài ra, bên cạnh đó", example: "She is smart. Besides, she is very hard-working." },
    { id: 11, word: "In addition to", type: "pre", category: "addition", meaning: "ngoài ra, cũng như, thay vì, thêm vào đó", example: "In addition to English, she speaks French." },
    { id: 12, word: "Moreover, Furthermore, Besides", type: "conj-adv", category: "addition", meaning: "hơn nữa", example: "The rent is reasonable, and moreover, the location is perfect." },
    { id: 13, word: "Beside", type: "pre", category: "other", meaning: "bên cạnh (về mặt không gian)", example: "Come and sit beside me." },
    { id: 14, word: "Regarding, in/with regards to, about", type: "pre", category: "other", meaning: "về cái gì, liên quan tới ai/cái gì", example: "I am writing regarding your recent inquiry." },
    { id: 15, word: "So + adj/adv that; So + many/much + n that; Such + (a/an) + adj + noun + that", type: "conj", category: "cause", meaning: "quá đến nỗi mà", example: "It was such a cold day that we stayed indoors." },
    { id: 16, word: "Before, prior to", type: "conj-pre", category: "time", meaning: "trước khi", example: "Please finish this report prior to Monday." },
    { id: 17, word: "After", type: "conj-pre", category: "time", meaning: "sau khi", example: "Let's go for a walk after dinner." },
    { id: 18, word: "Once", type: "conj-pre", category: "time", meaning: "một khi; nếu là adv: đã từng", example: "Once you understand this, it's very easy." },
    { id: 19, word: "By the time", type: "conj", category: "time", meaning: "lúc mà", example: "By the time we arrived, the movie had started." },
    { id: 20, word: "Until, till", type: "conj", category: "time", meaning: "cho đến khi", example: "Wait here until I come back." },
    { id: 21, word: "When, as", type: "conj", category: "time", meaning: "khi", example: "Call me when you get home." },
    { id: 22, word: "As soon as", type: "conj", category: "time", meaning: "ngay khi", example: "I will reply as soon as possible." },
    { id: 23, word: "During", type: "pre", category: "time", meaning: "trong suốt", example: "Please turn off your phones during the flight." },
    { id: 24, word: "And", type: "conj", category: "addition", meaning: "và", example: "I bought apples and bananas." },
    { id: 25, word: "Or", type: "conj", category: "addition", meaning: "hoặc", example: "Would you like tea or coffee?" },
    { id: 26, word: "But", type: "conj", category: "contrast", meaning: "nhưng", example: "It's a cheap but good product." },
    { id: 27, word: "Yet", type: "conj", category: "contrast", meaning: "ấy vậy mà", example: "It is a small yet comfortable car." },
    { id: 28, word: "Nor", type: "conj", category: "addition", meaning: "cũng như không", example: "She doesn't like meat, nor does her husband." },
    { id: 29, word: "For", type: "conj", category: "cause", meaning: "Dành cho, bởi vì", example: "We listened eagerly, for he brought good news." },
    { id: 30, word: "Both A and B", type: "conj", category: "addition", meaning: "Cả A và B", example: "Both my father and mother are teachers." },
    { id: 31, word: "Either A or B", type: "conj", category: "addition", meaning: "A hoặc B", example: "You can choose either the red shirt or the blue one." },
    { id: 32, word: "Neither A nor B", type: "conj", category: "addition", meaning: "Không phải A cũng không phải B", example: "Neither John nor Mary came to the party." },
    { id: 33, word: "Not only A but also B", type: "conj", category: "addition", meaning: "Không những A mà còn B", example: "He is not only smart but also kind." },
    { id: 34, word: "Not A but B", type: "conj", category: "contrast", meaning: "Không phải A mà là B", example: "It's not a dog but a wolf." },
    { id: 35, word: "Instead of = In place of = In lieu of", type: "pre", category: "contrast", meaning: "thay vì", example: "I will have tea instead of coffee." },
    { id: 36, word: "As well as", type: "conj", category: "addition", meaning: "cũng như là", example: "He plays the guitar as well as the piano." },
    { id: 37, word: "Even", type: "conj", category: "contrast", meaning: "thậm chí", example: "Even a child can do this simple math." },
    { id: 38, word: "If", type: "conj", category: "condition", meaning: "nếu", example: "If it rains, we will cancel the trip." },
    { id: 39, word: "Only if = as long as", type: "conj", category: "condition", meaning: "chỉ khi, miễn là", example: "You can go out as long as you finish your homework." },
    { id: 40, word: "Even if", type: "conj", category: "condition", meaning: "ngay cả khi, thậm chí", example: "Even if it rains, we will still go to the concert." },
    { id: 41, word: "Unless = If not = Otherwise", type: "conj", category: "condition", meaning: "trừ khi, nếu không thì", example: "We won't go unless you come with us." },
    { id: 42, word: "Otherwise", type: "conj-adv", category: "condition", meaning: "khác, cách khác/mặt khác", example: "Hurry up; otherwise, you'll miss the bus." },
    { id: 43, word: "Following", type: "pre", category: "time", meaning: "sau đó, tiếp theo", example: "Following the meeting, there will be a small party." },
    { id: 44, word: "Whether ... or not ; Whether A or B", type: "conj", category: "condition", meaning: "liệu rằng có không; liệu rằng A hay B", example: "I don't know whether he will come or not." },
    { id: 45, word: "In case (that)", type: "conj", category: "condition", meaning: "trong trường hợp", example: "Take an umbrella in case it rains." },
    { id: 46, word: "In case of, in the event of", type: "pre", category: "condition", meaning: "trong trường hợp", example: "In case of fire, please use the stairs." },
    { id: 47, word: "To the contrary, on the contrary", type: "pre", category: "contrast", meaning: "trái ngược với", example: "The test wasn't hard; on the contrary, it was quite easy." },
    { id: 48, word: "On the other hand", type: "conj", category: "contrast", meaning: "mặt khác", example: "The job pays well, but on the other hand, it's very stressful." },
    { id: 49, word: "The fact that", type: "conj", category: "other", meaning: "thực tế là", example: "The fact that he lied is unacceptable." },
    { id: 50, word: "Given", type: "conj", category: "cause", meaning: "khi bạn xem xét điều gì", example: "Given his age, he is remarkably active." },
    { id: 51, word: "Given that", type: "conj", category: "cause", meaning: "căn cứ vào", example: "Given that it's raining, we should stay indoors." },
    { id: 52, word: "Or else", type: "conj", category: "condition", meaning: "nếu không", example: "Wear your coat, or else you'll catch a cold." },
    { id: 53, word: "Or so", type: "conj", category: "other", meaning: "hơn 1 chút", example: "We stayed there for an hour or so." },
    { id: 54, word: "Except (for), Aside/Apart from, Barring", type: "pre", category: "exception", meaning: "ngoại trừ", example: "Everyone came to the meeting except for John." },
    { id: 55, word: "Among, of all, of the", type: "pre", category: "other", meaning: "trong số", example: "The small house is hidden among the trees." },
    { id: 56, word: "According to (the), As per", type: "pre", category: "other", meaning: "theo như", example: "According to the forecast, it will rain tomorrow." },
    { id: 57, word: "As of/from", type: "pre", category: "time", meaning: "vào lúc, kể từ", example: "As of next month, the prices will increase." },
    { id: 58, word: "As if/though", type: "conj", category: "other", meaning: "như thể là/dường như là", example: "He looks as if he has seen a ghost." },
    { id: 59, word: "Within", type: "pre", category: "time", meaning: "(thời gian): trong vòng; (địa điểm): bên trong", example: "Please complete the task within two days." },
    { id: 60, word: "Without", type: "pre", category: "condition", meaning: "không có cái gì, ngoài cái đó", example: "I can't finish this project without your help." },
    { id: 61, word: "Providing/ provided (that) = as long as", type: "conj", category: "condition", meaning: "miễn là", example: "We will go provided that the weather is good." },
    { id: 62, word: "Rather than, As opposed to", type: "conj", category: "contrast", meaning: "thích làm gì hơn, thay vì", example: "I'd prefer to stay at home rather than go out." },
    { id: 63, word: "Up to", type: "pre", category: "other", meaning: "lên đến", example: "The new car can seat up to 5 people." },
    { id: 64, word: "As good as", type: "conj", category: "other", meaning: "hầu như, gần như", example: "The project is as good as finished." },
    { id: 65, word: "Between A and B", type: "conj", category: "other", meaning: "Giữa A và B", example: "Choose a number between 1 and 10." },
    { id: 66, word: "A together with, along with B", type: "conj", category: "addition", meaning: "A cùng vs B", example: "The manager, along with his staff, is attending the meeting." },
    { id: 67, word: "First ... and then", type: "conj", category: "time", meaning: "đầu tiên ... sau đó", example: "First, mix the flour, and then add some water." },
    { id: 68, word: "In favour of = in support of", type: "pre", category: "other", meaning: "để ủng hộ", example: "I am in favour of the new environmental policy." },
    { id: 69, word: "Ahead of", type: "pre", category: "time", meaning: "trước", example: "We arrived at the station ahead of schedule." },
    { id: 70, word: "Thanks to", type: "pre", category: "cause", meaning: "nhờ có, nhờ vào", example: "Thanks to your help, we succeeded." },
    { id: 71, word: "At all times = always", type: "pre", category: "time", meaning: "luôn luôn", example: "Please keep your seatbelt fastened at all times." },
    { id: 72, word: "Above", type: "pre", category: "other", meaning: "ở trên", example: "The plane flew high above the clouds." }
];

const quizData = [
    {
        id: 1,
        question: "The marketing seminar was postponed ________ a sudden power outage in the main conference hall.",
        options: ["because", "due to", "although", "even if"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Hội thảo tiếp thị đã bị hoãn lại <u>do</u> mất điện đột ngột ở sảnh hội nghị chính.<br><br><b>Phân tích:</b> Sau khoảng trống là một cụm danh từ <i>'a sudden power outage'</i>. <br>- <b>because, although, even if</b> là Liên Từ, theo sau là mệnh đề.<br>- <b>due to</b> là Giới Từ, theo sau là Cụm danh từ / V-ing.<br>👉 <b>Chọn B</b>"
    },
    {
        id: 2,
        question: "________ Mr. Carter has minimal experience in sales, he is a very quick learner and highly motivated.",
        options: ["Since", "Despite", "While", "Because of"],
        correctAnswer: 2,
        explanation: "<b>Dịch nghĩa:</b> <u>Mặc dù/Trong khi</u> ông Carter có rất ít kinh nghiệm bán hàng, ông ấy lại học hỏi rất nhanh và có động lực cao.<br><br><b>Phân tích:</b> Sau khoảng trống là một mệnh đề. Vậy loại <b>Despite</b> và <b>Because of</b>. <br>Xét về nghĩa, hai vế tương phản (ít kinh nghiệm >< học hỏi nhanh). Không dùng <b>Since</b>. <br><b>While</b> đóng vai trò nhượng bộ.<br>👉 <b>Chọn C</b>"
    },
    {
        id: 3,
        question: "Employees are required to submit their vacation requests ________ the end of this month.",
        options: ["prior to", "as soon as", "within", "during"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Nhân viên được yêu cầu nộp đơn xin nghỉ phép <u>trước</u> cuối tháng này.<br><br><b>Phân tích:</b> <br>- <b>prior to</b> = before (trước khi).<br>- <b>as soon as</b> đi với mệnh đề.<br>- <b>within</b> đi với khoảng thời gian.<br>- <b>during</b> đi với thời kỳ, sự kiện.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 4,
        question: "The new software is designed to automatically save your work ________ the system crashes unexpectedly.",
        options: ["in case", "unless", "in place of", "so that"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Phần mềm mới được thiết kế để tự động lưu công việc của bạn <u>phòng khi</u> hệ thống gặp sự cố bất ngờ.<br><br><b>Phân tích:</b> <br>- <b>in case</b> (+ Mệnh đề): phòng khi.<br>- <b>unless</b> (+ Mệnh đề): trừ khi.<br>- <b>in place of</b>: thay vì.<br>- <b>so that</b> (+ Mệnh đề): để mà.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 5,
        question: "The company plans to open a new branch in Tokyo ________ establishing a strong presence in Seoul.",
        options: ["in addition to", "not only", "therefore", "because"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Công ty dự định mở chi nhánh mới ở Tokyo <u>bên cạnh việc</u> thiết lập sự hiện diện tại Seoul.<br><br><b>Phân tích:</b> Phía sau là V-ing <i>'establishing'</i>. <br>- <b>in addition to</b> là giới từ, theo sau là Danh từ / V-ing.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 6,
        question: "All passengers must remain seated ________ the seatbelt sign is completely turned off by the pilot.",
        options: ["as if", "until", "during", "provided that"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Hành khách phải ngồi yên tại chỗ <u>cho đến khi</u> đèn báo dây an toàn được tắt hoàn toàn.<br><br><b>Phân tích:</b> <br>- <b>until</b> (+ Mệnh đề): cho đến khi. (Hợp nghĩa nhất).<br>👉 <b>Chọn B</b>"
    },
    {
        id: 7,
        question: "________ the terrible weather forecast, the outdoor music festival was a huge success.",
        options: ["Even though", "However", "Given", "In spite of"],
        correctAnswer: 3,
        explanation: "<b>Dịch nghĩa:</b> <u>Mặc dù</u> dự báo thời tiết tồi tệ, lễ hội âm nhạc vẫn thành công lớn.<br><br><b>Phân tích:</b> Sau khoảng trống là cụm danh từ.<br>- <b>In spite of</b> (+ Noun/V-ing): Mặc dù (Hợp ngữ pháp và nghĩa).<br>👉 <b>Chọn D</b>"
    },
    {
        id: 8,
        question: "Please make sure to review the contract carefully ________ signing it at the bottom.",
        options: ["after", "before", "while", "as"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Vui lòng đảm bảo xem xét hợp đồng cẩn thận <u>trước khi</u> ký tên ở phía dưới.<br><br><b>Phân tích:</b> Logic: 'xem kỹ' phải diễn ra 'trước khi' 'ký'. <br><b>before</b> đi kèm trực tiếp với V-ing.<br>👉 <b>Chọn B</b>"
    },
    {
        id: 9,
        question: "The CEO announced that the merger would go ahead ________ the current economic difficulties in the region.",
        options: ["because of", "regardless of", "in favor of", "according to"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Giám đốc điều hành thông báo việc sáp nhập sẽ tiến hành <u>bất chấp</u> khó khăn kinh tế hiện tại.<br><br><b>Phân tích:</b> <br>- <b>regardless of</b>: bất chấp. (Hợp nghĩa nhất).<br>👉 <b>Chọn B</b>"
    },
    {
        id: 10,
        question: "The candidate is highly qualified for the management position; ________, her salary expectations are much higher than our budget.",
        options: ["moreover", "therefore", "however", "consequently"],
        correctAnswer: 2,
        explanation: "<b>Dịch nghĩa:</b> Ứng viên này rất đủ tiêu chuẩn; <u>tuy nhiên</u>, mức lương kỳ vọng lại cao hơn ngân sách.<br><br><b>Phân tích:</b> Hai vế tương phản, cần <b>However</b> (tuy nhiên).<br>👉 <b>Chọn C</b>"
    },
    {
        id: 11,
        question: "________ the recent surge in demand, the factory will operate on weekends to fulfill all orders.",
        options: ["Due to", "Even if", "As if", "Instead of"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> <u>Do</u> sự gia tăng nhu cầu gần đây, nhà máy sẽ hoạt động vào cuối tuần để hoàn thành tất cả các đơn hàng.<br><br><b>Phân tích:</b> Sau chỗ trống là cụm danh từ 'the recent surge in demand'. <br>- <b>Due to</b>: do, bởi vì (+ Noun). Hợp lý.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 12,
        question: "You may use the company vehicle for personal errands, ________ you return it with a full tank of gas.",
        options: ["unless", "provided that", "so that", "whether"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Bạn có thể sử dụng xe của công ty cho việc cá nhân, <u>miễn là</u> bạn trả lại xe với bình xăng đầy.<br><br><b>Phân tích:</b> <br>- <b>provided that</b>: miễn là (+ Mệnh đề). Hợp nghĩa điều kiện.<br>👉 <b>Chọn B</b>"
    },
    {
        id: 13,
        question: "The manager delayed the meeting ________ everyone could attend the presentation.",
        options: ["so that", "because of", "during", "in spite of"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Người quản lý đã trì hoãn cuộc họp <u>để</u> mọi người có thể tham dự buổi thuyết trình.<br><br><b>Phân tích:</b> <br>- <b>so that</b>: để mà (+ Mệnh đề chỉ mục đích).<br>👉 <b>Chọn A</b>"
    },
    {
        id: 14,
        question: "________ having a limited budget, the team successfully launched the marketing campaign on time.",
        options: ["Because", "Although", "Despite", "While"],
        correctAnswer: 2,
        explanation: "<b>Dịch nghĩa:</b> <u>Mặc dù</u> có ngân sách hạn chế, nhóm đã triển khai thành công chiến dịch tiếp thị đúng hạn.<br><br><b>Phân tích:</b> Sau chỗ trống là V-ing 'having'.<br>- <b>Despite</b>: mặc dù (+ V-ing/Noun).<br>👉 <b>Chọn C</b>"
    },
    {
        id: 15,
        question: "Please keep all receipts ________ you wish to claim travel expenses later.",
        options: ["in case", "unless", "so as to", "despite"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Vui lòng giữ lại tất cả các biên lai <u>phòng khi</u> bạn muốn yêu cầu thanh toán chi phí đi lại sau này.<br><br><b>Phân tích:</b> <br>- <b>in case</b>: phòng khi (+ Mệnh đề).<br>👉 <b>Chọn A</b>"
    },
    {
        id: 16,
        question: "The new policy will be implemented next month; ________, all employees must attend a brief training session.",
        options: ["therefore", "however", "on the other hand", "nevertheless"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Chính sách mới sẽ được áp dụng vào tháng tới; <u>do đó</u>, tất cả nhân viên phải tham dự một buổi đào tạo ngắn.<br><br><b>Phân tích:</b> Chỉ mối quan hệ nhân quả. <b>Therefore</b> = Do đó.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 17,
        question: "________ we receive the final approval from the client, we cannot begin production.",
        options: ["Once", "Unless", "If", "When"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> <u>Trừ khi</u> chúng tôi nhận được sự chấp thuận cuối cùng từ khách hàng, chúng tôi không thể bắt đầu sản xuất.<br><br><b>Phân tích:</b> <br>- <b>Unless</b>: trừ khi (If not). Hợp nghĩa điều kiện phủ định.<br>👉 <b>Chọn B</b>"
    },
    {
        id: 18,
        question: "The software update was installed smoothly ________ any technical issues.",
        options: ["within", "without", "during", "about"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Bản cập nhật phần mềm đã được cài đặt suôn sẻ <u>mà không có</u> bất kỳ sự cố kỹ thuật nào.<br><br><b>Phân tích:</b> <br>- <b>without</b>: mà không có (+ Noun).<br>👉 <b>Chọn B</b>"
    },
    {
        id: 19,
        question: "________ the cost, the board of directors decided to proceed with the expansion project.",
        options: ["Regardless of", "Because of", "According to", "Instead of"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> <u>Bất chấp</u> chi phí, hội đồng quản trị đã quyết định tiến hành dự án mở rộng.<br><br><b>Phân tích:</b> <br>- <b>Regardless of</b>: bất chấp (+ Noun).<br>👉 <b>Chọn A</b>"
    },
    {
        id: 20,
        question: "You can either pay online ________ send a check by mail.",
        options: ["and", "or", "nor", "but"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Bạn có thể thanh toán trực tuyến <u>hoặc</u> gửi séc qua đường bưu điện.<br><br><b>Phân tích:</b> Cấu trúc tương quan <b>either ... or</b>.<br>👉 <b>Chọn B</b>"
    },
    {
        id: 21,
        question: "________ Mr. Smith nor Ms. Davis was available for a meeting yesterday.",
        options: ["Either", "Neither", "Both", "Not only"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> <u>Cả</u> ông Smith <u>lẫn</u> cô Davis đều không rảnh rỗi cho cuộc họp hôm qua.<br><br><b>Phân tích:</b> Cấu trúc tương quan <b>Neither ... nor</b>.<br>👉 <b>Chọn B</b>"
    },
    {
        id: 22,
        question: "The restaurant is famous ________ its excellent seafood and friendly service.",
        options: ["to", "with", "for", "about"],
        correctAnswer: 2,
        explanation: "<b>Dịch nghĩa:</b> Nhà hàng nổi tiếng <u>vì</u> hải sản tuyệt vời và dịch vụ thân thiện.<br><br><b>Phân tích:</b> Cấu trúc <b>be famous for</b>: nổi tiếng vì cái gì.<br>👉 <b>Chọn C</b>"
    },
    {
        id: 23,
        question: "________ you require further assistance, please do not hesitate to contact our customer support team.",
        options: ["Should", "Had", "Were", "If"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> <u>Nếu</u> bạn cần thêm hỗ trợ, xin đừng ngần ngại liên hệ với nhóm hỗ trợ khách hàng của chúng tôi.<br><br><b>Phân tích:</b> Đảo ngữ câu điều kiện loại 1: <b>Should + S + V(nguyên thể)</b> = If + S + V.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 24,
        question: "The instructions were ________ complicated that nobody could understand them.",
        options: ["too", "so", "such", "very"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Các hướng dẫn quá phức tạp <u>đến nỗi</u> không ai có thể hiểu được.<br><br><b>Phân tích:</b> Cấu trúc <b>so + adj/adv + that</b>: quá... đến nỗi mà.<br>👉 <b>Chọn B</b>"
    },
    {
        id: 25,
        question: "________ her busy schedule, she always makes time for her family.",
        options: ["Despite", "Although", "Because of", "Even if"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> <u>Mặc dù</u> lịch trình bận rộn, cô ấy luôn dành thời gian cho gia đình.<br><br><b>Phân tích:</b> Sau chỗ trống là cụm danh từ 'her busy schedule'.<br>- <b>Despite</b>: mặc dù (+ Noun).<br>👉 <b>Chọn A</b>"
    },
    {
        id: 26,
        question: "The project was completed ________ schedule thanks to the team's hard work.",
        options: ["ahead of", "front of", "prior", "before of"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Dự án đã hoàn thành <u>trước</u> thời hạn nhờ sự làm việc chăm chỉ của nhóm.<br><br><b>Phân tích:</b> Cụm từ <b>ahead of schedule</b>: trước thời hạn.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 27,
        question: "Please submit your report ________ Friday at the latest.",
        options: ["by", "until", "to", "at"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Vui lòng nộp báo cáo của bạn muộn nhất là <u>trước/vào</u> thứ Sáu.<br><br><b>Phân tích:</b> <b>by</b> + mốc thời gian: trước hoặc vào thời điểm đó (deadline).<br>👉 <b>Chọn A</b>"
    },
    {
        id: 28,
        question: "The store offers a wide variety of products, ________ electronics, clothing, and home goods.",
        options: ["including", "consisting", "containing", "involving"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> Cửa hàng cung cấp nhiều loại sản phẩm, <u>bao gồm</u> đồ điện tử, quần áo và đồ gia dụng.<br><br><b>Phân tích:</b> <b>including</b>: bao gồm (giới từ).<br>👉 <b>Chọn A</b>"
    },
    {
        id: 29,
        question: "________ to the manual, the device should be cleaned every week.",
        options: ["According", "Referring", "Relating", "Applying"],
        correctAnswer: 0,
        explanation: "<b>Dịch nghĩa:</b> <u>Theo</u> sách hướng dẫn, thiết bị nên được làm sạch mỗi tuần.<br><br><b>Phân tích:</b> Cụm từ <b>According to</b>: theo như.<br>👉 <b>Chọn A</b>"
    },
    {
        id: 30,
        question: "The new bridge will connect the island ________ the mainland.",
        options: ["with", "to", "and", "by"],
        correctAnswer: 1,
        explanation: "<b>Dịch nghĩa:</b> Cây cầu mới sẽ kết nối hòn đảo <u>với</u> đất liền.<br><br><b>Phân tích:</b> Cấu trúc <b>connect A to/with B</b>. Trong ngữ cảnh này 'to' thường được ưu tiên để chỉ điểm đến cố định.<br>👉 <b>Chọn B</b>"
    }
];

// Exporting for use in other files if needed, but since it's a simple setup, they will be attached to window globally when included via <script>
window.theoryData = theoryData;
window.quizData = quizData;
