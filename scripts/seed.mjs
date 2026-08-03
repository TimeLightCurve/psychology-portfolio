import nextEnv from "@next/env"
import { MongoClient } from "mongodb"

nextEnv.loadEnvConfig(process.cwd())

const now = new Date()
const navItems = [
  { label: "درباره دکتر", href: "/about", kind: "link", order: 1 },
  { label: "رزومه", href: "/#resume", kind: "link", order: 2 },
  { label: "خدمات", href: "/#services", kind: "services", order: 3 },
  { label: "تخصص ها", href: "/#expertise", kind: "link", order: 4 },
  { label: "مقالات", href: "/blog", kind: "link", order: 5 },
  { label: "رزرو وقت", href: "/#booking", kind: "link", order: 6 },
  { label: "تماس", href: "/contact", kind: "link", order: 7 },
]

const clinics = [
  { title: "مطب ونک", address: "تهران، ونک، خیابان ملاصدرا، ساختمان درمان، طبقه ۳", phone: "(03) 7023 4780", email: "talk@qpsychology.com.au", image: "/clinic-1.png", mapUrl: "", order: 1 },
  { title: "مطب سعادت آباد", address: "تهران، سعادت آباد، بلوار پاک نژاد، مرکز خدمات روانشناسی آوید", phone: "(03) 7023 4780", email: "talk@qpsychology.com.au", image: "/clinic-2.png", mapUrl: "", order: 2 },
  { title: "مطب پاسداران", address: "تهران، پاسداران، خیابان گلستان، مجموعه تخصصی مشاوره و درمان", phone: "(03) 7023 4780", email: "talk@qpsychology.com.au", image: "/clinic-3.png", mapUrl: "", order: 3 },
]

const socialLinks = [
  { label: "اینستاگرام", url: "#", order: 1 },
  { label: "لینکدین", url: "#", order: 2 },
]

const about = {
  title: "شقایق زارعی",
  subtitle: "روانشناس بالینی",
  content: "روانشناس بالینی با تمرکز بر ارزیابی، درمان و همراهی مراجعان در مسیر شناخت بهتر خود.",
  image: "/about-me.jpg",
  highlightTitle: "هدف من این است که بر سلامت روان و کیفیت زندگی شما اثر ماندگار و واقعی بگذارم.",
  highlightContent: "در جلسات درمانی من، اولویت با ایجاد فضایی امن، محترمانه و روشن برای شنیدن، فهمیدن و بازسازی تعادل روانی شماست. تمرکز من بر درمان فردی، خودشناسی عمیق و همراهی حرفه ای در مسیر تغییر پایدار است.",
}

const contact = {
  title: "تماس با ما",
  intro: "برای ثبت درخواست، رزرو نوبت یا دریافت اطلاعات بیشتر، فرم را تکمیل کنید یا با ما تماس بگیرید.",
  email: "talk@qpsychology.com.au",
  phone: "(03) 7023 4780",
  fax: "(03) 9492 5211",
  formTitle: "ارسال پیام آنلاین",
  formIntro: "هر زمان خواستید می‌توانید با ما در ارتباط باشید. خوشحال می‌شویم همراه شما باشیم.",
  locationsTitle: "کلینیکی نزدیک خود پیدا کنید",
}

const services = [
  {
    title: "خدمات روانشناسی عمومی",
    slug: "general-psychology",
    excerpt: "ارزیابی و روان درمانی فردی برای نوجوانان و بزرگسالان با تمرکز بر اضطراب، افسردگی، فرسودگی روانی و چالش های روزمره زندگی.",
    content: "ارزیابی و روان‌درمانی فردی با رویکردی امن، حرفه‌ای و متناسب با نیاز هر مراجعه‌کننده.",
    image: "/services/676116be0a25c97a4d6f4998_General-Psych-Services-small.webp",
    order: 1,
  },
  {
    title: "خدمات هویت و جنسیت",
    slug: "gender-service",
    excerpt: "همراهی تخصصی، محترمانه و امن برای مراجعانی که در مسیر شناخت هویت، بیان خود و مواجهه با فشارهای فردی و اجتماعی هستند.",
    content: "فضایی حمایتگر و بدون قضاوت برای شناخت هویت، بیان خود و مواجهه سالم‌تر با چالش‌های فردی و اجتماعی.",
    image: "/services/676116ea339443e863504781_Gender-Service-small.webp",
    order: 2,
  },
  {
    title: "ارزیابی های شناختی و تحصیلی",
    slug: "cognitive-assessments",
    excerpt: "ارزیابی دقیق عملکرد شناختی، توجه، حافظه و توانمندی های تحصیلی برای برنامه ریزی درمانی، آموزشی و تصمیم گیری بهتر.",
    content: "ارزیابی جامع توانمندی‌های شناختی و تحصیلی برای رسیدن به برنامه درمانی و آموزشی دقیق‌تر.",
    image: "/services/6761176f06814bcbbf9a700a_Cognitive-small.webp",
    order: 3,
  },
  {
    title: "برنامه های گروه درمانی",
    slug: "group-therapy",
    excerpt: "طراحی و اجرای گروه های درمانی و مهارت محور برای رشد فردی، تنظیم هیجان، بهبود ارتباط و تجربه حمایت جمعی موثر.",
    content: "گروه‌های درمانی و مهارت‌محور برای رشد فردی، تنظیم هیجان و تجربه حمایت جمعی مؤثر.",
    image: "/services/6761179506814bcbbf9a86be_Group-Therapy-small.webp",
    order: 4,
  },
  {
    title: "پژوهش و توسعه حرفه ای",
    slug: "research",
    excerpt: "تمرکز مداوم بر مطالعه، به روزرسانی علمی و استفاده از رویکردهای مبتنی بر شواهد برای ارائه خدمات درمانی دقیق تر و موثرتر.",
    content: "مطالعه مستمر و استفاده از رویکردهای مبتنی بر شواهد برای ارائه خدمات دقیق‌تر و مؤثرتر.",
    image: "/services/676117c3574e2fcf988919ec_Our-Research-small.webp",
    order: 5,
  },
]

