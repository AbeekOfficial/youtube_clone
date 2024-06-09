import axios from "axios";

const baseUrl = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "102",
  },
  headers: {
    "X-RapidAPI-Key": "e44040c5f5msh4536aa04543e38ep1ab3b7jsn6210b8e96204",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const ApiService = {
  async fetching(url: string) {
    const response = await axios(`${baseUrl}/${url}`, options);
    return response.data;
  },
};
