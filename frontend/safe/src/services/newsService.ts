// export interface NewsArticle {
//   title: string;
//   source: string;
//   published_at: string;
//   url: string;
// }

// export interface ContextualNewsResponse {
//   locality: string;
//   articles: NewsArticle[];
//   disclaimer: string;
// }

// export async function fetchContextualNews(
//   latitude: number,
//   longitude: number
// ): Promise<ContextualNewsResponse> {
//   const res = await fetch("http://127.0.0.1:8001/contextual-news", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ latitude, longitude })
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch contextual news");
//   }

//   return res.json();
// }


// src/services/newsService.ts

export interface NewsArticle {
  title: string;
  source: string;
  published_at: string;
  url: string;
}

export interface ContextualNewsResponse {
  locality: string;
  articles: NewsArticle[];
  disclaimer: string;
}

export async function fetchContextualNews(
  latitude: number,
  longitude: number
): Promise<ContextualNewsResponse> {
  const res = await fetch("http://127.0.0.1:8001/contextual-news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ latitude, longitude })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch contextual news");
  }

  return res.json();
}
