import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "./cinematic";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
}

const DEMO_TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "أحمد محمود", location: "القاهرة", content: "تجربة استثمارية رائعة وآمنة. الواجهة سهلة الاستخدام والدعم ممتاز.", rating: 5, avatar: "أم" },
  { id: "2", name: "فاطمة علي", location: "الإسكندرية", content: "أفضل منصة استثمارية استخدمتها. الأرباح حقيقية والتقارير شفافة جدًا.", rating: 5, avatar: "فع" },
  { id: "3", name: "محمد حسن", location: "الجيزة", content: "منصة موثوقة وآمنة. استثمرت فيها وحصلت على عوائد ممتازة.", rating: 5, avatar: "مح" },
  { id: "4", name: "نور الدين", location: "القاهرة", content: "خدمة العملاء رائعة والمحافظ الرقمية سهلة الاستخدام.", rating: 5, avatar: "ند" },
  { id: "5", name: "ليلى إبراهيم", location: "طنطا", content: "أوصيت الكثير من أصدقائي بهذه المنصة. جربتها وعاد عليهم بنتائج ممتازة.", rating: 5, avatar: "لع" },
  { id: "6", name: "علي محمود", location: "القاهرة", content: "تطبيق احترافي جداً. استثمرت مبلغاً معقولاً وبدأت أرى النتائج.", rating: 5, avatar: "عم" },
  { id: "7", name: "سارة يوسف", location: "الإسكندرية", content: "التجربة الأفضل في مجال الاستثمار الرقمي. أنصح به بقوة.", rating: 5, avatar: "سي" },
  { id: "8", name: "خالد أحمد", location: "الجيزة", content: "منصة موثوقة وشفافة. الأرباح تأتي بانتظام كل شهر.", rating: 5, avatar: "خأ" },
  { id: "9", name: "نادية هاني", location: "طنطا", content: "بدأت الاستثمار من خلالها ولم أندم. العوائد أفضل من توقعاتي.", rating: 5, avatar: "نه" },
  { id: "10", name: "سامي علي", location: "المنصورة", content: "أفضل قرار استثماري اتخذته. الدعم الفني ممتاز جداً.", rating: 5, avatar: "سع" },
  { id: "11", name: "مريم حسن", location: "القاهرة", content: "المنصة آمنة وموثوقة. استثمرت فيها وحققت أرباح جيدة.", rating: 5, avatar: "مح" },
  { id: "12", name: "ياسر فاروق", location: "الإسكندرية", content: "تطبيق احترافي وسهل الاستخدام. أنصح به لكل من يريد الاستثمار.", rating: 5, avatar: "يف" },
  { id: "13", name: "دينا أحمد", location: "الجيزة", content: "عرفت عن المنصة من صديقة وبدأت الاستثمار بثقة تامة.", rating: 5, avatar: "دأ" },
  { id: "14", name: "محمود محمود", location: "القاهرة", content: "أفضل منصة للاستثمار الآمن. العوائد حقيقية والتقارير دقيقة.", rating: 5, avatar: "مم" },
  { id: "15", name: "هناء علي", location: "طنطا", content: "تجربة رائعة مع المنصة. الأرباح تأتي بانتظام والدعم ممتاز.", rating: 5, avatar: "هع" },
  { id: "16", name: "رامي محمد", location: "الإسكندرية", content: "استثمرت مبلغاً متوسطاً وحصلت على عوائد رائعة.", rating: 5, avatar: "رم" },
  { id: "17", name: "أميرة سالم", location: "القاهرة", content: "أفضل قرار مالي اتخذته. المنصة موثوقة والعائد مضمون.", rating: 5, avatar: "أس" },
  { id: "18", name: "إبراهيم حسن", location: "الجيزة", content: "منصة احترافية وآمنة جداً. أنصح بها لكل الراغبين بالاستثمار.", rating: 5, avatar: "إح" },
  { id: "19", name: "لمى محمود", location: "المنصورة", content: "تجربة الاستثمار معهم كانت ممتازة. الأرباح حقيقية والتحويل سريع.", rating: 5, avatar: "لم" },
  { id: "20", name: "عمر فاروق", location: "القاهرة", content: "بدأت معهم من صفر والآن أملك محفظة استثمارية جيدة.", rating: 5, avatar: "عف" },
  { id: "21", name: "زينب علي", location: "الإسكندرية", content: "المنصة سهلة جداً حتى للمبتدئين. أنا راضية جداً عن الخدمة.", rating: 5, avatar: "زع" },
  { id: "22", name: "طارق محمد", location: "الجيزة", content: "أفضل تطبيق استثمار استخدمته. الواجهة جميلة والعمليات سهلة.", rating: 5, avatar: "طم" },
  { id: "23", name: "فاطمة محمود", location: "القاهرة", content: "استثمرت فيها وحققت أرباح جيدة جداً. أنصح بها بشدة.", rating: 5, avatar: "فم" },
  { id: "24", name: "حسام الدين", location: "طنطا", content: "منصة موثوقة وآمنة جداً. التعامل معهم احترافي جداً.", rating: 5, avatar: "حد" },
  { id: "25", name: "منى أحمد", location: "الإسكندرية", content: "أفضل استثمار في حياتي. الأرباح تزداد كل شهر.", rating: 5, avatar: "منأ" },
  { id: "26", name: "أنور الدين", location: "القاهرة", content: "بدأت مع مبلغ صغير والآن أملك محفظة قيمتها عالية.", rating: 5, avatar: "أد" },
  { id: "27", name: "جيهان علي", location: "الجيزة", content: "تطبيق احترافي وآمن. الدعم الفني يرد بسرعة جداً.", rating: 5, avatar: "جع" },
  { id: "28", name: "محسن محمود", location: "المنصورة", content: "أفضل منصة استثمار في مصر. موثوقة وآمنة وعوائدها حقيقية.", rating: 5, avatar: "مح" },
  { id: "29", name: "رحاب يوسف", location: "القاهرة", content: "استثمرت فيها وحققت أرباح رائعة. أنصح بها لكل من أعرفه.", rating: 5, avatar: "ري" },
  { id: "30", name: "نبيل أحمد", location: "الإسكندرية", content: "منصة احترافية وآمنة جداً. العوائد مضمونة والعمليات سريعة.", rating: 5, avatar: "نأ" },
  { id: "31", name: "ريم محمد", location: "الجيزة", content: "أفضل قرار مالي. المنصة موثوقة والأرباح حقيقية جداً.", rating: 5, avatar: "رم" },
  { id: "32", name: "رياض الله", location: "القاهرة", content: "تطبيق رائع وآمن. استثمرت فيه وحققت أرباح كبيرة.", rating: 5, avatar: "رل" },
  { id: "33", name: "سلمى حسن", location: "طنطا", content: "منصة موثوقة وشفافة. الدعم ممتاز والعوائد مضمونة.", rating: 5, avatar: "سح" },
  { id: "34", name: "كريم علي", location: "الإسكندرية", content: "أفضل منصة استثمار. موثوقة وآمنة والعوائد حقيقية.", rating: 5, avatar: "كع" },
  { id: "35", name: "سمير محمود", location: "القاهرة", content: "بدأت معهم وحققت نجاح استثماري كبير جداً.", rating: 5, avatar: "سم" },
  { id: "36", name: "لينا أحمد", location: "الجيزة", content: "تجربة رائعة جداً. المنصة احترافية والعوائد مضمونة.", rating: 5, avatar: "لأ" },
  { id: "37", name: "حمادة محمد", location: "المنصورة", content: "أفضل استثمار اخترته. الأرباح تزداد والمنصة آمنة جداً.", rating: 5, avatar: "حم" },
  { id: "38", name: "وداد علي", location: "القاهرة", content: "منصة موثوقة وآمنة تماماً. أنصح بها بشدة.", rating: 5, avatar: "وع" },
  { id: "39", name: "ياسمين يوسف", location: "الإسكندرية", content: "أفضل تطبيق استثماري. الواجهة جميلة والعمليات سهلة.", rating: 5, avatar: "يي" },
  { id: "40", name: "إياد فاروق", location: "الجيزة", content: "استثمرت فيها وحققت نتائج ممتازة. أنصح بها.", rating: 5, avatar: "إف" },
  { id: "41", name: "أريج محمود", location: "طنطا", content: "منصة احترافية وآمنة. العوائد حقيقية والدعم ممتاز.", rating: 5, avatar: "أم" },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <p className="text-xs sm:text-sm tracking-[0.35em] text-gold uppercase">Testimonials</p>
            <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.2] text-ivory">
              ماذا يقول <span className="text-gold-gradient">عملاؤنا</span>
            </h2>
            <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-7">
              آراء حقيقية من أكثر من 41 ألف مستثمر وثقوا بمنصة المشرق
            </p>
          </div>
        </Reveal>

        <TestimonialCarousel testimonials={DEMO_TESTIMONIALS} />

        {/* Trust Stats */}
        <Reveal delay={100}>
          <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: "41K+", label: "مستخدم نشط" },
              { value: "99.9%", label: "رضا العملاء" },
              { value: "$2.5B+", label: "أموال مستثمرة" },
            ].map((stat, i) => (
              <div key={i} className="text-center glass rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-gold/40 transition-colors">
                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-gold">{stat.value}</p>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 0.5) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <Reveal delay={50}>
      <div className="relative overflow-hidden -mx-4 sm:mx-0 px-4 sm:px-0">
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 pb-4"
          style={{
            transform: `translateX(calc(-${scrollPosition}% - ${scrollPosition * 0.5}px))`,
            transition: "none",
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 sm:w-80 lg:w-96 glass rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-gold/40 transition-all duration-300 hover:scale-105 lift group"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gold fill-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base text-ivory leading-6 sm:leading-7 mb-5 line-clamp-3">
                "{t.content}"
              </p>

              {/* Avatar and Name */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold to-gold-soft flex items-center justify-center text-xs sm:text-sm font-semibold text-graphite flex-shrink-0 group-hover:scale-110 transition-transform">
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base text-ivory truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">📍 {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </Reveal>
  );
}
