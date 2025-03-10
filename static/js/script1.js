import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbNXaBjr2FVNN3nC4W8CUa9DlQwR2D87s",
    authDomain: "csas-158fc.firebaseapp.com",
    databaseURL: "https://csas-158fc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "csas-158fc",
    storageBucket: "csas-158fc.firebasestorage.app",
    messagingSenderId: "763041820862",
    appId: "1:763041820862:web:c11981b07960e91ece6eef",
    measurementId: "G-26BMZST2LE"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let sentimentChartInstance = null;
let feedbackChartInstance = null;

// **Updated Aspects Object**
const aspects = {
    positive: {
        // Price-related aspects
        "Great Value for Money": [
            // English terms
            "affordable", "value for money", "great price", "cheap", "worth the price",
            "budget-friendly", "cost-effective", "economical", "reasonable", "low-cost",
            "practical", "bang for the buck", "wise investment", "husto sa presyo", "presyong makatarunganon",

            // Tagalog words
            "sulit", "mura", "matipid", "presyong abot-kaya", "magandang halaga",
            "halaga", "abot-kaya", "praktikal", "murang-mura", "hindi magastos",
            "tipid na tipid", "matipid gamitin", "hindi sayang ang pera", "presyong sulit",
            "magandang deal", "makatotohanang presyo", "mura pero maganda", "tama ang presyo",
            "di magastos", "hindi overpriced", "katamtamang presyo", "presyong swak sa budget",
            "di nasayang ang pera", "walang halong patong", "pinakamurang halaga", "budget-wise",

            // Bisaya words
            "barato", "dili mahal", "kasaligan nga presyo", "angay sa kantidad", "presyong sakto",
            "tipid", "hustong presyo", "dako’g bili", "makatipid", "maayong presyo",
            "presyo nga patas", "dili pagpangwarta", "walay patong", "walay labis", "dili gasto",
            "baratohon", "presyong saktong kantidad", "walay sayang", "di mahal pero nindot",
            "sulit nga presyo", "presyong di maka-alkansi", "maayong pagpamalit", "presyong pang-masa",
            "swak sa bulsa", "angay nga presyo", "mubo nga presyo pero taas ug kalidad",
            "dili palpak", "pinasubing presyo", "dili pagsayang sa kwarta"
        ],


        "Ideal Location": [
            // English
            "great location", "convenient location", "near attractions", "accessible", "close to beach",

            // Tagalog
            "magandang lokasyon", "napakagandang pwesto", "malapit sa pasyalan", "madaling puntahan", "accessible sa lahat",
            "malapit sa dagat", "malapit sa mall", "madaling hanapin", "strategic location", "nasa sentro",
            "walang kahirap-hirap", "walang abala", "tamang lokasyon", "hindi mahirap puntahan", "malapit sa transportasyon",
            "malapit sa palengke", "malapit sa terminal", "malapit sa daanan", "perpektong lokasyon", "walang sagabal",
            "madaling mapuntahan", "lapit lang sa tourist spots", "tamang distansya", "walang abala sa biyahe", "sentral na lokasyon",
            "nasa puso ng lungsod", "sakto ang layo", "malapit sa convenience store", "malapit sa kainan", "nasa main road",

            // Bisaya
            "nindot nga lokasyon", "sayon pangitaon", "duol sa pasyalan", "madali ra adtuon", "accessible sa tanan",
            "duol sa dagat", "duol sa mall", "dali ra maadto", "tama ang pwesto", "duol sa estasyon",
            "walay hasol", "walay samok", "duol sa sakayan", "duol sa sentro", "duol sa merkado",
            "dali ra maagian", "duol sa terminal", "nindot ang posisyon", "hustong lokasyon", "walay kalisod pangitaon",
            "duol sa mga atraksyon", "sayon ra adtuon", "sulod sa lungsod", "lapit sa main road", "walay problema sa biyahe",
            "walay liblib", "tamang gilay-on", "accessible bisan asa", "duol sa kainan", "naay transportasyon"
        ],


        // Security-related aspects
        "Safe and Secure": [
            // Existing words
            "safe environment", "secure place", "well-guarded", "security personnel available",
            "protected", "risk-free", "shielded", "defended", "well-protected", "peaceful",
            "fortified", "guarded", "unharmed", "insured", "stronghold", "shelter",
            "watchful", "monitored", "alarmed", "locked-down", "trustworthy", "hazard-free",
            "crime-free", "supervised", "surveillance-covered", "assured", "sealed",
            "well-secured", "controlled access", "restriction-enforced",

            // Additional Tagalog words (30)
            "ligtas", "segurado", "tiyak", "walang panganib", "walang takot", "walang duda",
            "matibay", "matatag", "mapayapa", "tahimik", "maingat", "maasahan", "hindi delikado",
            "protektado", "may bantay", "walang gulo", "mahigpit na seguridad", "may guwardiya",
            "siguradong protektado", "walang krimen", "matatag na lugar", "hindi mapanganib",
            "maingat na binabantayan", "walang nakawan", "secured na entrance", "ligtas na tirahan",
            "walang gulo", "hindi magulo", "garantisadong kaligtasan", "may CCTV coverage",
            "binabantayan 24/7",

            // Additional Bisaya words (30)
            "huwas", "libreng hulga", "kaluwasan", "walay peligro", "gikan sa katalagman",
            "pinangga", "giluwas", "dili kuyaw", "komportable", "walay kahadlok", "kasaligan",
            "lig-on", "luwas sa kadaot", "walay kawat", "walay kriminalidad", "hugot nga seguridad",
            "walay kapeligro", "gibantayan", "gitutokan", "walay samok", "permanente nga proteksyon",
            "hugot nga bantay", "safety first", "walay hulga sa gawas", "giatiman sa seguridad",
            "secure nga sulod", "naka-lock ang pultahan", "walay mga dautang elemento",
            "hugot nga proteksyon", "naka-alarma", "masaligan nga seguridad"
        ],

        // Service-related aspects
        "High Standard of Services": [
            "excellent service", "professional staff", "efficient", "well-trained", "attentive",
            "maalaga", "maalalahanin", "mahusay na serbisyo", "magalang na empleyado", "propesyonal",
            "mapagkakatiwalaan", "mabilis ang serbisyo", "eksperto", "matulungin", "masipag",
            "magiliw", "maalaga sa customer", "maayos ang pakikitungo", "tapat sa trabaho", "palangiti",
            "walang reklamo", "dedikado sa trabaho", "hindi pabaya", "maalalay", "mabilis mag-asikaso",
            "mahusay mag-alaga", "may malasakit", "alerto ang staff", "palakaibigan", "puno ng sigla",
            "mahusay humawak ng customer", "hindi bastos", "magalang sa bisita", "puno ng integridad",
            "nagbibigay ng VIP treatment", "seryoso sa trabaho", "napaka-mahusay sa serbisyo",
            "buotan", "maayong pag-atiman", "gwapo nga serbisyo", "hospitable", "maalaga nga staff",
            "paspas ug masaligan", "maalam nga empleyado", "gwapo ang pagserbisyo", "buotan ug matinabangon",
            "kasaligan nga staff", "dali motabang", "walay hasol", "gwapo nga atensyon", "kamao sa trabaho",
            "mainiton og pagdawat", "dali lapitan", "gwapo og relasyon sa bisita", "dili tapolan",
            "maayong pagdumala", "maalalahanin sa panginahanglan", "kusog ug buhat", "wala'y reklamo",
            "alerto ug sigurado", "way makalupig sa serbisyo", "paspas ug alerto", "kasaligan sa trabaho",
            "dali motabang ug motagad", "seryoso sa pagserbisyo", "malipayon nga staff"
        ],

        // Reputation-related aspects
        "Good Reputation": [
            "top-rated", "highly recommended", "popular choice", "well-reviewed",
            "sikat", "kilala", "maganda ang reputasyon", "pinagkakatiwalaan", "matibay ang pangalan",
            "palaging nirerekomenda", "hindi tinatawaran", "malakas sa publiko", "tanyag", "pinipilahan",
            "walang bahid ng reklamo", "mataas ang ratings", "pinag-uusapan", "patok sa lahat", "maraming bumabalik",
            "subok na", "hinahangaan", "mataas ang credibility", "hindi lumulubog ang pangalan", "iniidolo",
            "siguradong sulit", "hindi naluluma", "maaasahan", "kinikilala", "hindi bumabagsak sa rankings",
            "magandang feedback", "hindi madalas ireklamo", "nire-rate ng mataas",

            "ilado", "sikat nga pagpuy-anan", "daghang good reviews", "daghan og suki", "malig-on nga reputasyon",
            "kanunay nga girekomenda", "wala’y samok", "walay bahid nga daotan", "kasaligan", "kanunay nga nindot",
            "daghang musalig", "daghang nibalik", "nahibaloan sa tanan", "nindot nga kasinatian", "daghan og pabor",
            "paborito sa daghan", "walay reklamo", "malampuson", "puno og maayong feedback", "daghang mo-endorso",
            "di malubong ang pangalan", "buhi sa kustomer", "dili maguba ang pangalan", "kanunay top-rated",
            "maayong serbisyo", "gipili sa kadaghanan", "maka-ila tanan", "naa sa top list", "wala’y pagmahay",
            "daghang awards", "gihigugma sa tanan"
        ],

        // Atmosphere-related aspects

        "Relaxing Atmosphere": [
            // English
            "relaxing atmosphere", "peaceful environment", "calm place", "unwind", "tranquil setting",
            "serene surroundings", "soothing ambiance", "quiet retreat", "stress-free zone", "pleasant vibes",
            "laid-back", "chill environment", "harmonious place", "comfortable setting", "peaceful getaway",
            "cozy and quiet", "nature-filled serenity", "meditative space", "soothing breeze", "refreshing environment",
            "private and quiet", "comforting silence", "gentle sounds of nature", "warm and welcoming", "spiritually calming",
            "perfect for relaxation", "cool and breezy", "secluded and peaceful", "escape from stress", "ultimate relaxation spot",

            // Tagalog
            "nakakapag-relax na kapaligiran", "mapayapang paligid", "tahimik na lugar", "makakapagpahinga", "payapang kapaligiran",
            "preskong hangin", "kaaya-ayang lugar", "malamig at presko", "tahimik na tanawin", "mapanatag na pakiramdam",
            "malamig at maaliwalas", "payapang bakasyon", "komportableng kapaligiran", "walang ingay", "malayo sa gulo",
            "swak sa pagpapahinga", "malayo sa stress", "preskong hangin ng probinsya", "katahimikan ng dagat", "matining na himig ng kalikasan",
            "tahimik na kanlungan", "preskong bundok", "payapang resort", "banayad na paligid", "gandang likas",
            "nakakaaliw na tanawin", "nakakaginhawang lugar", "maliwanag at payapa", "sariwang simoy ng hangin", "banayad na hampas ng alon",

            // Bisaya
            "hayahay nga palibot", "malinawon nga dapit", "hilom nga lugar", "makapahupay", "makapawala sa stress",
            "preskong hangin", "hilum ug malinawon", "lapad nga kahilom", "maanyag nga palibot", "wala’y samok",
            "sobra ka hayahay", "bugnaw nga dapit", "pasilong sa kalinaw", "natural nga palibot", "maka-relax nga lugar",
            "nindot nga tan-awon", "hilum nga kahayahay", "bugnaw nga hangin", "kasilyo nga palibot", "layo sa kasaba",
            "tul-id nga kalinaw", "natural nga katahimikan", "hilum ug humok", "presko ug limpyo", "maminaw sa dagat",
            "walay samok nga palibot", "bugnaw nga lugar", "presko nga kahoy", "malinawon nga balay-pahulayan", "presko nga kapinuy-an"
        ],


        // Cleanliness-related aspects
        "Clean and Well-Maintained": [
            // English
            "clean facilities", "well-maintained", "neat rooms", "tidy", "spotless", "hygienic",
            "sanitary", "fresh-smelling", "organized", "dust-free", "well-kept", "pristine",
            "orderly", "immaculate", "germ-free", "disinfected", "refreshing atmosphere",
            "polished", "well-groomed", "cleaned daily", "clutter-free", "properly sanitized",
            "no bad odor", "proper waste disposal", "fresh linens", "maintained regularly",
            "deep cleaned", "clean restrooms", "clean and bright", "no visible dirt",

            // Tagalog
            "malinis", "maayos", "maaliwalas", "walang alikabok", "malinis na kwarto", "maaliwalas na paligid",
            "walang baho", "mahusay ang pangangalaga", "walang basura", "hindi magulo", "walang amag",
            "mabango", "maayos na palikuran", "malinis na tubig", "walang kalat", "banayad ang amoy",
            "madalas nililinis", "hindi marumi", "walang insekto", "hindi mabaho", "maingat na nililinis",
            "maayos na gamit", "organisado", "maayos na sahig", "walang masangsang na amoy",
            "matingkad ang linis", "walang dumi", "laging disimpektado", "walang bakas ng dumi",

            // Bisaya
            "limpyo", "natarong", "wala’y abog", "limpyo nga kwarto", "humot", "walay hugaw",
            "dili gubot", "tarong ug atiman", "limpyo ang kasilyas", "nindot ug kahimtang",
            "walay baho", "dili hugaw", "nindot tan-awon", "bag-o ug limpyo", "limpyo ang kusina",
            "walay hugaw sa salog", "permi gilimpyohan", "walay hugaw nga baho", "dili samok",
            "walay sagbot", "tarong nga pag-atiman", "walay hugaw sa bintana", "way hugaw sa kasilyas",
            "limpyo nga banyo", "walay labhan nga baho", "organisado nga gamit", "maayong panglimpyo",
            "klaro nga limpyo", "walay hugaw sa dingding", "tarong nga gilimpyohan"
        ],

        // Staff-related aspects
        "Friendly and Professional Staff": [
            // English
            "friendly staff", "helpful staff", "polite staff", "welcoming staff",
            "courteous staff", "professional employees", "attentive service", "cheerful personnel",
            "kind and caring staff", "approachable workers", "excellent customer service", "accommodating employees",
            "warm and hospitable", "respectful team", "fast and efficient service", "well-trained staff",
            "smiling employees", "dedicated staff", "service-oriented team", "customer-friendly workers",
            "responsive personnel", "good communication skills", "understanding and patient staff",
            "always willing to help", "pleasant and engaging", "knowledgeable employees",
            "proactive staff", "great attitude", "caring and thoughtful", "always available for assistance",

            // Tagalog
            "palakaibigang staff", "matulunging empleyado", "magalang na tauhan", "mapagpatuloy na staff",
            "magalang na empleyado", "propesyonal na manggagawa", "maasikasong serbisyo", "masayahing tauhan",
            "mabait at maalaga", "madaling lapitan", "mahusay sa serbisyo", "maunawaing empleyado",
            "mainit na pagtanggap", "magalang at magiliw", "mabilis at mahusay", "sanay na kawani",
            "palangiti ang empleyado", "dedikadong staff", "serbisyong naka-tuon sa kliyente",
            "madaling kausap", "palakaibigan at masayahin", "mahusay makitungo", "mabilis tumugon",
            "laging handang tumulong", "maalalahanin at mabait", "mabuting asal", "palaging nakangiti",
            "mabuting komunikasyon", "maalaga at maasikaso", "handang sumagot sa tanong",

            // Bisaya
            "buotan nga staff", "tabian nga empleyado", "magbaba nga tauhan", "mainitong pagdawat",
            "maayong pagkatawo", "propesyonal nga mga trabahante", "maalaga ug matinabangon",
            "maayong serbisyo", "masaligan nga kawani", "mainit nga pagtagad", "maalagang tauhan",
            "mahigalaon ug paspas", "maayong pangserbisyo", "madaling duolon", "smiling personnel",
            "madasigon nga staff", "kalma ug pasensyoso", "alerto sa trabaho", "malumanay makigstorya",
            "dedikado sa serbisyo", "maalalahanin ug matinabangon", "mapinanggaon nga empleyado",
            "laging andam motabang", "maayong pamatasan", "dali masabtan", "maalamon sa trabaho",
            "mainit nga pagdawat", "nagpaabot ug tabang", "higalaay nga serbisyong", "tinud-anay nga pagtabang"
        ],

        // Facility-related aspects
        "Excellent Facilities": [
            // English
            "great facilities", "modern amenities", "spacious pool", "comfortable lounges",
            "well-maintained", "fully equipped", "high-end facilities", "state-of-the-art",
            "luxurious", "top-notch", "world-class", "high-quality", "clean and well-kept",
            "organized", "ample space", "functional", "efficient layout", "aesthetic design",
            "convenient setup", "cozy atmosphere", "premium features", "good ventilation",
            "child-friendly", "pet-friendly", "tech-integrated", "easy access", "well-structured",
            "fully functional", "excellent condition", "modern architecture", "safe and secure",

            // Tagalog
            "magandang pasilidad", "makabagong gamit", "malawak na pool", "kumportableng upuan",
            "maayos na pasilidad", "kompleto sa kagamitan", "de-kalidad", "makabago",
            "marangya", "pang-mayaman", "pang-international", "mataas na kalidad", "malinis at maayos",
            "organisado", "maluwag", "functional", "maayos ang pagkakaayos", "magandang disenyo",
            "maginhawang paligid", "premium na gamit", "maaliwalas", "pangpamilya", "para sa bata",
            "pet-friendly", "high-tech", "madaling gamitin", "matibay", "malinis", "modernong istruktura",
            "ligtas at maaasahan",

            // Bisaya
            "nindot nga pasilidad", "bag-ong gamit", "lapad nga pool", "komportableng lingkoranan",
            "himsog nga pasilidad", "kumpleto nga kahimanan", "de-kalidad nga pasilidad",
            "bag-ong teknolohiya", "luho", "sosyal", "pang-international nga kalidad",
            "nindot ug limpyo", "organisado", "lapad ug walay samok", "epektibo",
            "maayo ang disenyo", "lapad ug komportable", "nindot nga setup", "nindot nga ambiance",
            "daghang gamit", "presko ug maaliwalas", "pangpamilya", "para sa bata", "alagang hayop puyde",
            "modernong teknolohiya", "dali ra gamiton", "lig-on", "humot ug limpyo", "nindot nga building",
            "sigurado ug luwas"
        ],

        // Aesthetic-related aspects
        "Aesthetic and Scenic Beauty": [
            // English
            "beautiful beach", "stunning scenery", "gorgeous sunset", "Instagram-worthy",
            "breathtaking view", "picturesque", "majestic mountains", "serene landscape", "crystal-clear water",
            "vibrant colors", "scenic paradise", "charming surroundings", "stunning skyline", "lush greenery",
            "postcard-perfect", "tranquil beauty", "stunning cliffs", "captivating view", "pristine nature",
            "gorgeous resort", "tropical paradise", "peaceful horizon", "magnificent sunrise", "heavenly view",
            "paradise on earth", "impressive architecture", "natural wonders", "mesmerizing waterfall",
            "idyllic setting", "dreamlike scenery", "lush gardens", "enchanting vibe",

            // Tagalog
            "magandang dalampasigan", "nakamamanghang tanawin", "napakagandang paglubog ng araw", "pang-Instagram",
            "kaakit-akit na tanawin", "magandang paligid", "kahanga-hangang bundok", "payapang tanawin", "malinaw na tubig",
            "makulay na tanawin", "paraíso ng kalikasan", "kaakit-akit na kapaligiran", "magandang tanawin ng lungsod",
            "luntiang kagubatan", "perpektong tanawin", "payapang kagandahan", "magagandang talampas", "nakakabighaning tanawin",
            "di-nasiralang kalikasan", "magandang resort", "tropikal na paraíso", "mapayapang tanawin", "napakagandang pagsikat ng araw",
            "langit sa lupa", "kamangha-manghang arkitektura", "likas na yaman", "nakakaakit na talon", "perpektong lugar",
            "parang panaginip", "mabulaklak na hardin", "kaakit-akit na lugar",

            // Bisaya
            "nindot nga baybayon", "makapahinganghang tan-awon", "gwapong pagsalop sa adlaw", "Instagrammable",
            "nindot nga tan-awon", "gwapa nga palibot", "katingalahang bukid", "himsog nga talan-awon", "klaro nga tubig",
            "matahom nga kolor", "paraíso sa kinaiyahan", "makanindot nga palibot", "nindot nga skyline", "lunhaw nga kakahoyan",
            "hustong tan-awon", "kalma nga katahum", "matahom nga pangpang", "makabibihag nga tan-awon", "presko nga kinaiyahan",
            "nindot nga resort", "paraiso nga isla", "matahom nga panglantaw", "makahinumdom nga pagsubang sa adlaw",
            "langit sa yuta", "talagsaong arkitektura", "natural nga katahum", "makapahinganghang busay", "himsog nga kahayag",
            "pahalipay nga talan-awon", "kahibulongang lugar", "pinasahi nga kagwapo"
        ]
    },
    negative: {
        // Service-related issues
        "Slow Service": [
            "slow service", "poor service", "delayed service", "rude service",
            "hinay nga serbisyo", "hinay ang pagserbisyo", "dugay ang order", "malaay nga serbisyo",
            "dugay ang pagserbisyo", "bad service", "walay pag-atiman", "di maayo ang serbisyo",
            "tamad nga staff", "tamad nga empleyado", "tagal ng response", "dugay mo-reply",
            "bug-at ang pagserbisyo", "hinay nga pagdawat", "walay pagtagad", "ginapabay-an",
            "bagal ng kilos", "matagal ang proseso", "dili responsive", "sobra ka hinay",
            "not attentive", "late response", "kulang sa training", "mabagal ang order"
        ],

        "Long Wait Times": [
            // English
            "long wait", "took too long", "slow food service", "long queue", "waited forever",
            "endless waiting", "time-consuming", "delayed service", "slow response", "not punctual",
            "lengthy delay", "poor time management", "always waiting", "never on time", "lagging service",
            "service takes ages", "never-ending queue", "excessive wait", "kept waiting", "not fast enough",
            "incredibly slow", "too much waiting", "waiting with no update", "wasting time", "line takes forever",
            "slow moving queue", "wait time is frustrating", "delayed beyond reason", "too sluggish", "service drag",

            // Tagalog
            "matagal maghintay", "masyadong matagal", "mabagal ang serbisyo", "mahaba ang pila", "parang walang katapusan",
            "ubos na ang oras sa paghihintay", "matagal ang proseso", "lagi nang huli", "kulang sa bilis", "walang update",
            "palaging delayed", "masyadong mabagal", "parang isang dekada ang hintay", "hindi epektibo ang serbisyo",
            "hindi natutugunan agad", "parang hindi gumagalaw", "walang aksyon agad", "sobrang bagal", "hindi priority ang customers",
            "sayang ang oras", "hindi agad napapansin", "puro hintay", "walang katiyakan ang oras", "lagi nangantay",
            "serbisyo parang pagong", "parang walang nag-aasikaso", "hindi priority ang bilis", "mas matagal pa sa normal",
            "mahabang paghihintay", "hindi sulit sa oras",

            // Bisaya
            "dugay kaayo", "pirmi maghulat", "hinay kaayo ang serbisyo", "taas kaayo ang linya", "walay klaro ang oras",
            "murag forever maghulat", "wala pa gihapon", "paspas ang oras, pero hinay sila", "pirmi delay", "kas daghan ug pasensya",
            "hinay murag pagong", "serbisyo hinay pa sa tukô", "dugay kaayo muabot ang order", "way update sa among request",
            "daghan kaayo ug backlog", "pirme lang ta maghulat", "dugay kaayo motagad", "wala pay klaro ang serbisyo",
            "daghan pa diay ug processing", "sige lang hulat walay kalampusan", "walay klaro ang sistema", "di maayo ang time management",
            "hinay ug pamaagi", "murag wa naglihok", "hinay murag natulog", "gihilantan ang serbisyo", "kusog lang sa saad pero dugay motuman",
            "taas pa sa highway ang hulat", "hinay mura’g wa nay plano", "naghulat hangtod kapoyon"
        ],

        "Poor Service Standards": [
            // English
            "bad service", "unprofessional staff", "unhelpful employees", "rude staff", "no greeting",
            "ignored by staff", "staff always mad", "poor customer service", "impolite workers", "staff doesn't care",
            "slow response", "disrespectful attitude", "no assistance", "staff not approachable", "lack of hospitality",
            "does not listen", "no proper handling", "delayed response", "lazy employees", "staff avoids eye contact",
            "unaccommodating", "keeps customers waiting", "staff not smiling", "careless handling", "disorganized service",
            "no sense of urgency", "untrained personnel", "keeps forgetting orders", "does not follow up", "staff arguing with customers",

            // Tagalog
            "masamang serbisyo", "hindi propesyonal ang staff", "hindi matulungin ang empleyado", "bastos na staff", "walang bati",
            "hindi pinapansin ng staff", "laging galit ang staff", "mahinang serbisyo", "hindi maayos kausap", "walang malasakit",
            "mabagal sumagot", "bastos ang ugali", "walang tumutulong", "hindi approachable", "kulang sa pag-aalaga",
            "hindi marunong makinig", "walang tamang paghawak", "matagal sumagot", "tamad ang empleyado", "iniiwasan ang tingin",
            "hindi palakaibigan", "pinaghihintay ang customer", "walang ngiti ang staff", "walang pakialam", "magulong serbisyo",
            "walang sense of urgency", "hindi sanay sa trabaho", "nakakalimutan ang order", "walang follow-up", "nakikipagtalo sa customer",

            // Bisaya
            "bati nga serbisyo", "dili propesyonal ang staff", "wala nagtabang ang empleyado", "bastos nga staff", "walay pangumusta",
            "gipasagdan sa staff", "pirmi lang nasuko ang staff", "bati nga customer service", "dili maayo mudawat", "way pakabana",
            "hinay mo-reply", "bati ug batasan", "walay mutabang", "dili approachable", "kulang sa pag-atiman",
            "dili kabalo maminaw", "walay tarong nga pagdumala", "dugay motubag", "tamad kaayo ang empleyado", "likay sa tan-aw",
            "dili buotan", "paghulat ka dugay", "walay pag-smile ang staff", "walay pagtagad", "magubot nga serbisyo",
            "walay sense of urgency", "dili kabalo sa trabaho", "kalimtan ang order", "walay follow-up", "makiglalis sa customer"
        ],
        // Price-related issues
        "Overpriced": [
            "overpriced", "expensive", "not worth the price", "too costly",
            "sobra ka mahal", "mahal kaayo", "mahal ang presyo", "dili sulit", "not worth it",
            "grabe ang presyo", "grabe ka mahal", "presyong turista", "di makatarunganon ang presyo",
            "hindi sulit", "masyadong mahal", "hindi reasonable", "di angay sa presyo",
            "murag scam", "walay value for money", "mahal pero bati", "unfair pricing",
            "presyong pang-mayaman", "pakyas ang presyo", "masyadong mahal ang entrance",
            "walay klarong presyo", "di ma-justify ang presyo", "grabe kamahal",
            "di angay nga presyo", "overcharging"
        ],

        "Hidden Fees & Expensive Entrance": [
            // English
            "hidden fees", "unexpected charges", "high entrance fee", "not worth the entry price",
            "extra charges", "hidden costs", "undeclared fees", "pricey entrance", "expensive ticket",
            "added tax", "unfair pricing", "service charge surprise", "inflated costs", "double charges",
            "undisclosed charges", "entry price too high", "expensive admission", "not budget-friendly",
            "hidden service fee", "extra payment required", "entrance fee scam", "misleading price",
            "too costly to enter", "high parking fee", "unreasonable charges", "mandatory fees",
            "overpriced ticket", "sudden extra charge", "surprise additional payment", "deceptive pricing",

            // Tagalog
            "nakatagong bayad", "hindi inaasahang singil", "mahal ang entrance", "hindi sulit ang bayad",
            "dagdag singil", "di-deklaradong bayad", "singil na di alam", "sobrang mahal na entrance",
            "matrikulong presyo", "singil sa serbisyo", "mataas na singil", "presyong mapanlinlang",
            "mahal na tiket", "walang abisong bayad", "dagdag na babayaran", "hindi patas na presyo",
            "singil sa parking", "malaking kaltas", "biglang may bayad", "presyong hindi totoo",
            "hindi makatarungang singil", "di abot-kayang presyo", "lumampas sa budget", "dagdag buwis",
            "walang paliwanag na singil", "biglaang singil", "mataas na presyo", "hindi sulit na entrance",
            "extra na babayaran", "napakataas na entrance fee",

            // Bisaya
            "tinatago nga bayad", "wala sa lista nga singil", "mahal kaayo ang entrance", "dili sulit ang presyo",
            "dugang bayad", "gitago nga singil", "singil nga wa gi-deklarar", "sobra ka mahal nga entrance",
            "extra nga bayad", "gitago nga bayranan", "dili klaro nga presyo", "sobra ang singil",
            "daghang kuwang sa presyo", "singil nga wa gi-announce", "gibayran nga di angay",
            "pahimangno nga dugang bayad", "paspas nga singil", "dili patas nga presyo",
            "dili hustong presyo", "daghang kuwang sa bayad", "mataas nga entrance fee",
            "way klaro nga bayranan", "singil nga di hustong ipasabot", "daghang gi-charge",
            "nagtuo nga libre pero naay bayad", "libre pero naay hidden fee", "palihug i-klaro ang bayranan",
            "sobra ka mahal ang entrance", "dili majustify ang presyo", "sudden hidden charges"
        ],
        "Financial Mismanagement & Hidden Charges": [
            // English
            "wrong billing", "overcharged", "incorrect deposit", "scammed", "money dispute",
            "hidden fees", "unexpected charges", "extra charges", "unauthorized deductions", "billing errors",
            "fraudulent charges", "unfair pricing", "unjust fees", "fake transactions", "double charging",
            "excessive fees", "unauthorized withdrawal", "unexpected tax", "service charge scam", "false receipts",
            "inflated prices", "payment discrepancy", "misleading costs", "fake processing fees", "wrong refund amount",
            "non-refundable charge", "invalid transaction", "missing payments", "accounting errors", "no clear receipt",

            // Tagalog
            "maling pagsingil", "sobrang singil", "maling deposito", "naloko", "problema sa pera",
            "nakatagong bayarin", "hindi inaasahang singil", "dagdag na bayad", "walang pahintulot na kaltas", "maling resibo",
            "peke ang singil", "hindi patas na presyo", "hindi makatarungang bayarin", "maling transaksyon", "dobleng singil",
            "sobrang bayarin", "walang pahintulot na withdrawal", "hindi inaasahang buwis", "scam sa service charge", "pekeng resibo",
            "mataas na presyo", "hindi tugmang bayad", "nakakalitong singil", "pekeng processing fee", "maling refund",
            "hindi maibabalik ang bayad", "invalid na transaksyon", "kulang ang bayad", "maling kuwenta", "walang malinaw na resibo",

            // Bisaya
            "sayop nga bayad", "sobra nga singil", "sayop nga deposito", "gilimbongan", "problema sa kwarta",
            "natago nga bayad", "wala damha nga singil", "dugang bayad", "walay pagtugot nga kaltas", "sayop nga resibo",
            "peke nga bayad", "dili patas nga presyo", "dili makatarunganon nga bayad", "sayop nga transaksyon", "doble nga singil",
            "sobra ka mahal nga bayad", "walay pagtugot nga withdrawal", "kalit nga buwis", "scam sa service charge", "palsipikadong resibo",
            "pataas nga presyo", "dili angay nga bayad", "libog nga singil", "peke nga processing fee", "sayop nga refund",
            "dili mabalik ang bayad", "di balido nga transaksyon", "kulang ang bayad", "sayop nga kuwenta", "walay klarong resibo"
        ],

        // Cleanliness-related issues
        "Unclean & Poor Maintenance": [
            // English
            "dirty", "unclean", "filthy", "unmaintained", "messy", "grimy", "bad odor", "moldy", "garbage", "trash everywhere",
            "water leakage", "ants", "pests", "dusty", "clogged sink", "stained sheets", "unclean utensils", "dirty floor",
            "smelly towels", "broken toilet", "unsanitary", "muddy", "overgrown grass", "musty smell", "sticky table", "poor hygiene",
            "stinky room", "spilled drinks", "unclean aircon", "cobwebs everywhere",

            // Tagalog
            "madumi", "marumi", "maalikabok", "di-malinis", "masangsang", "maruming sahig", "basura kahit saan", "kalat-kalat",
            "may amag", "baradong lababo", "madilim at madumi", "mabahong amoy", "makalat", "pawisin ang kama", "maruming banyo",
            "luma at sira", "sirang gripo", "lumang kurtina", "maputik", "puno ng ipis", "walang naglilinis", "bahong kanal", "madulas na sahig",
            "naninilaw ang unan", "basang carpet", "di-malinis na kutsara", "di-malinis na plato", "kulob ang kwarto", "amoy pawis", "mabahong kubeta",

            // Bisaya
            "hugaw", "madugyot", "abog bisan asa", "hugaw ang tubig", "hugaw ang banyo", "puno sa ipis", "grabe ang baho", "hugaw ang lamesa",
            "hugaw ang baso", "way naglimpyo", "hugaw ang sapatos", "hugaw ang kasilyas", "hugaw ang plato", "hugaw ang tuwalya", "hugaw ang higaan",
            "hugaw ang pool", "daghan basura", "way nag-disinfect", "lapok bisan asa", "hugaw ang kanal", "mabaho ang silhig", "hugaw ang pultahan",
            "hugaw ang pinggan", "hugaw ang kutsara", "puno sa langaw", "daghang ok-ok", "way naghipos", "hugaw ang salamin", "grabe ang baho sa kusina",
            "hugaw ang kwarto"
        ],



        "Poor Bathroom Facilities": [
            // English
            "no flushing toilet", "bucket toilet", "no bathroom sink", "no toilet seat", "broken shower", "cold water only",
            "clogged drain", "leaking pipes", "dirty bathroom", "no bidet", "stinky restroom", "cracked tiles",
            "weak water pressure", "toilet won't flush", "rusty fixtures", "no toilet paper", "slow drainage",
            "moldy walls", "broken faucet", "foul odor", "no shower head", "poor lighting", "wet floors",
            "broken mirror", "no soap", "no hand dryer", "dirty toilet bowl", "no proper ventilation",
            "unhygienic", "slippery floor", "water leakage everywhere",

            // Tagalog
            "walang flush sa inidoro", "timba at tabo lang", "walang lababo", "walang toilet seat", "sirang shower",
            "malamig na tubig lang", "bara ang drainage", "tagas ang tubo", "maruming banyo", "walang bidet",
            "mabahong CR", "basag ang tiles", "mahina ang tubig", "hindi nagfuflush", "kalawangin ang gripo",
            "walang tissue", "bagal ng agos ng tubig", "may amag sa dingding", "sirang gripo", "amoy kanal",
            "walang shower head", "madilim sa loob", "palaging basa ang sahig", "sirang salamin", "walang sabon",
            "walang hand dryer", "maruming inidoro", "walang maayos na bentilasyon", "hindi malinis", "madulas ang sahig",

            // Bisaya
            "walay flush sa kasilyas", "balde ug tabo ra", "walay hugasan sa kamot", "walay toilet seat",
            "guba ang shower", "bugnaw ra ang tubig", "barado ang drainage", "nagasigi ug tagas ang tubo",
            "hugaw ang kasilyas", "walay bidet", "bahong kasilyas", "nabuak ang tiles", "hinay kaayo ang tubig",
            "dili mo-flush", "nangalawang ang gripo", "walay toilet paper", "hinay ang agos sa tubig",
            "adunay lumot sa bongbong", "guba ang gripo", "baho og hugaw", "walay shower head",
            "ngitngit sa sulod", "permi basa ang salog", "nabuak ang samin", "walay sabon",
            "walay hand dryer", "hugaw ang kasilyas", "walay maayong bentilasyon", "dili limpyo", "madanlog ang salog"
        ],


        // Noise-related issues
        "Noisy Environment": [
            "noisy", "loud", "disturbing noise", "too noisy", "hard to sleep",
            "samok", "way puyong", "saba", "way tulog", "grabe ang kasaba",
            "kusog ang sounds", "way hinay nga kanta", "grabe ang harana", "di makatulog",
            "kusog ang mga bisita", "daghang saba", "way hilom", "saba bisan asa",
            "karaoke hangtod buntag", "way disiplina ang uban", "nag-party kada gabii",
            "kasaba nga nakalagot", "daghan bata nga nagdagandagan", "kusog ang mga sakyanan",
            "di makarelax", "nagbusina kada minuto", "saba ang generator", "grabe ang karaoke",
            "way peace and quiet", "kasaba hangtod kadlawon",
            "maingay", "sobrang ingay", "hindi makatulog", "malakas ang tunog",
            "ingay kahit saan", "walang tahimik", "maingay ang kapitbahay",
            "puno ng ingay", "malakas ang sigaw", "hindi mapakali",
            "walang katahimikan", "parang may party lagi", "hindi nakakarelax",
            "nakakairita ang ingay", "paulit-ulit ang tunog", "parang concert"
        ],

        "Excessive Noise & Disturbance": [
            "karaoke past 10pm", "loud music at night", "rowdy guests", "noise complaints ignored",
            "kusog ang kanta", "karaoke hangtod buntag", "way disiplina ang uban", "grabe ang saba",
            "noisy neighbors", "walang pakialam sa iba", "loud shouting", "walang control sa ingay",
            "sobrang lakas ng tugtog", "parang may fiesta", "hindi makatulog dahil sa ingay",
            "walang respeto sa oras", "malakas ang bass", "nagwawala ang ibang bisita",
            "walang disiplina sa karaoke", "sobra sa lakas ang tugtog", "grabe ang party",
            "nagreklamo pero walang ginawa", "hindi iniintindi ang iba", "ingay buong gabi",
            "maingay ang paligid", "sira ang katahimikan", "hindi mapigilan ang ingay",
            "walang pahinga dahil sa ingay", "kahit madaling araw maingay pa rin",
            "nakakairita ang tunog", "parang disco"
        ],

        // Security-related issues
        "Security Concerns": [
            "unsafe", "poor security", "lack of security guards", "theft concerns",
            "walay kasiguraduhan", "way klarong seguridad", "delikado", "may tulis",
            "walay bantay", "dali ra sudlan", "way nagbantay", "nakawatan",
            "hindi ligtas", "walang bantay", "may nanakawan", "delikado sa gabi",
            "walang security", "walang CCTV", "hindi secure", "madilim at nakakatakot",
            "hindi maayos ang guard", "walang nagbabantay sa entrance",
            "madaling mapasok", "mababa ang bakod", "walang gate", "hindi maayos ang lock",
            "may mga kahina-hinalang tao", "walang emergency response",
            "walang fire exit", "walang first aid kit", "walang safety measures",
            "madaling masunog", "hindi ligtas para sa pamilya"
        ],

        "CCTV & Security Transparency Issues": [
            "no CCTV access", "won't show CCTV footage", "denied security recording",
            "walay CCTV", "dili makita ang footage", "wala daw recording",
            "walang access sa CCTV", "ayaw ipakita ang video", "walang ebidensya",
            "denied access", "hindi nagbibigay ng kopya", "hindi gumagana ang CCTV",
            "walang proper security", "hindi malinaw ang footage",
            "blurred ang video", "walang backup na footage", "walang nagmomonitor",
            "hindi updated ang security", "hindi maayos ang camera angles",
            "walang tao sa control room", "walang 24/7 surveillance",
            "walang record ng nangyari", "walang maintenance ang CCTV",
            "madalas sira ang camera", "walang security logs", "hindi malinaw ang recording",
            "walang access kahit may krimen", "walang tumutulong mag-review ng footage",
            "walang coordination sa pulis", "walang motion detection"
        ],

        // Reputation-related issues
        "Bad Reputation": [
            "overrated", "disappointing experience", "not as advertised",
            "hyped up", "false reviews", "not worth it", "bad publicity", "scam feeling", "misleading ratings", "questionable reputation",
            "walay ayo", "bati nga kasinatian", "di angay sa gilauman", "daghang reklamo", "way klaro", "bati ang feedback",
            "masyadong pinalobo", "hindi totoo ang reviews", "hindi sulit", "parang scam", "madaming reklamo", "pangit ang reputasyon",
            "misleading advertisement", "not trustworthy", "exaggerated claims", "sobra sa marketing", "sinayang ang pera",
            "walay kasaligan", "dili tinood nga ratings", "way sulod nga pangalan"
        ],

        // Facility-related issues
        "Lack of Amenities": [
            "no Wi-Fi", "limited food options", "no towels", "outdated gym", "broken facilities", "no hot water", "no running water",
            "no toiletries", "no room service", "no charging stations", "incomplete kitchen", "no locker", "small parking space", "no gym equipment",
            "walay Wi-Fi", "gamay ra ang pagpili sa pagkaon", "walay habol", "karaan nga gym", "guba ang mga pasilidad", "walay init nga tubig",
            "walay tubig", "walay sabon", "walay serbisyo sa kwarto", "gamay ang parking area", "kulang sa gamit", "karaan nga gamit",
            "walang Wi-Fi", "kaunti lang ang pagkain", "walang twalya", "luma ang gym", "sira ang pasilidad", "walang tubig na mainit",
            "walang tumutulong sa maintenance", "walang sapat na kagamitan", "walang libreng tubig", "mahirap ang accessibility"
        ],

        "Bad Food & Drink Options": [
            "bad food", "stale food", "bland taste", "poor quality drinks", "nasty breakfast", "no juice", "no coffee", "fake meat option",
            "cold food", "expired products", "not fresh", "overpriced food", "small serving", "greasy food", "bad smell",
            "baho ang pagkaon", "bugnaw ang sud-an", "walay lami", "dili bag-o", "mahal ang pagkaon", "gamay ang serving", "hugaw ang pagkaon",
            "way lami nga kape", "naay lanot", "dili init ang kan-on", "way timpla", "hugaw nga tubig", "baho ang mantika", "lata ang gatas",
            "pangit ang lasa", "walang lasa", "sobrang mahal pero hindi masarap", "maduming pagkain", "hindi fresh ang ingredients"
        ],

        "Outdated & Run-Down Facilities": [
            "old building", "falling apart", "poorly maintained", "broken aircon", "defective facilities",
            "rusty pipes", "cracked walls", "peeling paint", "dirty carpets", "malfunctioning elevator", "weak water pressure", "faded furniture",
            "karaan nga building", "dali maguba", "baho ang hangin", "karaan ang muwebles", "way klaro nga maintenance", "natanggong nga elevator",
            "hugaw ang linoleum", "puti-puti ang dingding", "naay liki", "luya ang tubig", "daghan anay", "sira ang ilaw", "sira ang pinto",
            "lumang building", "madaling masira", "madilim ang ilaw", "luma ang gamit", "basag ang tiles", "mahina ang tubig",
            "butas ang dingding", "gumuho ang kisame", "sira ang bentilador", "wala nang alaga"
        ],

        // Beach-related issues
        "Poor Beach Conditions": [
            "dirty water", "too many jellyfish", "murky water", "trash on the beach", "seaweed everywhere", "smells muddy",
            "oily water", "dead fish", "floating plastic", "crowded beach", "unsafe for swimming", "broken glass on sand", "sea lice",
            "hugaw nga tubig", "daghang jellyfish", "lapok nga dagat", "daghan basura", "naglutaw nga plastic", "hugo ang balas", "walay klaro nga tubig",
            "grabe ang baho", "hugaw ang baybay", "daghan tanom sa dagat", "di maligoan", "daghan angay tangtangon", "baho ang linaw", "lapok ang balas",
            "maduming tubig", "masyadong maraming jellyfish", "hindi malinis ang tubig", "amoy lupa ang dagat", "sobrang basura",
            "may matutulis na bato", "puno ng lumot", "sobrang daming tao", "hindi naalagaan ang paligid", "masyadong maraming alon"
        ],

        "Rocky or Poor Beach Conditions": [
            "rocky beach", "sharp rocks", "not swimmable", "bad shoreline", "mangrove roots",
            "muddy seabed", "uncomfortable sand", "coral cuts", "slippery rocks", "unstable ground", "deep sudden drop", "no lifeguard",
            "batohon nga baybay", "mga hait nga bato", "di maligoan", "baho ang lapok", "grabe ang kahait sa dagat",
            "daghang bato sa tubig", "daghan kahoy", "dali malunod", "dili klaro ang lapok", "kusog ang bawod", "wala nagbantay",
            "mahirap lumangoy", "masyadong maraming bato", "mabato ang ilalim", "may matutulis na coral", "hindi pantay ang buhangin",
            "napakadulas", "maputik na dagat", "biglang lumalalim", "delikado ang pampang", "walang nagbabantay"
        ],


        // Environmental issues
        "Extreme Heat & Lack of Shade": [
            "too hot", "no shade", "too sunny", "unbearable heat", "scorching", "heatwave", "no trees", "overexposed to sun", "hot and humid", "dry and dusty",
            "mainit", "walang lilim", "sobrang init", "nakakasunog ng balat", "tirik ang araw", "sobrang humid", "maalinsangan", "pawis na pawis", "walang preskong hangin", "matinding init",
            "init kaayo", "walay landong", "hayag kaayo", "way kabugnaon", "nagatotok ang adlaw", "grabe ka uga", "gihanggab sa kainit", "di makalugway", "nagpugas ug singot", "kasaba sa kainit"
        ],

        "Crowded & Overbooked": [
            "too crowded", "no space", "overbooked", "too many people", "packed with tourists", "cramped", "overcapacity", "lack of privacy", "no seats available", "too noisy",
            "masyadong matao", "siksikan", "sobrang dami ng tao", "walang espasyo", "puno na", "di na kasya", "masikip", "nagkakasabayan", "walang mauupuan", "hindi na mahulugan ng karayom",
            "daghang tawo", "siksikan kaayo", "way lugar", "napuno na", "sobrang kagubot", "puno sa bisita", "nagsiksikan", "daghan kaayo og tawo", "masamok nga lugar", "way bakanteng lingkoranan"
        ],

        // Advertising issues
        "False Advertising": [
            "not as advertised", "misleading photos", "looked better online", "expectations not met", "exaggerated features", "fake reviews", "overhyped", "deceptive marketing", "false claims", "edited pictures",
            "hindi tulad ng nasa larawan", "mapanlinlang na mga litrato", "mas maganda online", "hindi natupad ang inaasahan", "dinaya ang larawan", "hindi authentic", "hindi tugma sa aktwal", "parang scam", "pandaraya", "hindi kapani-paniwala",
            "dili parehas sa hulagway", "limbong nga advertisement", "mas nindot sa internet", "dili mao ang aktwal", "pinasubrahan ang promosyon", "wala sa saktong hitsura", "gi-edit ang pictures", "dili tinuod ang reviews", "daghang bakak", "misleading ang gipakita"
        ],

        // Booking issues
        "Booking & Reservation Issues": [
            "wrong order", "wrong booking", "incorrect room assignment", "room not ready", "cottage occupied by others", "double-booked", "missing reservation", "overcharged", "reservation lost", "unavailable room",
            "maling booking", "hindi available ang kwarto", "nasayang ang reservation", "kulang sa coordination", "mali ang inassign na kwarto", "walang bakanteng kwarto", "may ibang gumagamit", "hindi tugma sa booking", "nagkapalit ang booking", "hindi natupad ang reservation",
            "sayop nga booking", "wala sa listahan", "guba ang reservation", "wala pa ma-ready ang kwarto", "nahatag sa lain ang cottage", "nagkapalit ang order", "wala na-confirm", "wala giandam ang kwarto", "hinoon ang napilian", "daghang reklamo sa booking"
        ],

        // Location-related issues
        "Inconvenient Location": [
            "far from attractions", "remote location", "hard to get to", "poor transportation options", "hidden place", "long travel time", "inaccessible", "bad road conditions", "too isolated", "out of the way",
            "malayo sa tourist spots", "sobrang liblib", "ang hirap puntahan", "kulang sa transportasyon", "hindi kilalang lugar", "napakahirap puntahan", "walang direksyon", "sira ang daan", "sobrang layu", "hindi sulit ang biyahe",
            "layo kaayo sa atraksyon", "lisod adtuon", "way klarong agianan", "wala sa mapa", "lisod ang sakyanan", "gubot ang karsada", "way access sa transportasyon", "layo kaayo sa syudad", "layo ug lisod pangitaon", "way kasakay"
        ],

        // Aesthetic-related issues
        "Unappealing Resort Aesthetics": [
            "run-down", "outdated design", "old furniture", "not well-decorated", "ugly surroundings", "dull colors", "lack of greenery", "poor lighting", "cheap decor", "poor maintenance",
            "luma na", "hindi na uso ang disenyo", "lumang kasangkapan", "hindi maganda ang paligid", "pangit na aesthetics", "madilim ang lugar", "walang dekorasyon", "hindi kaaya-aya", "walang ambiance", "walang artistic touch",
            "karaan kaayo", "guba ang mga gamit", "way nindot nga design", "way dekorasyon", "bati ang porma", "way estetik", "lawom ang kolor", "hugaw nga porma", "way art", "pangit tan-awn"
        ],

        "Strange or Unpleasant Atmosphere": [
            "seedy feel", "weird vibe", "creepy surroundings", "unwelcoming", "strange smell", "odd lighting", "uncomfortable feeling", "bad energy", "eerie silence", "not cozy",
            "parang may multo", "nakakakilabot", "nakakatakot ang paligid", "may kakaibang amoy", "parang haunted house", "walang buhay ang lugar", "hindi welcoming", "nakakatindig balahibo", "hindi komportable", "nakakadismaya",
            "murag naay espiritu", "makuyaw nga lugar", "murag haunted house", "malaay nga palibot", "baho ang lugar", "way kinabuhi ang palibot", "makahilakbot", "bati ang atmosphere", "makalain og paminaw", "murag naay misteryo"
        ]
    },

};

