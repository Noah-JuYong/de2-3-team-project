import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgePercent,
  Clock3,
  Heart,
  Menu,
  PlayCircle,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const heroProducts = [
  {
    id: 1,
    name: "프리미엄 에어 러너",
    subtitle: "BLACK FRIDAY 자정 전까지 최대 특가",
    originalPrice: 129000,
    salePrice: 79000,
    discount: "39% OFF",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=1100&fit=crop",
  },
  {
    id: 2,
    name: "컴포트 트래블 백팩",
    subtitle: "블랙프라이데이 한정 추가 쿠폰 적용",
    originalPrice: 89000,
    salePrice: 69000,
    discount: "22% OFF",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&h=1100&fit=crop",
  },
]

const products = [
  {
    id: 1,
    name: "프리미엄 에어 러너",
    category: "운동화",
    price: 129000,
    salePrice: 99000,
    rating: 4.9,
    reviews: 1842,
    tag: "LIVE",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=1100&fit=crop",
  },
  {
    id: 2,
    name: "컴포트 트래블 백팩",
    category: "가방",
    price: 89000,
    salePrice: 79000,
    rating: 4.8,
    reviews: 967,
    tag: "BEST",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&h=1100&fit=crop",
  },
  {
    id: 3,
    name: "라이트 윈드 점퍼",
    category: "아우터",
    price: 159000,
    salePrice: 129000,
    rating: 4.7,
    reviews: 621,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1100&fit=crop",
  },
  {
    id: 4,
    name: "데일리 보틀 키트",
    category: "리빙",
    price: 39000,
    salePrice: 32000,
    rating: 4.9,
    reviews: 1234,
    tag: "특가",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900&h=1100&fit=crop",
  },
]

const highlights = [
  {
    title: "무료배송",
    description: "오늘 방송 상품 전부 무료배송",
    icon: Truck,
  },
  {
    title: "최저가 보장",
    description: "방송 종료 전까지 특가 유지",
    icon: BadgePercent,
  },
  {
    title: "간편 주문",
    description: "원클릭 주문 버튼으로 바로 구매",
    icon: ShoppingCart,
  },
  {
    title: "품질 보증",
    description: "구매 후 7일 안심 교환 지원",
    icon: ShieldCheck,
  },
]

const liveStats = [
  { label: "실시간 접속", value: "41,820" },
  { label: "오늘 주문", value: "12,480" },
  { label: "평균 할인율", value: "34%" },
]

const reviews = [
  {
    name: "김지연",
    text: "방송 보고 주문했는데 착화감이 정말 좋아요. 사이즈 안내도 정확했습니다.",
  },
  {
    name: "박민수",
    text: "백팩 수납이 넉넉하고 소재가 탄탄해서 출퇴근용으로 만족합니다.",
  },
  {
    name: "이서현",
    text: "모바일에서도 주문 버튼이 커서 결제 흐름이 편했습니다.",
  },
]

