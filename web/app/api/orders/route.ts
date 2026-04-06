import { findMockProduct } from "@/lib/mock-data"

type CreateOrderBody = {
  productId?: number
  quantity?: number
}

export async function POST(request: Request) {
  let body: CreateOrderBody = {}

  try {
    body = (await request.json()) as CreateOrderBody
  } catch {
    body = {}
  }

  const productId = body.productId ?? 1
  const quantity = Math.max(1, body.quantity ?? 1)
  const product = findMockProduct(productId)

  if (!product) {
    return Response.json(
      {
        message: "Product not found",
      },
      { status: 404 },
    )
  }

  return Response.json(
    {
      orderId: `order-${Date.now()}`,
      status: "accepted",
      productId,
      quantity,
      totalAmount: product.salePrice * quantity,
      message: "Mock order accepted",
    },
    { status: 201 },
  )
}
