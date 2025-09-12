import { PrismaClient } from "@/generated/prisma";

import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // クリーンアップ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);

  // ダミー画像URL
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400",
  ];

  // ユーザー作成
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "最初の投稿",
            content: "最初の投稿記事",
            topImage: dummyImages[0],
            published: true,
          },
          {
            title: "2回目の投稿",
            content: "2回目の投稿記事",
            topImage: dummyImages[1],
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
