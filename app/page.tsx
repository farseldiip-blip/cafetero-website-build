"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Coffee, House, Image as ImageIcon, MapPin, Utensils } from "lucide-react"
import menuData from "@/data/menu.json"

const logo = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-G2MfIEhpjmYczNcoV0V9T4GnC45tfE.png"
type Lang = "en" | "ar"

const copy = {
  en: {
    nav: ["Home", "The vibe", "Menu", "Gallery", "Visit"], eyebrow: "Specialty coffee / El Mokattam", title: "WORK. SIP. CHILL.", intro: "Good coffee, easy mornings, a corner that feels like yours.", menu: "See the menu", visit: "Find us", vibe: "Pick your mood.", work: "WORK", workText: "Free Wi-Fi. Plenty of plugs. A table for the long haul.", coffee: "COFFEE", coffeeText: "Spanish lattes, matcha and cups worth slowing down for.", eat: "EAT & CHILL", eatText: "Quick bites, sweet things and no reason to rush.", from: "FROM THE COUNTER", menuTitle: "SLOW SIPS. QUICK BITES.", menuText: "A short list of favourites, made for real days.", explore: "Open full menu", match: "MATCH NIGHT", matchTitle: "BIG SCREEN. LOUD FRIENDS.", matchText: "The beautiful game, served with cold drinks and a table for your crew.", ticket: "NEXT MATCH / DETAILS TBC", gallery: "THE PLACE", galleryText: "A bright corner in Mokattam for focused hours and easy hangs.", visitTitle: "COME FIND YOUR CORNER.", address: "ChillOut El Kafrawy, El Mokattam, Cairo", hours: "Hours to be confirmed", directions: "Get directions", owner: "Owner story placeholder — to confirm.", follow: "Follow along" },
  ar: {
    nav: ["الرئيسية", "المود", "القائمة", "المعرض", "زورونا"], eyebrow: "قهوة مختصة / المقطم", title: "اشتغل. اشرب. افصل.", intro: "قهوة حلوة، صباحات هادية وركن تحس إنه بتاعك.", menu: "شوف القائمة", visit: "اعرف مكاننا", vibe: "اختار مودك.", work: "شغل", workText: "واي فاي مجاني. فيش كتير. ترابيزة تكمل عليها اليوم.", coffee: "قهوة", coffeeText: "لاتيه إسباني، ماتشا وكوبايات تستاهل تهدى عشانها.", eat: "أكل وراحة", eatText: "لقمة سريعة، حاجة حلوة ومفيش سبب للاستعجال.", from: "من الكاونتر", menuTitle: "رشفة هادية. لقمة سريعة.", menuText: "اختيارات بسيطة لأيامك الحقيقية.", explore: "افتح القائمة كاملة", match: "ليلة الماتش", matchTitle: "شاشة كبيرة. صحاب بصوت عالي.", matchText: "الماتش الحلو، مشروبات ساقعة وترابيزة مستنياكم.", ticket: "الماتش الجاي / التفاصيل قريباً", gallery: "المكان", galleryText: "ركن منور في المقطم للشغل الهادي والقعدة السهلة.", visitTitle: "تعالى اختار ركنك.", address: "تشيل أوت الكفراوي، المقطم، القاهرة", hours: "المواعيد للتأكيد", directions: "اعرف الطريق", owner: "مكان لحكاية المالك — للتأكيد.", follow: "تابعنا" }
}

function Header({ lang, setLang }: { lang: Lang; setLang: (value: Lang) => void }) {
  const t = copy[lang]
  return <header className="site-header"><Link href="#home" className="brand-mark"><Image src={logo} alt="Cafetero" width={82} height={82} /></Link><nav className="desktop-nav">{t.nav.map((label, index) => <a key={label} href={index === 2 ? "/menu" : `#${["home", "vibe", "menu", "gallery", "visit"][index]}`}>{label}</a>)}</nav><button className="lang-toggle" onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "العربية" : "EN"}</button></header>
}