// **Extract Comments and Sentiments from CSV Data**
function extractCSVData(resortData) {
    const csvData = resortData?.csvData || {};
    const comments = [];
    const trueSentiment = [];
    const predictedSentiment = [];

    for (const key in csvData) {
        const data = csvData[key];
        if (data.Comments) {
            comments.push(data.Comments);
            trueSentiment.push(data["True Sentiment"]);
            predictedSentiment.push(data["Predicted Sentiment"]);
        }
    }

    return { comments, trueSentiment, predictedSentiment };
}

// **Sentiment Analysis for Pie Chart**
function analyzeSentiment(predictedSentiment) {
    const total = predictedSentiment.length;
    const positiveCount = predictedSentiment.filter(sentiment => sentiment === "Positive").length;
    const negativeCount = predictedSentiment.filter(sentiment => sentiment === "Negative").length;
    const neutralCount = predictedSentiment.filter(sentiment => sentiment === "Neutral").length;

    // Calculate percentages (rounded to whole numbers)
    const positivePercent = Math.round((positiveCount / total) * 100);
    const negativePercent = Math.round((negativeCount / total) * 100);
    const neutralPercent = Math.round((neutralCount / total) * 100);

    return {
        labels: [
            `Positive (${positivePercent}%)`,
            `Negative (${negativePercent}%)`,
            `Neutral (${neutralPercent}%)`
        ],
        datasets: [{
            label: "Sentiments",
            data: [positiveCount, negativeCount, neutralCount],
            backgroundColor: ["#4caf50", "#f44336", "#ffeb3b"]
        }]
    };
}