const blogs = [
  {
    title: "ذهن‌آگاهی واقعاً چیست؟", slug: "what-is-mindfulness", category: "ذهن‌آگاهی",
    excerpt: "نگاهی ساده و کاربردی به ذهن‌آگاهی و اینکه چگونه می‌تواند در زندگی روزمره به ما کمک کند.",
    content: "ذهن‌آگاهی یعنی توجه آگاهانه به تجربه اکنون، بدون قضاوت عجولانه. این مهارت به معنای خالی کردن ذهن یا همیشه آرام بودن نیست؛ بلکه تمرینی برای دیدن افکار، احساسات و حس‌های بدنی با وضوح بیشتر است.\n\nبا تمرین منظم، فاصله کوچکی میان تجربه و واکنش ایجاد می‌شود. همین فاصله می‌تواند به انتخاب پاسخ‌هایی انعطاف‌پذیرتر کمک کند. می‌توانید از چند دقیقه توجه به تنفس، صداهای محیط یا حس تماس پاها با زمین شروع کنید.\n\nهدف، انجام بی‌نقص تمرین نیست. هر بار که متوجه سرگردانی ذهن می‌شوید و با مهربانی توجه را بازمی‌گردانید، در حال تقویت همین توانایی هستید.",
    image: "/services/676116be0a25c97a4d6f4998_General-Psych-Services-small.webp", authorName: "شقایق زارعی", authorRole: "روانشناس بالینی", authorImage: "/about-me.jpg", publishedAt: "۱۴۰۵/۰۵/۱۲", order: 1,
  },
  {
    title: "چطور با اضطراب روزمره کنار بیاییم؟", slug: "coping-with-everyday-anxiety", category: "اضطراب",
    excerpt: "چند راهکار مبتنی بر شواهد برای شناخت چرخه اضطراب و بازگرداندن احساس کنترل.",
    content: "اضطراب بخشی طبیعی از سیستم هشدار بدن است، اما گاهی شدت یا تداوم آن زندگی روزمره را دشوار می‌کند. اولین قدم، تشخیص نشانه‌های بدنی و موقعیت‌هایی است که چرخه نگرانی را فعال می‌کنند.\n\nتنفس آهسته، نام‌گذاری احساس، کاهش اجتناب و تقسیم کارها به قدم‌های کوچک می‌تواند کمک‌کننده باشد. اگر اضطراب مداوم است یا بر خواب، روابط و عملکرد شما اثر می‌گذارد، گفت‌وگو با درمانگر می‌تواند مسیر روشن‌تری فراهم کند.",
    image: "/services/6761176f06814bcbbf9a700a_Cognitive-small.webp", authorName: "شقایق زارعی", authorRole: "روانشناس بالینی", authorImage: "/about-me.jpg", publishedAt: "۱۴۰۵/۰۴/۲۸", order: 2,
  },
  {
    title: "مرزهای سالم در روابط", slug: "healthy-boundaries", category: "روابط",
    excerpt: "مرز سالم چیست و چگونه می‌توانیم نیازهایمان را روشن، محترمانه و بدون احساس گناه بیان کنیم؟",
    content: "مرزها قوانین خشک برای دور نگه داشتن دیگران نیستند؛ آن‌ها راهی برای روشن کردن نیازها، ظرفیت‌ها و مسئولیت‌های ما هستند. مرز سالم هم به خودمان احترام می‌گذارد و هم امکان ارتباط شفاف‌تر را ایجاد می‌کند.\n\nبیان مرز با جمله‌های روشن، تمرکز بر رفتار مشخص و ثبات در پیگیری آن آسان‌تر می‌شود. احساس ناراحتی اولیه طبیعی است و الزاماً نشانه اشتباه بودن تصمیم شما نیست.",
    image: "/services/6761179506814bcbbf9a86be_Group-Therapy-small.webp", authorName: "شقایق زارعی", authorRole: "روانشناس بالینی", authorImage: "/about-me.jpg", publishedAt: "۱۴۰۵/۰۴/۰۹", order: 3,
  },
]

