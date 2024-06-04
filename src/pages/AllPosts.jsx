import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

import { contentfulClient } from "../utils/createContentfulClient";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 5;

    const getPosts = async (page = 1) => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: "post",
                limit: postsPerPage,
                skip: (page - 1) * postsPerPage,
                order: '-sys.createdAt'
            });

            setPosts(response.items);
            setTotalPosts(response.total);
        } catch (error) {
            console.log('Erro ao obter posts', error);
            setPosts([]);
        }
    }

    useEffect(() => {
        getPosts(currentPage);
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getPosts(pageNumber);
    }

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
                    <main className="col-12">
                        <h2 className="mb-3">Todos os posts</h2>

                        {
                            posts.map((post) => (
                                <Card
                                    key={post.sys.id}
                                    title={post.fields.title}
                                    text={post.fields.description}
                                    link={`/post/${post.fields.slug}`}
                                />
                            ))
                        }

                        <nav>
                            <ul className="pagination">
                                {pageNumbers.map(number => (
                                    <li key={number} className="page-item">
                                        <a onClick={() => paginate(number)} className="page-link">
                                            {number}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <Link to="/" className="btn btn-primary mt-4">
                            Voltar para a Home
                        </Link>
                    </main>
                </div>
            </div>
        </Layout>
    );
}

export default AllPosts;
