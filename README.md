# HealthAI — AI Денсаулық Қауіп Анализаторы

Казах тіліндегі заманауи денсаулық аналитика веб-қосымшасы. Киімдік құрылғы деректері негізіндегі AI ауру қаупін болжау жүйесі.

## Жергілікті іске қосу

```bash
npm install
npm run dev
```

Браузерде ашыңыз: [http://localhost:3000](http://localhost:3000)

## Технологиялар

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** + glassmorphism design
- **Framer Motion** — анимациялар
- **Recharts** — графиктер
- **Lucide React** — иконкалар

## Беттер

| Бет | Маршрут | Сипаттама |
|-----|---------|-----------|
| Басты бет | `/` | Лендинг: Hero, Мүмкіндіктер, Қалай жұмыс істейді |
| Дашборд | `/dashboard` | Барлық метрикалардың жалпы көрінісі |
| Белсенділік | `/dashboard/activity` | Қадам, калория, белсенді уақыт |
| Ұйқы | `/dashboard/sleep` | Ұйқы фазалары, сапа индексі |
| Жүрек метрикасы | `/dashboard/heart` | ЖСЖ, HRV, қан қысымы |
| Қауіп талдауы | `/dashboard/risk` | AI болжам, ұсыныстар |

## Vercel-ге орналастыру

### 1-ші әдіс: Vercel Dashboard

1. [vercel.com](https://vercel.com) сайтына кіріңіз
2. **"Add New Project"** → Git репозиторийіңізді таңдаңыз
3. Framework: **Next.js** (автоматты анықталады)
4. **"Deploy"** батырмасын басыңыз

Қосымша конфигурация қажет емес.

### 2-ші әдіс: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### 3-ші әдіс: GitHub интеграция

1. Кодты GitHub-қа итеріңіз
2. Vercel → New Project → Import GitHub Repo
3. Автоматты CI/CD қосылады

## Жоба құрылымы

```
/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles + glassmorphism
│   └── dashboard/
│       ├── layout.tsx          # Dashboard layout + sidebar
│       ├── page.tsx            # Main dashboard
│       ├── activity/page.tsx
│       ├── sleep/page.tsx
│       ├── heart/page.tsx
│       ├── risk/page.tsx
│       └── components/
│           ├── HealthScore.tsx
│           ├── BiologicalAge.tsx
│           ├── HeartChart.tsx
│           ├── ActivityChart.tsx
│           ├── SleepChart.tsx
│           ├── RiskPanel.tsx
│           └── StatsRow.tsx
├── lib/
│   ├── mockData.ts             # 30 күндік жалған деректер
│   └── utils.ts
└── components/ui/
    └── progress.tsx
```

## Ескерту

Барлық деректер модельдік (mock data). Бұл қосымша медициналық диагностика немесе кеңес бермейді.

---

Made with ❤️ in Kazakhstan 🇰🇿