// **Aspect Sentiment Analysis for Bar Chart**
function analyzeSentimentForBarChart(comments, predictedSentiment, selectedSentiment) {
    const sentimentCounts = {
        positive: {},
        negative: {}
    };

    // Initialize counts for each aspect
    Object.keys(aspects.positive)
        .concat(Object.keys(aspects.negative))
        .forEach(aspect => {
            sentimentCounts.positive[aspect] = 0;
            sentimentCounts.negative[aspect] = 0;
        });

    // Process comments
    comments.forEach((comment, index) => {
        const lowerComment = comment.toLowerCase();
        const sentiment = predictedSentiment[index];

        Object.entries(aspects.positive).forEach(([aspect, keywords]) => {
            if (keywords.some(keyword => lowerComment.includes(keyword))) {
                if (selectedSentiment === "All" || sentiment === selectedSentiment) {
                    sentimentCounts.positive[aspect]++;
                }
            }
        });

        Object.entries(aspects.negative).forEach(([aspect, keywords]) => {
            if (keywords.some(keyword => lowerComment.includes(keyword))) {
                if (selectedSentiment === "All" || sentiment === selectedSentiment) {
                    sentimentCounts.negative[aspect]++;
                }
            }
        });
    });

    // **Filter out aspects with zero values**
    const filteredLabels = [];
    const filteredPositive = [];
    const filteredNegative = [];

    Object.keys(sentimentCounts.positive).forEach(aspect => {
        const totalMentions =
            sentimentCounts.positive[aspect] +
            sentimentCounts.negative[aspect];

        if (totalMentions > 0) {  // Only include aspects with mentions
            filteredLabels.push(aspect);
            filteredPositive.push(sentimentCounts.positive[aspect]);
            filteredNegative.push(sentimentCounts.negative[aspect]);
        }
    });

    return {
        labels: filteredLabels,
        datasets: [
            { label: "Positive", data: filteredPositive, backgroundColor: "#4caf50" },
            { label: "Negative", data: filteredNegative, backgroundColor: "#f44336" }
        ]
    };
}



