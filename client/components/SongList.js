import React, { Component } from "React";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import query from "../queries/fetchSongs";
import { Link } from "react-router";
class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: {
        id
      },
      refetchQueries: [{ query }]
    });
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li className="collection-item" key={id}>
          {title}
          <i
            className="material-icons right delete_button"
            onClick={() => this.onSongDelete(id)}
            style={{ cursor: "pointer" }}
          >
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) {
      return <div>Hold up....wait a minute</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-larg red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
