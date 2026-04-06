const http = require("http")
const { URL } = require("url")

const host = "0.0.0.0"
const port = Number(process.env.PORT || 3000)

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
    stock: 37,
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
    description: "주문 API와 함께 보여주기 좋은 저가 리빙 상품입니다.",
  },
]

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  })
  response.end(JSON.stringify(body))
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let raw = ""

    request.on("data", (chunk) => {
      raw += chunk
    })

    request.on("end", () => {
      if (!raw) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(raw))
      } catch (error) {
        reject(error)
      }
    })

    request.on("error", reject)
  })
}

function simulateWork() {
  const start = Date.now()
  while (Date.now() - start < 25) {
    Math.sqrt(Math.random() * 1000)
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const { pathname } = url
  const normalizedPath =
    pathname === "/api" ? "/" : pathname.startsWith("/api/") ? pathname.slice(4) : pathname

  if (request.method === "GET" && normalizedPath === "/health") {
    sendJson(response, 200, {
      status: "ok",
      service: "shopping-api",
    })
    return
  }

  if (request.method === "GET" && normalizedPath === "/products") {
    simulateWork()
    sendJson(response, 200, {
      items: products,
      total: products.length,
    })
    return
  }

  if (request.method === "GET" && normalizedPath.startsWith("/products/")) {
    simulateWork()
    const id = Number(normalizedPath.split("/").pop())
    const product = products.find((item) => item.id === id)

    if (!Number.isInteger(id)) {
      sendJson(response, 400, { message: "Invalid product id" })
      return
    }

    if (!product) {
      sendJson(response, 404, { message: "Product not found" })
      return
    }

    sendJson(response, 200, product)
    return
  }

  if (request.method === "POST" && normalizedPath === "/orders") {
    simulateWork()

    try {
      const body = await parseBody(request)
      const productId = Number(body.productId || 1)
      const quantity = Math.max(1, Number(body.quantity || 1))
      const product = products.find((item) => item.id === productId)

      if (!product) {
        sendJson(response, 404, { message: "Product not found" })
        return
      }

      sendJson(response, 201, {
        orderId: `order-${Date.now()}`,
        status: "accepted",
        productId,
        quantity,
        totalAmount: product.salePrice * quantity,
        message: "Mock order accepted",
      })
    } catch (_error) {
      sendJson(response, 400, { message: "Invalid JSON body" })
    }

    return
  }

  sendJson(response, 404, { message: "Not found" })
})

server.listen(port, host, () => {
  console.log(`shopping-api listening on ${host}:${port}`)
})
