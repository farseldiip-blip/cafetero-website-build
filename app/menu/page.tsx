"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import menuData from "@/data/menu.json"

const categories = [{ id: "all", en: "All", ar: "الكل" }, { id: "hot-coffee", en: "Hot coffee", ar: "قهوة ساخنة" }, { id: "iced", en: "Iced", ar: "مثلجة" }, { id: "matcha", en: "Matcha", ar: "ماتشا" }, { id: "coolers", en: "Coolers", ar: "موهيتو" }, { id: "desserts", en: "Desserts", ar: "حلويات" }]

export default function MenuPage() {
  const [ar, setAr] = useState(false)
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const items = useMemo(() => menuData.items.filter((item) => (category === "all" || item.category === category) && `${item.name.en} ${item.name.ar}`.toLowerCase().includes(query.toLowerCase())), [category, query])
  return <main className={`menu-page ${ar ? "rtl" : ""}`} dir={ar ? "rtl" : "ltr"}>
    <header className="menu-top"><Link href="/" className="menu-back">CAFETERO</Link><button onClick={() => setAr(!ar)}>{ar ? "EN" : "العربية"}</button></header>
    <section className="menu-hero"><p className="section-label">01 / {ar ? "من الكاونتر" : "FROM THE COUNTER"}</p><h1>{ar ? "رشفة هادية. لقمة سريعة." : "SLOW SIPS. QUICK BITES."}</h1><p>{ar ? "اختيارات بسيطة لأيامك الحقيقية." : "A short list of favourites, made for real days."}</p></section>
    <section className="menu-filter"><label htmlFor="menu-search">{ar ? "ابحث" : "SEARCH"}</label><input id="menu-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ar ? "اكتب اسم مشروب" : "Type a drink or bite"} /><div className="category-tabs">{categories.map((item) => <button key={item.id} className={category === item.id ? "selected" : ""} onClick={() => setCategory(item.id)}>{ar ? item.ar : item.en}</button>)}</div></section>
    <section className="menu-list">{items.map((item, index) => <article className={`menu-row menu-row-${index % 3}`} key={item.id}><div className="menu-index">{String(index + 1).padStart(2, "0")}</div><div><p className="item-category">{item.category.replace("-", " ")}</p><h2>{item.name[ar ? "ar" : "en"]}</h2><p>{item.description[ar ? "ar" : "en"]}</p></div><strong>{item.price}</strong></article>)}</section>
    <footer className="menu-footer"><Link href="/">{ar ? "العودة للمكان" : "Back to the cafe"}</Link><span>Prices are placeholders · to be confirmed</span></footer>
  </main>
}
