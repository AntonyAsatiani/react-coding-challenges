import React, { Component } from 'react';
import axios from 'axios';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

const spotifyUrl = process.env.REACT_APP_SPOTIFY_URL

const urlToDataMap = {
  'featured-playlists': 'playlists',
  'categories': 'categories',
  'new-releases': 'albums',
}

const sendRequest = async (path) => {
  if (!localStorage.getItem('bearerToken')) {
    await getAuthToken();
  }
  const response = await axios.get(`${spotifyUrl}/browse/${path}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('bearerToken')).data}`,
    }
  });

  const data = response.data[urlToDataMap[path]].items
  return data;
}

const getAuthToken = async () => {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  data.append('client_secret', process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

  const token = await axios.post('https://accounts.spotify.com/api/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
  const tokenDataToSave ={data: token.data.access_token, expirationTime: token.data.expires_in}
  localStorage.setItem('bearerToken', JSON.stringify(tokenDataToSave));
}

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async setPlaylist() {
    const data = await sendRequest('featured-playlists');
    this.setState({playlists: data})
  }

  async setBrowseCategory() {
    const data = await sendRequest('categories');
    this.setState({categories: data});
  }

  async setNewReleases() {
    const data = await sendRequest('new-releases');
    this.setState({newReleases: data});
  }

  componentDidMount() {
    this.setPlaylist();
    this.setBrowseCategory();
    this.setNewReleases();
  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
