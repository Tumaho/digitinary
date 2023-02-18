import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Post from './post';
import Navbar from './navbar';
import { Pagination } from "@material-ui/lab";
import usePagination from "./pagination";
import Button from '@mui/material/Button';
import FormDialog from '../common/formDialog';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from "axios";
import cookie from 'react-cookies'




const getPosts = async () => {
    var posts, personalPosts;

    await axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
            posts = response.data;
            personalPosts = posts.filter(item => {
                return item.userId === cookie.load('data').id
            })
        }).catch(function (error) {

            console.log(error);
        });
    return { posts, personalPosts }
}


export default function Home() {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([])
    const [personal, setPersonal] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [alignment, setAlignment] = useState('all');
    const [page, setPage] = useState(1);
    const PER_PAGE = 5;

    const count = Math.ceil(posts.length / PER_PAGE);
    const _DATA = usePagination(posts, PER_PAGE);

    useEffect(() => {
        getPosts().then(data => {
            setPosts(data.posts);
            setAllPosts(data.posts)
            setPersonal(data.personalPosts)
        });


    }, []);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const handleDeletePost = (id) => {
        setPosts(posts.filter(item => item.id !== id));
    }

    const editPostsChange = (data) => {
        let upd_obj = posts.findIndex((obj => obj.id === data.id));
        posts[upd_obj].title = data.title;
        posts[upd_obj].body = data.body;

    }

    const handleChangeSwitch = (event) => {
        console.log(event.target.value)
        if (event.target.value === 'my') {
            console.log("PERSONAL: ", personal);
            setPosts(personal)
            setAlignment('my')
        }
        else if (event.target.value === 'all') {
            setPosts(allPosts)
            setAlignment('all')
        }
    };

    return (
        <>
            <Navbar></Navbar>

            <Container maxWidth="sm">
                <div style={{
                    "textAlign": "center",
                    'marginTop': "20px"

                }}>
                    <Button variant="contained" color="success" onClick={() => { setShowDialog(true) }}>
                        Create Post
                    </Button>
                </div>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    color='primary'
                    style={{ 'marginBottom': '20px', 'marginTop': "20px" }}
                    onChange={handleChange}
                />
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChangeSwitch}
                    aria-label="Platform"
                >
                    <ToggleButton value="all">All Posts</ToggleButton>
                    <ToggleButton value="my">My Posts</ToggleButton>
                </ToggleButtonGroup>
                {_DATA.currentData().length > 0 && _DATA.currentData().map((item) => (
                    <Post post={item} handleDeletePost={handleDeletePost} editPostsChange={editPostsChange} key={item.id} style={{ "margin-bottom": "10px" }} />
                ))}

                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    color='primary'
                    style={{ 'marginBottom': '20px', 'marginTop': "20px" }}
                    onChange={handleChange}
                />


            </Container>

            {showDialog &&
                <FormDialog setShowDialog={setShowDialog} setPosts={setPosts} posts={posts}></FormDialog>
            }

        </>
    );
}
