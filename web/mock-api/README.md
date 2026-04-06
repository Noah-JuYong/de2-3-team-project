# Mock API Service

이 디렉토리는 발표 설득형 구조를 위해 `web`과 분리된 `mock API` 컨테이너를 제공한다.

제공 엔드포인트:

- `GET /health`
- `GET /products`
- `GET /products/:id`
- `POST /orders`

## 로컬 실행

```bash
docker build -t shopping-api:local .
docker run --rm -p 3002:3000 shopping-api:local
```

## 발표 포인트

- `web`과 `api`를 분리해 실제 쇼핑몰 구조처럼 설명 가능
- `/products`, `/products/:id`, `/orders` 요청을 API pod에 집중시킬 수 있음
- HPA를 `api`에 적용해 scale-out 시연이 쉬움
