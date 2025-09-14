"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // デバウンス
  // search が変更されるたびに useEffect が走る。
  // 500ms 後に setDebouncedSearch(search) が呼ばれるように setTimeout を仕掛ける。
  // もし search が 500ms 以内に再度変更された場合、クリーンアップ関数によって前の setTimeout がキャンセルされ、新しい setTimeout がセットされる。
  // 結果として、入力が止まってから 500ms 後 に setDebouncedSearch が実行される。
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
    // useEffect の戻り値がクリーンアップ関数になる
    // 初回レンダー：副作用関数が実行される。
    // 依存配列の値が変わるとき：まず前回のクリーンアップ関数が実行される。その後、新しい副作用関数が実行される。
    // コンポーネントがアンマウントされるとき：最後のクリーンアップ関数が実行される。
  }, [search]);

  // debouncedSearch が更新されたら実行
  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push("/");
    }
  }, [debouncedSearch, router]);

  return (
    <>
      <Input
        placeholder="記事を検索…"
        // Inputコンポーネントが bg-transparent に指定されている
        // レクチャーでは背景色を指定せず白になっているためバージョン違いが原因と思われる
        // bg-background を明示する
        // className="w-[200px] lg:w-[300px]"
        className="w-[200px] lg:w-[300px] bg-background"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
