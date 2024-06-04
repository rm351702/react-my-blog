import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { contentfulClient } from "../utils/createContentfulClient";

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    const getPost = async () => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: "post",
                "fields.slug": slug
            });

            setPost(response.items[0]);
        } catch (error) {
            console.log('Erro ao obter o post', error);
            setPost(null);
        }

    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <Layout>
            <main className="container my-4">
                <div className="row">
                    <div className="col">
                        {!post && <p>Carregando...</p>}
                        {post && (
                            <>
                                <h1>{post.fields.title}</h1>

                                <div dangerouslySetInnerHTML={{__html: documentToHtmlString(post.fields.content) }}>
                                </div>

                                <Link to="/" className="btn btn-primary mt-4">
                                    Voltar para a Home
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Post;