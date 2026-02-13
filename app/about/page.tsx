import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import { Rocket, Globe, Users, ShieldCheck, Award, Handshake, Eye } from "lucide-react"

const stats = [
  { icon: Rocket, title: "انطلاقتنا", description: "بدأنا رحلتنا من دبي لتجربة بيع اللوحات المميزة بأسلوب فاخر" },
  { icon: Globe, title: "شبكة واسعة", description: "تواصل مباشر مع معارض ووكلاء معتمدين في أكثر من 6 إمارات" },
  { icon: Users, title: "فريق متخصص", description: "مستشارون قانونيون ومروريون يتولون جميع الإجراءات بالنيابة عنك" },
]

const values = [
  { icon: ShieldCheck, title: "ثقة وشفافية", description: "نوفر معلومات كاملة عن كل لوحة مع توثيق رسمي لكافة الخطوات" },
  { icon: Award, title: "جودة استثنائية", description: "نختار اللوحات بعناية فائقة لتناسب الذوق الرفيع وتلبي تطلعات التميز" },
  { icon: Handshake, title: "علاقات طويلة الأمد", description: "نرافق عملاءنا بعد البيع لضمان تجربة سلسة ومستمرة" },
  { icon: Eye, title: "رؤية عالمية", description: "نطمح لتوسيع خدماتنا لتشمل أسواق فاخرة جديدة حول العالم" },
]

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        <p className="mb-2 text-sm font-semibold text-primary">{"من نحن"}</p>
        <h1 className="mb-4 text-3xl font-black text-foreground md:text-5xl">{"نخبة من خبراء اللوحات المميزة"}</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {"تأسس متجر اللوحات على مبدأ أن التميز يبدأ من التفاصيل الصغيرة. نحن منصة متخصصة في اختيار وتوفير لوحات السيارات المميزة للعملاء الباحثين عن هوية متفردة على الطرقات. يجمع فريقنا بين الخبرة المرورية، الرؤية التجارية، والخدمة الفاخرة لنقدم تجربة شراء متكاملة تبدأ بالاستشارة وتنتهي باستلام اللوحة جاهزة للاستخدام."}
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 text-base font-bold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="border-y border-border/30 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="mb-3 text-center text-2xl font-black text-foreground md:text-3xl">{"لماذا يثق بنا عملاؤنا؟"}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            {"نقدم مزيجاً مثالياً من الاستشارة المتخصصة، سرعة الإنجاز، وخبرة سوقية تمتد لسنوات. نرافق عملاءنا في كل خطوة بدءاً من اختيار اللوحة وحتى إتمام إجراءات نقل الملكية."}
          </p>
          <ul className="mx-auto mb-10 max-w-lg flex flex-col gap-2">
            {[
              "شبكة علاقات مع جهات رسمية لتسريع الإجراءات",
              "متابعة قانونية ومرورية حتى إكمال عملية النقل",
              "عقود رسمية تضمن حقوق العميل والبائع",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/20">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-4 w-4" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-foreground">{v.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
