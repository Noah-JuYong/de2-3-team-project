export type MockProduct = {
  id: number
  name: string
  category: string
  price: number
  salePrice: number
  rating: number
  reviews: number
  tag: string
  stock: number
  image: string
  description: string
}

export const mockProducts: MockProduct[] = [
  {
    id: 1,
    name: "프리미엄 에어 러너",
    category: "운동화",
    price: 129000,
    salePrice: 99000,
    rating: 4.9,
    reviews: 1842,
    tag: "LIVE",
    stock: 37,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=1100&fit=crop",
    description: "타임세일 트래픽 테스트용 대표 운동화 상품입니다.",
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
    stock: 54,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&h=1100&fit=crop",
    description: "메인 페이지와 상세 조회 부하를 재현하기 위한 가방 상품입니다.",
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
    stock: 21,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1100&fit=crop",
    description: "이벤트 기간 조회 집중 상황을 설명하기 위한 mock 상품입니다.",
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
    stock: 83,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900&h=1100&fit=crop",
    description: "주문 API와 함께 보여주기 좋은 저가 리빙 상품입니다.",
  },
]

export function findMockProduct(id: number) {
  return mockProducts.find((product) => product.id === id)
}
