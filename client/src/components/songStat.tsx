/** @jsxImportSource @emotion/react */

import { Slider } from "@mui/material";
import { dummySongStatData } from "data/dummySongStatData";
import React from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { color } from "styles";
import { songStatStyles } from "styles/dashboard";
import {
  artistDistribution,
  genreDistribution,
  ToDateFormat,
  ToLineChartData,
} from "utils/utils";

const SongStat = () => {
  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-05-31");
  const [dateRange, setDateRange] = React.useState({
    start: new Date("2025-01-01"),
    end: new Date("2025-05-31"),
  });

  let data = dummySongStatData.filter((stat) => {
    const statDate = new Date(stat.date);
    return statDate >= dateRange.start && statDate <= dateRange.end;
  });
  let lineChartData = data.map((stat) => ToLineChartData(stat));
  let latestData = data[data.length - 1];
  let latestDate = latestData ? latestData.date : new Date();
  let genreSongChartData = genreDistribution(latestData.numberOfSongsByGenre);
  let genreAlbumChartData = genreDistribution(latestData.numberOfAlbumsByGenre);
  let artistChartData = artistDistribution(
    latestData.numberOfAlbumsByArtist,
    latestData.numberOfSongsByArtist
  );
  console.log(artistChartData);

  return (
    <div>
      <h1>Song Statistics</h1>
      {/* Slider for picking date range */}
      <Slider
        getAriaLabel={() => "Date range"}
        value={[dateRange.start.getTime(), dateRange.end.getTime()]}
        min={startDate.getTime()}
        max={endDate.getTime()}
        onChange={(_, newValue) => {
          if (Array.isArray(newValue)) {
            setDateRange({
              start: new Date(newValue[0]),
              end: new Date(newValue[1]),
            });
          }
        }}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => {
          const date = new Date(value);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }}
      />
      <div css={songStatStyles.topDivCont}>
        <div css={songStatStyles.linChart}>
          {/* Line graph for the number of songs per day*/}
          <LineChart
            width={500}
            height={300}
            data={lineChartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line
              type="monotone"
              dataKey="uv"
              stroke={"magenta"}
              dot={false}
            ></Line>
            <XAxis dataKey="name" />
            <YAxis
              domain={["dataMin-10", "dataMax+10"]}
              label={{
                value: "Number of Songs Uploaded",
                angle: -90,
              }}
              interval={2}
            />
            <Tooltip formatter={(value) => [value + " Songs"]} />
          </LineChart>
        </div>
        {/* genre, artist, and album counts */}
        <div css={[songStatStyles.counts]}>
          <h2>Stats for {ToDateFormat(latestDate.toLocaleDateString())}</h2>
          <div css={songStatStyles.count}>
            <span>{latestData.numberOfSongs}</span>
            <span> Songs </span>
          </div>
          <div css={songStatStyles.count}>
            <span>{latestData.numberOfSongsByGenre.length}</span>
            <span> Genres </span>
          </div>
          <div css={songStatStyles.count}>
            <span>{latestData.numberOfSongsByArtist.length}</span>
            <span> Artists </span>
          </div>
          <div css={songStatStyles.count}>
            <span>{latestData.numberOfSongsByAlbum.length}</span>
            <span> Albums </span>
          </div>
        </div>
      </div>
      {/* pie charts and bar charts */}
      <div css={songStatStyles.lowDivCont}>
        {/* Pie chart for genre-song distribution */}
        <div css={songStatStyles.pieChart}>
          <PieChart width={400} height={400}>
            <Pie
              data={genreSongChartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={genreSongChartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="green"
              label={({ name }) => name}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${Math.round(
                  (100 * value) / latestData.numberOfSongs
                )} %, ${value} songs`,
                name,
              ]}
            />
          </PieChart>
        </div>
        {/* Pie chart for genre-album distribution */}
        <div css={songStatStyles.pieChart}>
          <BarChart
            width={500}
            height={300}
            data={genreAlbumChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} albums have songs in this genre`,
                name,
              ]}
            />
            <Bar
              dataKey="value"
              fill={color.primary}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </div>
        {/* Bar chart for artist-album distribution */}
        <div css={songStatStyles.pieChart}>
          <BarChart
            width={500}
            height={300}
            data={artistChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "songCount") {
                  return [`# artists have ${value} song(s)`, ""];
                }
                if (name === "albumCount") {
                  return [`# artist have ${value} album(s)`, ""];
                }
                return [value, name];
              }}
            />
            <Bar
              dataKey="songCount"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="albumCount"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default SongStat;