function BottomNav({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState("home")
  const labels = lang === "ar" ? { home: "الرئيسية", vibe: "قصتنا", menu: "المنيو", gallery: "المعرض", visit: "زورنا" } : { home: "Home", vibe: "Origins", menu: "Menu", gallery: "Gallery", visit: "Visit" }
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => { const currentY = window.scrollY; setVisible(currentY < lastY || currentY < 24); lastY = currentY }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const items = [{ id: "home", href: "#home", icon: House }, { id: "vibe", href: "#vibe", icon: Coffee }, { id: "menu", href: "/menu", icon: Utensils }, { id: "gallery", href: "#gallery", icon: ImageIcon }, { id: "visit", href: "#visit", icon: MapPin }]
  return <motion.nav className={`bottom-nav ${visible ? "is-visible" : "is-hidden"}`} aria-label="Mobile navigation">{items.map(({ id, href, icon: Icon }) => <Link key={id} href={href} className={`bottom-nav-item ${id === "menu" ? "bottom-menu" : ""}`} onClick={() => setActive(id)} aria-label={labels[id as keyof typeof labels]}>{active === id && id !== "menu" && <motion.span layoutId="active-nav" className="active-nav-pill" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}<span className={id === "menu" ? "menu-icon-badge" : "nav-icon-wrap"}><Icon aria-hidden="true" /></span><span>{labels[id as keyof typeof labels]}</span></Link>)}</motion.nav>
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("en")
  const [showSplash, setShowSplash] = useState(true)
  const t = copy[lang]
  useEffect(() => { const timer = window.setTimeout(() => setShowSplash(false), 1800); return () => window.clearTimeout(timer) }, [])
  return <div className={`site ${lang === "ar" ? "rtl" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
    <AnimatePresence>{showSplash && <motion.div className="splash" initial={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .65 }}><Image src={logo} alt="Cafetero" width={220} height={220} /><p>pouring good things</p></motion.div>}</AnimatePresence>
    <Header lang={lang} setLang={setLang} />
    <main id="home">
      <section className="hero-poster"><div className="hero-copy"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><Link className="ink-button" href="/menu">{t.menu}</Link><a className="outline-button" href="#visit">{t.visit}</a></div></div><div className="hero-art"><div className="sun-disc" /><div className="photo-placeholder"><span>PHOTO<br />COMING SOON</span></div><Image className="hero-logo" src={logo} alt="Cafetero toucan logo" width={155} height={155} /></div><div className="hero-number">CAF / 01</div></section>
      <div className="marquee"><span>COFFEE / WORK / MATCH NIGHTS / GOOD COMPANY / </span><span>COFFEE / WORK / MATCH NIGHTS / GOOD COMPANY / </span></div>
      <section id="vibe" className="vibe-section"><div className="section-label">02 / {t.vibe}</div><h2>{t.vibe}</h2><div className="vibe-panels"><article className="vibe-panel blue-panel"><b>{t.work}</b><p>{t.workText}</p><i>01</i></article><article className="vibe-panel yellow-panel"><b>{t.coffee}</b><p>{t.coffeeText}</p><i>02</i></article><article className="vibe-panel red-panel"><b>{t.eat}</b><p>{t.eatText}</p><i>03</i></article></div></section>
      <section id="menu" className="menu-teaser"><div><p className="section-label">03 / {t.from}</p><h2>{t.menuTitle}</h2><p>{t.menuText}</p><Link className="ink-button" href="/menu">{t.explore}</Link></div><div className="menu-sticker"><strong>CAFÉ<br />TERO</strong><span>short list / big mood</span></div></section>
      <section className="match-ticket"><div className="ticket-copy"><p className="section-label">04 / {t.match}</p><h2>{t.matchTitle}</h2><p>{t.matchText}</p><span className="ticket-meta">{t.ticket}</span></div><div className="ticket-shape"><span>LIVE<br />HERE</span></div></section>
      <section id="gallery" className="gallery-section"><div className="section-label">05 / {t.gallery}</div><h2>{t.gallery}</h2><p>{t.galleryText}</p><div className="gallery-grid"><div className="gallery-block gallery-blue"><span>PHOTO<br />COMING SOON</span></div><div className="gallery-block gallery-yellow"><span>PHOTO<br />COMING SOON</span></div><div className="gallery-block gallery-red"><span>PHOTO<br />COMING SOON</span></div></div></section>
      <section id="visit" className="visit-section"><div className="visit-mark">★</div><div><p className="section-label">06 / VISIT</p><h2>{t.visitTitle}</h2><p>{t.address}</p><p>{t.hours}</p><a className="ink-button" href="https://maps.google.com/?q=El+Mokattam+Cairo">{t.directions}</a></div><p className="owner-note">{t.owner}</p></section>
    </main><footer className="site-footer"><span>CAFETERO / CAIRO</span><span>{t.follow}</span></footer><BottomNav lang={lang} />
  </div>
}

export { menuData }
