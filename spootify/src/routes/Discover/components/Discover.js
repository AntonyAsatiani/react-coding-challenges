import React, { Component } from 'react';
import axios from 'axios';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

const spotifyUrl = process.env.REACT_APP_SPOTIFY_URL
const authString = `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`


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
          Authorization: ``,
        }
      });
      this.setState({playlists: data.data.playlists.items})
    }

    async setBrowseCategory() {
      const data = await axios.get(`${spotifyUrl}/browse/categories`, {
        headers: {
          Authorization: ``,
        }
      });
      console.log('data :>> ', data);
      this.setState({categories: data.data.categories.items});
    }

    async setNewReleases() {
      const data = await axios.get(`${spotifyUrl}/browse/new-releases`, {
        headers: {
          Authorization: ``,
        }
      });
      console.log('data :>> ', data);
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
