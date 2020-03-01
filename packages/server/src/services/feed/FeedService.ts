import { Service, $log } from "@tsed/common";
import { MemoryStorage } from "../storage/MemoryStorage";
import { cleanText } from "../../utils/helpers";
const Parser = require("rss-parser");

export interface StatsMap {
  [key: string]: Stats;
}
export interface Stats {
  word: string;
  count: number;
}
export interface FeedItem {
  id: string;
  title: string;
  summary: string;
  author: string;
  link: string;
  pubDate: string;
}

@Service()
export class FeedService {
  constructor(private memoryStorage: MemoryStorage) {
    this.memoryStorage.set(
      "stopWords",
      require("../../../resources/stopWords.json")
        .slice(0, 50)
        .map(({ Word }) => Word)
    );
  }

  /**
   * @returns {Stats, FeedItem[]}
   */
  async get() {
    const url = "https://www.theregister.co.uk/software/headlines.atom";
    const parser = new Parser({
      customFields: {
        item: ["summary"]
      }
    });
    const stats: StatsMap = {};
    const { items } = await parser.parseURL(url);
    const stopWords = this.memoryStorage.get<String[]>("stopWords");
    const startTime = new Date().getUTCMilliseconds();

    items.forEach(({ title, summary }) => {
      const string = `${cleanText(title)} ${cleanText(summary)}`;
      string
        .split(" ")
        .filter(word => !stopWords.includes(word) && word.length > 0)
        .forEach(word => {
          if (stats.hasOwnProperty(word)) {
            stats[word].count = stats[word].count + 1;
          } else {
            stats[word] = { word, count: 1 };
          }
        });
    });

    const endCount = new Date().getUTCMilliseconds();
    $log.info(`Feed Service Counting: ${(endCount - startTime) / 1000}s`);
    return {
      stats: Object.values(stats)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      items
    };
  }
}
