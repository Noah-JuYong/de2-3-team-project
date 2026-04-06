import { mockProducts } from "@/lib/mock-data"

export async function GET() {
  return Response.json(
    {
      items: mockProducts,
      total: mockProducts.length,
    },
    { status: 200 },
  )
}
