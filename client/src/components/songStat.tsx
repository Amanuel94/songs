/** @jsxImportSource @emotion/react */

import { Slider } from "@mui/material";
import { SONG_API_ACTION_TYPE_STRINGS, SongStat } from "@types";
import { songStatApiActions, SongStatApiState } from "features/songStatSlice";
import { useAppDispatch, useAppSelector } from "hooks/stateHooks";
import React, { useEffect } from "react";
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
import { prepareSongStatData, ToDateFormat } from "utils/utils";
import Loading from "./Loading";

const SongStatStage = () => {
  useEffect(() => {
    dispatch(songStatApiActions.clear({}));
  }, []);

  const startDate = new Date("2025-06-01");
  const endDate = new Date();
  const [dateRange, setDateRange] = React.useState({
    start: new Date("2025-06-01"),
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Add one day to include the end date
  });

  useEffect(() => {
    const action = {
      type: SONG_API_ACTION_TYPE_STRINGS.FetchSongStats,
      payload: {
        req: {
          startDate: dateRange.start.toISOString().split("T")[0],
          endDate: dateRange.end.toISOString().split("T")[0],
        },
      },
    };

    dispatch(songStatApiActions.pending({}));
    dispatch(action);
  }, []);

  const songData: SongStatApiState = useAppSelector((state) => state.songStat);

  const dispatch = useAppDispatch();
  const [res, setRes] = React.useState<ReturnType<
    typeof prepareSongStatData
  > | null>(
    songData.data
      ? prepareSongStatData(songData.data, dateRange.start, dateRange.end)
      : null
  );

  useEffect(() => {
    setRes(
      prepareSongStatData(
        songData.data as SongStat[],
        dateRange.start,
        dateRange.end
      )
    );
  }, [dateRange]);

  if (res === null) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Song Statistics</h1>
      {/* Slider for picking date range */}
      <Slider
        getAriaLabel={() => "Date range"}
        value={[dateRange.start.getTime(), dateRange.end.getTime()]}
        min={startDate.getTime()}
        max={endDate.getTime() + 24 * 60 * 60 * 1000} // Add one day to include the end date
        onChange={(_, newValue) => {
          if (Array.isArray(newValue)) {
            setDateRange({
              start: new Date(newValue[0]),
              end: new Date(newValue[1]),
            });
            // console.log("Date Range Changed:", dateRange.start.toISOString().split("T")[0], dateRange.end.toISOString().split("T")[0]);
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

      {res.latestData === null ? (
        <div>
          <h1>No song statistics available for the selected date range.</h1>
        </div>
      ) : (
        <>
          <div css={songStatStyles.topDivCont}>
            <div css={songStatStyles.linChart}>
              {/* Line graph for the number of songs per day*/}
              <LineChart
                width={500}
                height={300}
                data={res.lineChartData}
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
              <h2>
                Stats for{" "}
                {ToDateFormat(new Date(res.latestDate).toLocaleDateString())}
              </h2>
              <div css={songStatStyles.count}>
                <span>{res.latestData.numberOfSongs}</span>
                <span> Songs </span>
              </div>
              <div css={songStatStyles.count}>
                <span>
                  {
                    res.latestData.numberOfSongsByGenre.filter(
                      (item) => item.count > 0
                    ).length
                  }
                </span>
                <span> Genres </span>
              </div>
              <div css={songStatStyles.count}>
                <span>
                  {
                    res.latestData.numberOfSongsByArtist.filter(
                      (item) => item.count > 0
                    ).length
                  }
                </span>
                <span> Artists </span>
              </div>
              <div css={songStatStyles.count}>
                <span>
                  {
                    res.latestData.numberOfSongsByAlbum.filter(
                      (item) => item.count > 0
                    ).length
                  }
                </span>
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
                  data={res.genreSongChartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                />
                <Pie
                  data={res.genreSongChartData}
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
                      (100 * value) / res.latestData.numberOfSongs
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
                data={res.genreAlbumChartData}
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
                data={res.artistChartData}
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
        </>
      )}
    </div>
  );
};

export default SongStatStage;