// **Update Charts**
function updateChart(instance, chartId, data, chartType) {
    if (instance) {
        instance.destroy();
        const canvasParent = document.getElementById(chartId).parentElement;
        document.getElementById(chartId).remove();
        const newCanvas = document.createElement("canvas");
        newCanvas.id = chartId;
        canvasParent.appendChild(newCanvas);
    }

    const ctx = document.getElementById(chartId).getContext("2d");
    return new Chart(ctx, { type: chartType, data: data });
}

// **On Page Load**
document.addEventListener("DOMContentLoaded", async () => {
    const dropdown = document.getElementById("resortDropdown");
    const reviewsRef = ref(db, "reviews");

    try {
        const snapshot = await get(reviewsRef);
        if (snapshot.exists()) {
            Object.entries(snapshot.val()).forEach(([key, resort]) => {
                const option = document.createElement("option");
                option.value = key;
                option.textContent = resort?.details?.name || "Unnamed Resort";
                dropdown.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }

    dropdown.addEventListener("change", async () => {
        const selectedKey = dropdown.value;
        if (!selectedKey) return;

        const resortRef = ref(db, `reviews/${selectedKey}`);
        try {
            const snapshot = await get(resortRef);
            if (snapshot.exists()) {
                const { comments, predictedSentiment } = extractCSVData(snapshot.val());
                sentimentChartInstance = updateChart(sentimentChartInstance, "sentimentChart", analyzeSentiment(predictedSentiment), "pie");
                feedbackChartInstance = updateChart(feedbackChartInstance, "feedbackChart", analyzeSentimentForBarChart(comments, predictedSentiment, "All"), "bar");
            }
        } catch (error) {
            console.error("Error fetching resort details:", error);
        }
    });
});
