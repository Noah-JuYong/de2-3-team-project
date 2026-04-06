import { findMockProduct } from "@/lib/mock-data"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const productId = Number(id)

  if (!Number.isInteger(productId)) {
    return Response.json(
      {
        message: "Invalid product id",
      },
      { status: 400 },
    )
  }

  const product = findMockProduct(productId)

  if (!product) {
    return Response.json(
      {
        message: "Product not found",
      },
      { status: 404 },
    )
  }

  return Response.json(product, { status: 200 })
}