export default function Home() {
  const featured = heroProducts[0]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-black/5 bg-black text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] tracking-[0.24em] md:px-6">
          <span>BLACK FRIDAY V2 DROP</span>
          <span>FREE SHIPPING + EXTRA COUPON UNTIL 23:59</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-18 md:px-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
            <Link
              href="/"
              className="font-serif text-lg tracking-[0.24em] sm:text-xl md:text-2xl"
            >
              HOMELIVE
            </Link>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex lg:gap-8">
            <Link href="#live" className="transition-colors hover:text-foreground">
              라이브특가
            </Link>
            <Link href="#products" className="transition-colors hover:text-foreground">
              베스트상품
            </Link>
            <Link href="#reviews" className="transition-colors hover:text-foreground">
              고객후기
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="size-4" />
            </Button>
            <Button className="h-10 rounded-full px-4 text-sm sm:px-5">지금 구매</Button>
          </div>
        </div>
      </header>

      <main>
        <section id="live" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,132,0,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#120e0a_0%,#171410_50%,#f4efe7_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:py-14 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-18">
            <div className="max-w-2xl">
              <Badge className="mb-4 rounded-full bg-white/12 px-4 py-1 text-[11px] tracking-[0.24em] text-white backdrop-blur">
                BLACK FRIDAY LIVE V2
              </Badge>
              <h1 className="font-serif text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                블랙프라이데이
                <br />
                오늘의 홈쇼핑 특가
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/78 sm:text-base md:text-lg">
                메인 히어로와 상품 카드, 혜택 배너를 블랙프라이데이 버전으로
                업데이트했다. 첫 화면에서 즉시 할인 강도와 한정 혜택이 보이도록
                문구와 가격 구성을 다시 잡았다.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button className="h-11 rounded-full bg-white px-5 text-sm text-black hover:bg-white/92 sm:h-12 sm:px-6">
                  블프 특가 바로가기
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-full border-white/20 bg-white/8 px-5 text-sm text-white hover:bg-white/12 hover:text-white sm:h-12 sm:px-6"
                >
                  <PlayCircle className="size-4" />
                  라이브 보기
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {liveStats.map((stat) => (
                  <Card
                    key={stat.label}
                    className="rounded-[1.5rem] border-white/10 bg-white/8 py-0 text-white shadow-none backdrop-blur"
                  >
                    <CardContent className="p-4 sm:p-5">
                      <p className="text-[11px] tracking-[0.2em] text-white/55">{stat.label}</p>
                      <p className="mt-2 text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-[#1d1712] py-0 text-white shadow-2xl shadow-black/30">
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[320px] sm:min-h-[380px]">
                    <Image
                      src={featured.image}
                      alt={featured.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="flex flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Badge className="rounded-full bg-[#ff7a1a] px-3 py-1 text-[11px] text-white">
                          BLACK FRIDAY HOT DEAL
                        </Badge>
                        <span className="text-xs tracking-[0.18em] text-white/50 sm:text-sm">
                          V2 LIMITED DROP
                        </span>
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                        {featured.name}
                      </h2>
                      <p className="mt-2 text-sm text-white/65 sm:text-base">
                        {featured.subtitle}
                      </p>
                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-3 text-sm text-white/78">
                        추가 10% 앱 쿠폰, 무료배송, 자정 전 결제 시 사은품 증정
                      </div>

                      <div className="mt-5 flex flex-wrap items-end gap-2 sm:gap-3">
                        <span className="text-3xl font-semibold sm:text-4xl">
                          {featured.salePrice.toLocaleString()}원
                        </span>
                        <span className="text-sm text-white/42 line-through sm:text-base">
                          {featured.originalPrice.toLocaleString()}원
                        </span>
                        <Badge className="rounded-full bg-white/10 px-3 py-1 text-white">
                          {featured.discount}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <Button className="h-11 rounded-full bg-[#ff7a1a] text-sm text-white hover:bg-[#e86f17] sm:h-12">
                        지금 주문하기
                      </Button>
                      <Button
                        variant="outline"
                        className="h-11 rounded-full border-white/15 bg-transparent text-sm text-white hover:bg-white/8 hover:text-white sm:h-12"
                      >
                        상품 상세보기
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                {heroProducts.slice(1).map((item) => (
                  <Card
                    key={item.id}
                    className="rounded-[1.5rem] border-black/5 bg-white py-0 shadow-none"
                  >
                    <CardContent className="p-5">
                      <p className="text-xs tracking-[0.2em] text-[#ff7a1a]">추천 방송 상품</p>
                      <h3 className="mt-3 text-lg font-semibold sm:text-xl">{item.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.subtitle}
                      </p>
                      <div className="mt-4 flex items-end gap-2">
                        <span className="text-2xl font-semibold">
                          {item.salePrice.toLocaleString()}원
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {item.originalPrice.toLocaleString()}원
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="rounded-[1.5rem] border-white/10 bg-white/10 py-0 text-white shadow-none backdrop-blur">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-sm text-white/72">
                      <Clock3 className="size-4" />
                      블랙프라이데이 종료까지
                    </div>
                    <p className="mt-3 text-2xl font-semibold sm:text-3xl">11:59:59</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      지금 주문하면 전 상품 무료배송과 앱 전용 추가 할인 쿠폰이 함께 적용된다.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  className="rounded-[1.5rem] border-black/5 bg-white py-0 shadow-none"
                >
                  <CardContent className="p-5">
                    <div className="flex size-11 items-center justify-center rounded-full bg-[#ff7a1a]/10 text-[#ff7a1a]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-18">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#ff7a1a]">Best Pick</p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl">
                블랙프라이데이 인기 특가
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              이번 버전에서는 할인율과 쿠폰 체감이 바로 들어오도록 가격 대비 문구를
              강화했다. 배포 후 메인 화면만 봐도 이전 버전과 차이가 명확하게 보이도록
              구성한 UI 업데이트다.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden rounded-[1.75rem] border-black/5 py-0 shadow-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <Badge className="rounded-full bg-black/72 px-3 py-1 text-[11px] tracking-[0.18em] text-white">
                      {product.tag}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/90 text-black hover:bg-white"
                    >
                      <Heart className="size-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold sm:text-xl">{product.name}</h3>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-sm text-amber-500">
                    <Star className="size-4 fill-current" />
                    <span className="font-medium text-foreground">{product.rating}</span>
                    <span className="text-muted-foreground">
                      리뷰 {product.reviews.toLocaleString()}개
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-end gap-2">
                    <span className="text-2xl font-semibold sm:text-3xl">
                      {product.salePrice.toLocaleString()}원
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-11 rounded-full text-sm">
                      상세 보기
                    </Button>
                    <Button className="h-11 rounded-full bg-[#ff7a1a] text-sm text-white hover:bg-[#e86f17]">
                      바로 주문
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="reviews"
          className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18"
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="rounded-[2rem] border-black/5 bg-[#1a1612] py-0 text-white shadow-none">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.24em] text-[#ff7a1a]">
                  Customer Review
                </p>
                <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl">
                  블프 한정 특가에 반응한 실구매 후기
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
                  텍스트가 긴 후기 카드도 줄간격과 폭을 조정해 모바일에서 무너지지 않게
                  구성했다. 버튼과 카드의 최소 높이를 맞춰 화면이 좁아져도 읽기 흐름이
                  끊기지 않는다.
                </p>
                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-sm text-white/68">오늘 방송 만족도</p>
                  <p className="mt-2 text-4xl font-semibold">4.9 / 5.0</p>
                  <p className="mt-2 text-sm text-white/68">
                    누적 리뷰 4,664개 기준, 재구매 의사 응답 96%
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {reviews.map((review) => (
                <Card
                  key={review.name}
                  className="rounded-[1.75rem] border-black/5 bg-white py-0 shadow-none"
                >
                  <CardContent className="flex h-full flex-col p-5 sm:p-6">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-foreground/88">{review.text}</p>
                    <div className="mt-auto pt-6">
                      <p className="text-sm font-semibold">{review.name}</p>
                      <p className="text-xs text-muted-foreground">실구매 고객</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
