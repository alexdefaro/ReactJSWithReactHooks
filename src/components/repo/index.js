import React, { Component } from 'react';
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

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
            <div className="product-info">
                <article key={ repo.id }>
                    <strong>{ repo.name }</strong>
                    <p>{ repo.description }</p>
                    <a href={ repo.html_url } target="new">Access</a>
                </article>
                <Link to={ '/repos' }>Voltar</Link>
            </div>
        )
    }
}