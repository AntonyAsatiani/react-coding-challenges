import React, { Component } from 'react';
import axios from 'axios';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

const spotifyUrl = process.env.REACT_APP_SPOTIFY_URL

const sendRequest = async (path) => {
  const data = await axios.get(`${spotifyUrl}/browse/${path}`, {
    headers: {
      Authorization: `Bearer BQA526mUC_8EmQ2ME-Dj35NHtROG1m8JryXQc8xdsDydzYiJ2BTTKb8vy70WhC0LrhsDASQeKBLiX0EfeQeQIjS5Ew3Ow4tU9So_SKuSX_C_L1nRuvs`,
    }
  });

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
  console.log('token :>> ', token.data.access_token);
  return token.data.access_token;
}
( async () => {
  // await getAuthToken();
})();

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
      const data = await axios.get(`${spotifyUrl}/browse/featured-playlists`, {
        headers: {
          Authorization: `Bearer BQA526mUC_8EmQ2ME-Dj35NHtROG1m8JryXQc8xdsDydzYiJ2BTTKb8vy70WhC0LrhsDASQeKBLiX0EfeQeQIjS5Ew3Ow4tU9So_SKuSX_C_L1nRuvs`,
        }
      });
      this.setState({playlists: data.data.playlists.items})
    }

    async setBrowseCategory() {
      const data = await axios.get(`${spotifyUrl}/browse/categories`, {
        headers: {
          Authorization: `Bearer BQA526mUC_8EmQ2ME-Dj35NHtROG1m8JryXQc8xdsDydzYiJ2BTTKb8vy70WhC0LrhsDASQeKBLiX0EfeQeQIjS5Ew3Ow4tU9So_SKuSX_C_L1nRuvs`,
        }
      });
      this.setState({categories: data.data.categories.items});
    }

    async setNewReleases() {
      const data = await axios.get(`${spotifyUrl}/browse/new-releases`, {
        headers: {
          Authorization: `Bearer BQA526mUC_8EmQ2ME-Dj35NHtROG1m8JryXQc8xdsDydzYiJ2BTTKb8vy70WhC0LrhsDASQeKBLiX0EfeQeQIjS5Ew3Ow4tU9So_SKuSX_C_L1nRuvs`,
        }
      });
      this.setState({newReleases: data.data.albums.items});
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
