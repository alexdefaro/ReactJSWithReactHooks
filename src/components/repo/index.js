import React, { Component } from 'react';
import { Link } from "react-router-dom";

import api from "../../services/api";
import RepoData from "../repodata";

export default class Repo extends Component {
    state = {
        repo: {}
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/repos/alexdefaro/${id}`);
        this.setState({ repo: response.data });
    }

    render() {
        const { repo } = this.state;

        return (
            <div>
                <RepoData repoInfo= { repo } linkToGit= { true }  ></RepoData> 
                <div className="footer">
                    <Link to={ '/repos' }>Voltar</Link>
                </div>
            </div>
        )
    }
}