for (const service of services) {
  Object.assign(service, {
    supportTitle: "حمایت شخصی‌سازی‌شده برای سلامت روان و بهزیستی",
    supportIntro: "درمانگر شما با همکاری خودتان، رویکردی متناسب با هویت، فرهنگ، ویژگی‌های فردی و تجربه زیسته شما طراحی می‌کند. مراقبت ما همدلانه، فراگیر و مبتنی بر شواهد است.",
    supportItems: [
      { title: "روانشناسی کودک و نوجوان", content: "ارزیابی و حمایت تخصصی برای کودکان و نوجوانان با توجه به نیازهای رشدی، هیجانی، خانوادگی و تحصیلی آن‌ها." },
      { title: "خدمات روانشناسی بزرگسالان", content: "همراهی بزرگسالان در مدیریت اضطراب، افسردگی، فرسودگی، تغییرات زندگی و چالش‌های ارتباطی." },
      { title: `خدمات درمانی ${service.title}`, content: service.excerpt },
      { title: "درمان تروما و اختلال استرس پس از سانحه", content: "رویکردی ایمن و مرحله‌بندی‌شده برای پردازش تجربه‌های دشوار، کاهش نشانه‌ها و بازیابی احساس کنترل." },
    ],
    infoTitle: "خدمات حمایتی",
    infoContent: "هدف ما دسترسی ساده‌تر به مراقبت روان‌شناختی باکیفیت است. برنامه درمان با توجه به شرایط، اهداف و سرعت مناسب شما تنظیم می‌شود و می‌تواند به‌صورت حضوری یا آنلاین ادامه پیدا کند.",
    treatmentsTitle: "درمان‌های رایج",
    treatments: [
      { title: "درمان شناختی رفتاری (CBT)", content: "شناخت ارتباط میان افکار، احساسات و رفتارها و تمرین مهارت‌های عملی برای ایجاد تغییر پایدار." },
      { title: "درمان مبتنی بر پذیرش و تعهد (ACT)", content: "تقویت انعطاف‌پذیری روان‌شناختی، پذیرش تجربه‌های دشوار و حرکت در مسیر ارزش‌های شخصی." },
      { title: "طرحواره‌درمانی", content: "شناخت الگوهای عمیق و تکرارشونده و ایجاد راه‌های سالم‌تر برای پاسخ به نیازهای هیجانی." },
      { title: "EMDR", content: "رویکردی ساختاریافته برای پردازش خاطرات آزاردهنده و کاهش فشار هیجانی مرتبط با آن‌ها." },
      { title: "هیپنوتیزم بالینی", content: "استفاده درمانی و هدفمند از تمرکز عمیق برای حمایت از فرایند تغییر، در صورت تناسب با نیاز مراجعه‌کننده." },
      { title: "زوج‌درمانی", content: "کمک به زوج‌ها برای بهبود ارتباط، حل تعارض و ساختن درک و امنیت بیشتر در رابطه." },
    ],
    ctaTitle: `رزرو نوبت ${service.title}`,
    ctaContent: "برای شروع آماده‌اید؟ برای بررسی گزینه‌های حضوری و آنلاین با ما در ارتباط باشید تا مناسب‌ترین مسیر را با هم انتخاب کنیم.",
    ctaLabel: "ارتباط برای رزرو نوبت",
    ctaHref: "/contact",
  })
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing")
const client = new MongoClient(process.env.MONGODB_URI)

async function upsertMany(collectionName, items, key) {
  const collection = client.db(process.env.MONGODB_DB || "psychology_portfolio").collection(collectionName)
  for (const item of items) {
    await collection.updateOne(
      { [key]: item[key] },
      { $set: { ...item, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true },
    )
  }
  return collection.countDocuments()
}

async function upsertSingleton(collectionName, item) {
  const collection = client.db(process.env.MONGODB_DB || "psychology_portfolio").collection(collectionName)
  const current = await collection.findOne({})
  if (current) await collection.updateOne({ _id: current._id }, { $set: { ...item, updatedAt: now } })
  else await collection.insertOne({ ...item, createdAt: now, updatedAt: now })
  return collection.countDocuments()
}

try {
  await client.connect()
  const counts = {
    navItems: await upsertMany("navItems", navItems, "label"),
    clinics: await upsertMany("clinics", clinics, "title"),
    services: await upsertMany("services", services, "slug"),
    blogs: await upsertMany("blogs", blogs, "slug"),
    socialLinks: await upsertMany("socialLinks", socialLinks, "label"),
    about: await upsertSingleton("about", about),
    contact: await upsertSingleton("contact", contact),
  }
  console.log("Seed complete", counts)
} finally {
  await client.close()
}
