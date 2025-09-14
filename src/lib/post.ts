import { prisma } from "@/lib/prisma";

export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function searchPosts(search: string) {
  // "テスト%20123" => "テスト 123"
  const decodedSearch = decodeURIComponent(search);
  // \s → 半角の空白やタブ、改行など「空白文字」全般
  // [...] → いずれかにマッチ
  // + → 1文字以上の連続
  // 「半角スペース・全角スペースが連続している部分」を 半角スペース1つに置換 します。
  const normalizedSearch = decodedSearch.replace(/[\s　]+/g, " ").trim();
  // 配列の中から「falsy な値」を取り除く
  // JavaScript では false, 0, "", null, undefined, NaN が falsy。
  // ここでの目的は空文字列("")の削除だが、直前の置換で空白は２文字以上連続しない。
  // よって保険的な処理
  const searchwords = normalizedSearch.split(" ").filter(Boolean);

  const filters = searchwords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));

  return await prisma.post.findMany({
    where: {
      AND: filters,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
