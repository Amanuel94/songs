import { SongStat } from "@types";
import { AxiosResponse } from "axios";
// import { Action } from "redux-saga";
export const r = (res: AxiosResponse<any, any>) => {
  return { status: res.status, data: res.data };
};

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
    name: ToDateFormat(new Date(data.date).toISOString().split("T")[0]),
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
  let artistsChartData: {
    name: string;
    albumCount: number;
    songCount: number;
  }[] = [];
  albumArtistdata.forEach((item) => {
    const existingCount = artistsChartData.find(
      (a) => a.name === item.count + ""
    );
    if (item.count === 0 || item.count === undefined) return; // Skip if count is 0
    if (existingCount) {
      existingCount.albumCount += 1;
    } else {
      artistsChartData.push({
        name: item.count + "",
        albumCount: 1,
        songCount: 0,
      });
    }
  });
  songArtistdata.forEach((item) => {
    const existingCount = artistsChartData.find(
      (a) => a.name === item.count + ""
    );
    if (item.count === 0 || item.count === undefined) return; // Skip if count is 0
    if (existingCount) {
      existingCount.songCount += 1;
    } else {
      artistsChartData.push({
        name: item.count + "",
        songCount: 1,
        albumCount: 0,
      });
    }
  });
  return artistsChartData.sort((a, b) => b.albumCount - a.albumCount);
};

export const prepareSongStatData = (
  data: SongStat[],
  startDate: Date,
  endDate: Date
) => {
  data = data.filter(
    (stat) => new Date(stat.date) >= startDate && new Date(stat.date) <= endDate
  );

  console.log("Filtered Data:", data);
  if (data.length === 0) {
    return {
      lineChartData: [],
      latestData: null,
      latestDate: new Date(),
      genreSongChartData: [],
      genreAlbumChartData: [],
      artistChartData: [],
    };
  }

  let lineChartData = data.map((stat) => ToLineChartData(stat));
  let latestData = data[data.length - 1];
  let latestDate = latestData ? latestData.date : new Date();
  let genreSongChartData = genreDistribution(latestData.numberOfSongsByGenre);
  let genreAlbumChartData = genreDistribution(latestData.numberOfAlbumsByGenre);
  let artistChartData = artistDistribution(
    latestData.numberOfAlbumsByArtist,
    latestData.numberOfSongsByArtist
  );
  return {
    lineChartData,
    latestData,
    latestDate,
    genreSongChartData,
    genreAlbumChartData,
    artistChartData,
  };
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return str; // Handle empty string case
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};
