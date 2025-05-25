import { SongStat } from "@types";

export const ToDateFormat = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    // year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
export const ToLineChartData = (data: SongStat) => {
  return {
    name: ToDateFormat(data.date.toISOString().split("T")[0]),
    uv: data.numberOfSongs,
  };
};

export const genreDistribution = (data: { key: string; count: number }[]) => {
  let all = data.map((item) => ({
    name: item.key,
    value: item.count,
  }));

  const topFive = all.slice(0, 5);
  const othersCount = all.slice(5).reduce((acc, item) => acc + item.value, 0);
  return [...topFive, { name: "Others", value: othersCount }];
};

export const artistDistribution = (
  albumArtistdata: { key: string; count: number }[],
  songArtistdata: { key: string; count: number }[]
) => {
  let artistsChartData: { name: string; albumCount: number, songCount:number }[] = [];
  albumArtistdata.forEach((item) => {
    const existingCount = artistsChartData.find((a) => a.name === item.count + "");
    if (existingCount) {
      existingCount.albumCount += 1;
    } else {
        artistsChartData.push({ name: item.count+"", albumCount: 1, songCount: 0 });
    }
  });
  songArtistdata.forEach((item) => {
    const existingCount = artistsChartData.find((a) => a.name === item.count+"");
    if (existingCount) {
      existingCount.songCount += 1;
    } else {
      artistsChartData.push({ name: item.count+"", songCount: 1, albumCount: 0 });
    }
  });
  return artistsChartData.sort(
      (a, b) => b.albumCount - a.albumCount
    )
}
