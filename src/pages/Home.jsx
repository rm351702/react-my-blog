import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

import { contentfulClient } from "../utils/createContentfulClient";


function Home() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    const getCategories = async () => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: "blogCategory"
            });

            setCategories(response.items);
        } catch (error) {
            console.log('Erro ao obter categorias', error);
            setCategories([]);
        }
    };

    const getPosts = async () => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: "post",
                limit: 5,
                order: '-sys.createdAt'
            });

            setPosts(response.items);
        } catch (error) {
            console.log('Erro ao obter posts', error);
            setPosts([]);
        }
    }

    useEffect(() => {
        getCategories();
        getPosts();
    }, []);

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
                    <main className="col-12 col-md-8">
                        <h2 className="mb-3">Últimos posts</h2>

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

                        <Link to="/posts" className="btn btn-dark">
                            Ver todos os postes
                        </Link>
                    </main>
                    <aside className="col-12 col-md-4">
                        <h2>Categorias</h2>

                        <ul>
                            {
                                categories.map(
                                    (category) => (
                                        <li key={category.sys.id}>
                                            {category.fields.categoryTitle}
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </aside>
                </div>
            </div>
        </Layout>
    );
}

export default Home;