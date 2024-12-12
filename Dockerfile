# Base image 설정
FROM node:18 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 주입
ENV NEXT_PUBLIC_BASE_URL="http://172.16.210.30:8000/"
ENV NEXT_PUBLIC_TEMP_URL="http://172.16.210.30:5000/"
ENV NEXT_PUBLIC_DOMAIN="172.16.210.30"  

# 패키지 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install --legacy-peer-deps

# 소스코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# Production 이미지 설정
FROM node:18 AS runner
WORKDIR /app

# 빌드 결과물 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Production 의존성 설치
RUN npm install --legacy-peer-deps --production

# 애플리케이션 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]
